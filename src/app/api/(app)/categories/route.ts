import { type NextRequest, NextResponse } from 'next/server';
import { data } from '@/lib/api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  const { categories } = data;

  return NextResponse.json(
    {
      success: true,
      message: `Found ${categories.length} item(s).`,
      data: categories,
    },
    {
      status: 200,
    },
  );
}
