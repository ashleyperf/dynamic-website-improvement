CREATE TABLE "reader_progress" (
	"id" text PRIMARY KEY,
	"quote_checks" jsonb DEFAULT '[]' NOT NULL,
	"studio_checks" jsonb DEFAULT '[]' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
