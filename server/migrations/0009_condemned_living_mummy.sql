CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"description" text NOT NULL,
	"text" text NOT NULL,
	"created" timestamp DEFAULT now(),
	"price" real NOT NULL
);
