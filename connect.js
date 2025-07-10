import dotenv from "dotenv";
dotenv.config();

import pg from "pg";
const { Pool } = pg;

console.log("🌐 DATABASE_URL:", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on("connect", () => {
  console.log("✅ Pool connected to Supabase PostgreSQL");
});

pool.on("error", (err) => {
  console.error("❌ Pool error:", err.stack);
});

export default pool;
