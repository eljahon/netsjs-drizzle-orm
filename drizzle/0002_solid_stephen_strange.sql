ALTER TABLE "UsersTable" DROP CONSTRAINT "UsersTable_email_unique";--> statement-breakpoint
ALTER TABLE "UsersTable" DROP COLUMN IF EXISTS "email";--> statement-breakpoint
ALTER TABLE "UsersTable" ADD CONSTRAINT "UsersTable_phone_unique" UNIQUE("phone");