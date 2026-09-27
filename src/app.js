require("dotenv").config();

const express = require("express");
const swaggerUi = require("swagger-ui-express");

const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorHandler");
const openapi = require("../openapi.json");

const app = express();

app.use(express.json());

app.get("/", (req, res) => res.json({
  name: "Task API",
  version: "2.0",
  database: "PostgreSQL",
  endpoints: ["/tasks", "/health", "/docs"]
}));

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);
app.use("/", protectedRoutes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use(errorHandler);

module.exports = app;