import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();
const { Pool } = pkg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ DATABASE_URL is not set in .env');
  process.exit(1);
}

export const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false } // Neon requires SSL
});
