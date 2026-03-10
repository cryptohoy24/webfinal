import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  return NextResponse.json(
    { error: 'Deprecated: This endpoint is no longer in use. Signed URLs are now generated client-side.' },
    { status: 410 }
  );
}
