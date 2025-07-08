import pg from "pg";

// const db = new pg.Client({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASS,
//   port: 5432,
// });

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "confessions",
  password: "wasel2509",
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