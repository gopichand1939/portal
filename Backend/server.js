const path = require("path");

// Load .env from Backend folder first (single source of truth)
const envPath = path.resolve(__dirname, ".env");
require("dotenv").config({ path: envPath, override: true });

// If DATABASE_URL still missing, try cwd (e.g. when run as "node server.js" from Backend)
if (!process.env.DATABASE_URL) {
  require("dotenv").config({ path: path.resolve(process.cwd(), ".env"), override: true });
}

const app = require("./app");

const PORT = process.env.PORT || 15013;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
