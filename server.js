const express = require("express");
const app = express();
const PORT = 3000;

// Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Routing
app.use("/puppies", require("./puppies.js"));

// Error Handling Middleware
app.use((err, req, res, next) => {
  const status = err?.status ?? 500;
  const message = err?.message ?? "Internal Server Error";
  res.status(status).json({ error: message });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
