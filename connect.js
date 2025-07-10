import dotenv from "dotenv";
dotenv.config(); // 🔥 Must stay at the top

import pg from "pg";
const { Client } = pg;

console.log("🌐 DATABASE_URL:", process.env.DATABASE_URL);

export const db = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Supabase requires this
  },
});

db.connect((err) => {
  if (err) {
    console.error("❌ Failed to connect to DB:", err.stack);
  } else {
    console.log("✅ Connected to Supabase PostgreSQL");
  }
});