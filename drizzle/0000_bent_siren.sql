CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Tashkent' NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Tashkent' NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
