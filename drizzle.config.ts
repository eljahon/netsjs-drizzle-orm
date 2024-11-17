import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
config();
// const host = process.env.DATABASE_HOST;
// const port = process.env.DATABASE_PORT;
// const database = process.env.DATABASE_NAME;
// const user = process.env.DATABASE_USER;
// const password = process.env.DATABASE_PASSWORD;
const configService = new ConfigService();
const databaseUrl = configService.get('DATABASE_URL');
export default defineConfig({
  schema: './src/databases/databaseSchema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: databaseUrl,
  },
  verbose: true,
  strict: true,
  migrations: {
    schema: 'public'
  },
});
