import { itemsInter } from '@/app/services/dto/adminSearchDto'
import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get('query') || ''

    const { data } = await axios.get<itemsInter>(
      `https://content-api.wildberries.ru/content/v2/object/all?limit=5&name=${query}`,
      { headers: { Authorization: process.env.WB_TOKEN || '' } },
    )

    return NextResponse.json(data)
  } catch (error) {
    console.log(error)
    return NextResponse.error()
  }
}
