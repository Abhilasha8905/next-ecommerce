import { type NextRequest, NextResponse } from 'next/server';
import { data } from '@/lib/api';

export async function GET(request: NextRequest, { params: { orderId } }: { params: { [key: string]: string } }) {
  const order = data.orders.find(order => order.id === orderId) ?? null;

  return NextResponse.json(
    {
      success: !!order,
      message: order ? 'Item found.' : 'Item not found!',
      data: order,
    },
    {
      status: 200,
    },
  );
}
