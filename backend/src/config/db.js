import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const DB_USER = process.env.DB_USER || "postgres";
const DB_PASS = process.env.DB_PASS || "password";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 5432;
const DB_NAME = process.env.DB_NAME || "note";

const pool = new Pool({
  user: DB_USER,
  password: DB_PASS,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
});

export default pool;
