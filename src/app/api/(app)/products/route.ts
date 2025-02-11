import { type NextRequest, NextResponse } from 'next/server';
import { data } from '@/lib/api';

export async function GET(request: NextRequest) {
  let { products } = data;

  const category = request.nextUrl.searchParams.get('category');
  if (category) {
    products = products.filter(p => p.categories.includes(category));
  }
  return NextResponse.json(
    {
      success: true,
      message: `Found ${products.length} product item(s).`,
      data: products,
    },
    {
      status: 200,
    },
  );
}


