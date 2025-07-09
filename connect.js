import dotenv from "dotenv";
dotenv.config(); // 🔥 Must be first

import pg from "pg";
const { Client } = pg;
console.log("DB_PASS:", process.env.DB_PASS);
console.log("typeof DB_PASS:", typeof process.env.DB_PASS);

const db = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS, // Ensure this is set in your environment variables
  port: 5432,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Failed to connect to DB:", err.stack);
    console.log("DB_PASS:", process.env.DB_PASS);
    console.log("typeof DB_PASS:", typeof process.env.DB_PASS);
  } else {
    console.log("✅ Connected to PostgreSQL");
  }
});

export { db };