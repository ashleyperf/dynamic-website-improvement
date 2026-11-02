import { pgTable, text, jsonb, timestamp } from 'drizzle-orm/pg-core'

export const readerProgress = pgTable('reader_progress', {
  id: text('id').primaryKey(),
  quoteChecks: jsonb('quote_checks').$type<boolean[]>().notNull().default([]),
  studioChecks: jsonb('studio_checks').$type<boolean[]>().notNull().default([]),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})
