ALTER TABLE "products" ADD COLUMN "text" text NOT NULL;--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "title";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "customerID";