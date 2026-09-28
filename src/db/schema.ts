import { pgTable, serial, text, integer, timestamp, varchar } from 'drizzle-orm/pg-core';

export const conversionJobs = pgTable('conversion_jobs', {
  id: varchar('id', { length: 64 }).primaryKey(),
  originalName: text('original_name').notNull(),
  fileSize: integer('file_size').notNull(),
  sourceFormat: varchar('source_format', { length: 16 }).notNull(),
  targetFormat: varchar('target_format', { length: 16 }).notNull(),
  status: varchar('status', { length: 32 }).notNull().default('queued'), // queued, converting, completed, error
  progress: integer('progress').notNull().default(0),
  convertedSize: integer('converted_size'),
  errorMessage: text('error_message'),
  downloadKey: text('download_key'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
});

export type ConversionJob = typeof conversionJobs.$inferSelect;
export type NewConversionJob = typeof conversionJobs.$inferInsert;
