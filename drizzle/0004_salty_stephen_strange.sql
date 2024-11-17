ALTER TABLE "roles" DROP CONSTRAINT "roles_user_id_UsersTable_id_fk";
--> statement-breakpoint
ALTER TABLE "UsersTable" DROP CONSTRAINT "UsersTable_role_id_roles_id_fk";
--> statement-breakpoint
ALTER TABLE "roles" DROP COLUMN IF EXISTS "user_id";