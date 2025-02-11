import { type NextRequest, NextResponse } from 'next/server';
import { data } from '@/lib/api';

export async function GET(request: NextRequest, { params: { categoryId } }: { params: { [key: string]: string } }) {
  const category = data.categories.find(category => category.id === categoryId) ?? null;

  return NextResponse.json(
    {
      success: !!category,
      message: category ? 'Item found.' : 'Item not found!',
      data: category,
    },
    {
      status: 200,
    },
  );
}
