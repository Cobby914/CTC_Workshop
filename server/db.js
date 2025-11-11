import dotenv from 'dotenv';
import pkg from 'pg';
dotenv.config();
const { Pool } = pkg;

const connectionString = process.env.DATABASE_URL;
export const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }
});