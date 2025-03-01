import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const id = await req.nextUrl.searchParams.get('id');

    const { data } = await axios.get(
      `https://feedbacks-api.wildberries.ru/api/v1/feedbacks?nmId=${id}&isAnswered=true&take=100&skip=0`,
      { headers: { Authorization: process.env.WB_TOKEN } },
    );

    return NextResponse.json(data);
  } catch {}
}
