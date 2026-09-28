import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { conversionJobs } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    const jobs = await db
      .select()
      .from(conversionJobs)
      .orderBy(desc(conversionJobs.createdAt))
      .limit(30);

    return NextResponse.json({ jobs });
  } catch (err: any) {
    // If DB isn't migrated yet or has errors, gracefully return empty list
    return NextResponse.json({ jobs: [] });
  }
}
