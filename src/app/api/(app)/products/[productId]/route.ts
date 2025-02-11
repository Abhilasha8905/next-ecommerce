import { type NextRequest, NextResponse } from 'next/server';
import { data } from '@/lib/api';

export async function GET(request: NextRequest, { params: { productId } }: { params: { [key: string]: string } }) {
  const product = data.products.find(product => product.id === productId) ?? null;

  return NextResponse.json(
    {
      success: !!product,
      message: product ? 'Item found.' : 'Item not found!',
      data: product,
    },
    {
      status: 200,
    },
  );
}
