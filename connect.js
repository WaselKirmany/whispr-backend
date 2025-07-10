// import dotenv from "dotenv";
// dotenv.config(); // 🔥 Must stay at the top

// import pg from "pg";
// const { Client } = pg;

// console.log("🌐 DATABASE_URL:", process.env.DATABASE_URL);

// const db = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false, // Supabase requires this
//   },
// });

// db.connect((err) => {
//   if (err) {
//     console.error("❌ Failed to connect to DB:", err.stack);
//   } else {
//     console.log("✅ Connected to Supabase PostgreSQL");
//   }
// });

// export { db };
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
