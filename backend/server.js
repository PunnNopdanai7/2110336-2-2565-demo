const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");

// Route files
const tasks = require("./routes/task.route");

const app = express();

// Load env vars
dotenv.config({ path: ".env" });

// Connect to database
connectDB();

// Parse requests of content-type - application/json
app.use(express.json());

// Enable CORS
app.use(cors());

// Mount routers
app.use("/api/v1/tasks", tasks);

const PORT = process.env.PORT;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
});
