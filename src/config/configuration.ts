export default () => ({
  port: parseInt(process.env.PORT, 10) || 5000,
  seedData: {
    phoneNumber: process.env.ADMIN_PHONE_NUMBER,
    password: process.env.ADMIN_PASSWORD,
    role: 'superAdmin',
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    database: process.env.DATABASE_NAME,
    url: process.env.DATABASE_URL,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },
});
