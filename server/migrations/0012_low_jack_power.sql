ALTER TABLE "productVariants" RENAME COLUMN "producType" TO "productType";--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "title" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "customerID" text;--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "text";