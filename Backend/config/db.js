// Env is loaded in server.js before any route/model is required
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;

if (!connectionString || typeof connectionString !== "string" || !connectionString.trim()) {
  const hint = "Set DATABASE_URL in Backend/.env (your Neon connection string).";
  throw new Error("DATABASE_URL is missing. " + hint);
}

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

pool.connect()
  .then(() => console.log("Postgres connected"))
  .catch(err => console.error("DB error:", err));

module.exports = pool;
