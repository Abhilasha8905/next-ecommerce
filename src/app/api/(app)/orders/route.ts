import { type NextRequest, NextResponse } from 'next/server';
import { data } from '@/lib/api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  const { orders } = data;

  return NextResponse.json(
    {
      success: true,
      message: `Found ${orders.length} item(s).`,
      data: orders,
    },
    {
      status: 200,
    },
  );
}
