import { type NextRequest, NextResponse } from 'next/server';
import { data } from '@/lib/api';

export async function GET(request: NextRequest) {
  let { products } = data;

  const categoryParam = request.nextUrl.searchParams.get('categories');
  if (categoryParam) {
    const categories = categoryParam.split(',');
    products = products.filter(p => categories.some(category => p.categories.includes(category)));
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
