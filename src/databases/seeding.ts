import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { databaseSchema, RolesTable } from './databaseSchema';
const { UsersTable } = databaseSchema;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema: databaseSchema });
async function main() {
  console.log('Seeding database...');
//   const [role] = await db.insert(RolesTable).values({
//     user_id: '',
//     name: 'superAdmin',
//     permissions: ['create', 'read', 'update', 'delete'],
//   }).returning()
//   await db.insert(UsersTable).values({
//     first_name: 'John',
//     last_name: 'Doe',
//     password: 'p@ssword',
//     phone: '+919876543210',
//     role_id: role.id,
//   });
  console.log('Database seeded successfully');
}

main();
