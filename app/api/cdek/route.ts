import { NextResponse, NextRequest } from 'next/server'

interface fetchOptionsInter {
  method: string
  headers: {
    Accept: string
    'X-App-Name': string
    'X-App-Version': string
    Authorization: string
    'Content-Type'?: string
  }
  body?: string | URLSearchParams
}

// Конфигурация API
const CONFIG = {
  baseUrl: 'https://api.cdek.ru/v2',
  version: '3.11.1',
  credentials: {
    login: process.env.CDEK_LOGIN || '',
    secret: process.env.CDEK_PASSWORD || '',
  },
}

// Класс для работы с метриками
class Metrics {
  metrics: { name: string; description: string; duration: string }[]
  startTime: number
  constructor() {
    this.metrics = []
    this.startTime = this.getCurrentTime()
  }

  getCurrentTime() {
    return typeof performance !== 'undefined' ? performance.now() : Date.now()
  }

  addMetric(name: string, description: string, startTime: number) {
    const duration = (this.getCurrentTime() - startTime).toFixed(2)
    this.metrics.push({ name, description, duration })
  }

  getServerTimingHeader() {
    return this.metrics.map((m) => `${m.name};desc="${m.description}";dur=${m.duration}`).join(',')
  }
}

// Класс для работы с API CDEK
class CDEKService {
  baseUrl: string
  login: string
  secret: string
  metrics: Metrics
  constructor() {
    this.baseUrl = CONFIG.baseUrl
    this.login = CONFIG.credentials.login
    this.secret = CONFIG.credentials.secret
    this.metrics = new Metrics()
  }

  // Получение токена авторизации
  async getAuthToken() {
    const startTime = this.metrics.getCurrentTime()

    const formData = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: this.login,
      client_secret: this.secret,
    })

    const response = await fetch(`${this.baseUrl}/oauth/token`, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'X-App-Name': 'widget_pvz',
        'X-App-Version': CONFIG.version,
      },
    })

    const data = await response.json()
    this.metrics.addMetric('auth', 'Server Auth Time', startTime)

    if (!data.access_token) {
      throw new Error('Server not authorized to CDEK API')
    }

    return data.access_token
  }

  // Выполнение HTTP запроса
  async makeRequest(
    endpoint: string,
    data: { [k: string]: string },
    options: { method: string; useJson: boolean },
  ) {
    const token = await this.getAuthToken()
    const { method = 'GET', useJson = false } = options

    let url = `${this.baseUrl}/${endpoint}`
    const fetchOptions: fetchOptionsInter = {
      method,
      headers: {
        Accept: 'application/json',
        'X-App-Name': 'widget_pvz',
        'X-App-Version': CONFIG.version,
        Authorization: `Bearer ${token}`,
      },
    }

    if (method === 'GET') {
      url += `?${new URLSearchParams(data)}`
    } else if (useJson) {
      fetchOptions.headers['Content-Type'] = 'application/json'
      fetchOptions.body = JSON.stringify(data)
    } else {
      fetchOptions.body = new URLSearchParams(data)
    }

    const response = await fetch(url, fetchOptions)
    return await response.json()
  }

  // Получение списка офисов
  async getOffices(data: { [k: string]: string }) {
    const startTime = this.metrics.getCurrentTime()
    const result = await this.makeRequest('deliverypoints', data, {
      method: 'GET',
      useJson: true,
    })
    this.metrics.addMetric('office', 'Offices Request', startTime)
    return result
  }

  // Расчет тарифов
  async calculateTariffs(data: { [k: string]: string }) {
    const startTime = this.metrics.getCurrentTime()
    const result = await this.makeRequest('calculator/tarifflist', data, {
      method: 'POST',
      useJson: true,
    })
    this.metrics.addMetric('calc', 'Calculate Request', startTime)
    return result
  }
}

// Обработчик GET запросов
export async function GET(request: NextRequest) {
  const service = new CDEKService()
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action')

  try {
    if (!action) {
      return NextResponse.json({ message: 'Action is required' }, { status: 400 })
    }

    const params = Object.fromEntries(searchParams)
    let result

    switch (action) {
      case 'offices':
        result = await service.getOffices(params)
        break
      case 'calculate':
        result = await service.calculateTariffs(params)
        break
      default:
        return NextResponse.json({ message: 'Unknown action' }, { status: 400 })
    }

    return new NextResponse(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-Service-Version': CONFIG.version,
        'Server-Timing': service.metrics.getServerTimingHeader(),
      },
    })
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}

// Обработчик POST запросов
export async function POST(request: NextRequest) {
  const service = new CDEKService()

  try {
    const body = await request.json()
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action') || body.action

    if (!action) {
      return NextResponse.json({ message: 'Action is required' }, { status: 400 })
    }

    const params = { ...Object.fromEntries(searchParams), ...body }
    let result

    switch (action) {
      case 'offices':
        result = await service.getOffices(params)
        break
      case 'calculate':
        result = await service.calculateTariffs(params)
        break
      default:
        return NextResponse.json({ message: 'Unknown action' }, { status: 400 })
    }

    return new NextResponse(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-Service-Version': CONFIG.version,
        'Server-Timing': service.metrics.getServerTimingHeader(),
      },
    })
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}
