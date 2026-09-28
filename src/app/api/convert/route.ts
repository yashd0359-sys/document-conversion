import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { conversionJobs } from '@/db/schema';
import { executeConversion, fileStore } from '@/lib/converter';
import { SUPPORTED_TARGETS, MAX_FILE_SIZE_BYTES } from '@/lib/types';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const targetFormat = (formData.get('targetFormat') as string || '').toLowerCase().trim();

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: `File exceeds maximum allowed size of 50MB. Received: ${(file.size / (1024 * 1024)).toFixed(1)}MB` },
        { status: 413 }
      );
    }

    const originalName = file.name || 'document';
    const extParts = originalName.split('.');
    const sourceExt = extParts.length > 1 ? extParts.pop()!.toLowerCase() : '';

    if (!sourceExt) {
      return NextResponse.json({ error: 'Unable to determine source file format from file extension.' }, { status: 400 });
    }

    const allowedTargets = SUPPORTED_TARGETS[sourceExt];
    if (!allowedTargets) {
      return NextResponse.json(
        { error: `Unsupported source format '.${sourceExt}'. Supported formats: PDF, DOCX, PPTX, XLSX, PNG, JPG.` },
        { status: 400 }
      );
    }

    // Default target format if not supplied
    const effectiveTarget = targetFormat || allowedTargets[0];
    if (!allowedTargets.includes(effectiveTarget)) {
      return NextResponse.json(
        { error: `Cannot convert .${sourceExt} to .${effectiveTarget}. Supported targets: ${allowedTargets.join(', ')}` },
        { status: 400 }
      );
    }

    const jobId = crypto.randomUUID();
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Record job in Postgres database
    try {
      await db.insert(conversionJobs).values({
        id: jobId,
        originalName,
        fileSize: file.size,
        sourceFormat: sourceExt,
        targetFormat: effectiveTarget,
        status: 'converting',
        progress: 50,
      });
    } catch (dbErr) {
      console.warn('DB insert notice (continuing in-memory):', dbErr);
    }

    // Execute conversion engine
    const startTime = Date.now();
    const result = await executeConversion(buffer, originalName, sourceExt, effectiveTarget);
    const downloadKey = crypto.randomBytes(16).toString('hex');

    // Save to server-side cache for download streaming
    fileStore.set(downloadKey, {
      data: result.data,
      filename: result.targetFilename,
      mimeType: result.mimeType,
      createdAt: Date.now(),
    });

    // Update job status in Postgres
    try {
      await db
        .update(conversionJobs)
        .set({
          status: 'completed',
          progress: 100,
          convertedSize: result.size,
          downloadKey,
          completedAt: new Date(),
        })
        .where(require('drizzle-orm').eq(conversionJobs.id, jobId));
    } catch (e) {
      // Ignored
    }

    return NextResponse.json({
      success: true,
      jobId,
      downloadKey,
      originalName,
      targetFilename: result.targetFilename,
      sourceFormat: sourceExt,
      targetFormat: effectiveTarget,
      originalSize: file.size,
      convertedSize: result.size,
      durationMs: Date.now() - startTime,
      downloadUrl: `/api/download/${downloadKey}`,
    });
  } catch (error: any) {
    console.error('Conversion API Error:', error);
    return NextResponse.json(
      {
        error: error.message || 'An unexpected error occurred during document conversion.',
      },
      { status: 500 }
    );
  }
}
