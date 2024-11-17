CREATE TABLE IF NOT EXISTS "UsersTable" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"phone" text NOT NULL,
	"role_id" uuid,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "UsersTable_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "users" RENAME TO "roles";--> statement-breakpoint
ALTER TABLE "roles" RENAME COLUMN "created_at" TO "name";--> statement-breakpoint
ALTER TABLE "roles" DROP CONSTRAINT "users_email_unique";--> statement-breakpoint
ALTER TABLE "roles" ADD COLUMN "permissions" jsonb DEFAULT '[]';--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UsersTable" ADD CONSTRAINT "UsersTable_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "roles" DROP COLUMN IF EXISTS "first_name";--> statement-breakpoint
ALTER TABLE "roles" DROP COLUMN IF EXISTS "last_name";--> statement-breakpoint
ALTER TABLE "roles" DROP COLUMN IF EXISTS "email";--> statement-breakpoint
ALTER TABLE "roles" DROP COLUMN IF EXISTS "password";--> statement-breakpoint
ALTER TABLE "roles" DROP COLUMN IF EXISTS "updated_at";