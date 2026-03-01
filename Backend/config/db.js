// Env is loaded in server.js before any route/model is required
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;

if (!connectionString || typeof connectionString !== "string" || !connectionString.trim()) {
  throw new Error(
    "DATABASE_URL is missing. Set it in Backend/.env (your Neon connection string)."
  );
}

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }, // Neon requires SSL
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

// fires whenever a new connection is established
pool.on("connect", () => {
  console.log("Postgres pool connected");
});

// prevents Node crash on unexpected disconnect
pool.on("error", (err) => {
  console.error("Unexpected Postgres pool error:", err);
});

module.exports = pool;