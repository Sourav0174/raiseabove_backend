const express = require("express");
const meditationRoutes = require("./adapters/routes/meditationRoutes");

const app = express(); // Use const to define the app
const port = process.env.PORT || 6000;

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use("/meditation", meditationRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// https://riseabove-backend.onrender.com
