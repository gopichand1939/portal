// Env is loaded in server.js before this file is required
// This server is API-only. Do NOT add routes for /, /_next/*, or static assets.
// Frontend runs separately (next dev / next start on port 3000). API only.
const express = require("express");
const cors = require("cors");

const routes = require("./routes/routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

module.exports = app;
