import { NextRequest, NextResponse } from 'next/server';
import { fileStore } from '@/lib/converter';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ key: string }> }
) {
  const { key } = await context.params;

  if (!key || !fileStore.has(key)) {
    return NextResponse.json(
      { error: 'File not found or download link has expired.' },
      { status: 404 }
    );
  }

  const fileItem = fileStore.get(key)!;

  return new NextResponse(fileItem.data as any, {
    status: 200,
    headers: {
      'Content-Type': fileItem.mimeType,
      'Content-Disposition': `attachment; filename="${encodeURIComponent(fileItem.filename)}"`,
      'Content-Length': fileItem.data.length.toString(),
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
