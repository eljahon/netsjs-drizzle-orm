ALTER TABLE "UsersTable" ALTER COLUMN "role_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "roles" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "roles" ADD CONSTRAINT "roles_user_id_UsersTable_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."UsersTable"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
