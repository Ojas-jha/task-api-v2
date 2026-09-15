require("dotenv").config();
const app = require("./app");
const pool = require("./db");

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await pool.query("SELECT 1");
    console.log("PostgreSQL connected.");
    app.listen(PORT, () => {
      console.log(`Task API running at http://localhost:${PORT}`);
      console.log(`Swagger UI: http://localhost:${PORT}/docs`);
    });
  } catch (error) {
    console.error("Could not connect to PostgreSQL.");
    console.error(error.message);
    process.exit(1);
  }
}
startServer();
