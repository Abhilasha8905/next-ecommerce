import { type NextRequest, NextResponse } from 'next/server';
import { type Checkout } from '@/types/app';
import { data, checkout } from '@/lib/api';

export async function POST(request: NextRequest) {
  try {
    const payload: Partial<Checkout> = await request.json();

    if (!payload || !payload.products || !payload.products.length) {
      return NextResponse.json(
        { success: false, message: 'Failed to place order: invalid request!', data: null },
        { status: 400 },
      );
    }

    const order = await checkout(payload.user ?? data.users[0], payload.products);

    return NextResponse.json(
      {
        success: true,
        message: 'Order placed successfully.',
        data: order,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to place order: ' + (error as Error).message,
        data: null,
      },
      { status: 500 },
    );
  }
}
