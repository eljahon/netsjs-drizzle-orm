import {
  timestamp,
  text,
  varchar,
  serial,
  numeric,
  boolean,
  jsonb,
  json,
  pgTable as createTable,
  uuid,
} from 'drizzle-orm/pg-core';
import { InferSelectModel, sql, relations } from 'drizzle-orm';

// Roles table
const RolesTable=createTable('roles',{
  id:uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  name:text('name').notNull(),
  permissions:jsonb('permissions').default('[]'),
})


// Users table
const UsersTable = createTable('UsersTable', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
  password: text('password').notNull(),
  phone: text('phone').notNull().unique(),
  role_id:uuid('role_id').notNull(),
  created_at: timestamp('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updated_at: timestamp('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Relations tables 

// Users Table Relations
const userRelations = relations(UsersTable, ({ one }) => ({
  role: one(RolesTable, {
    fields: [UsersTable.role_id], // Foreign key in UsersTable
    references: [RolesTable.id], // Primary key in RolesTable
  }),
}));



// Database schema
export const databaseSchema = {
  UsersTable,
  RolesTable,
};

// Database Types
export type UserType = InferSelectModel<typeof UsersTable>;
export type RoleType = InferSelectModel<typeof RolesTable>;
// Database tables
export { UsersTable, RolesTable };
