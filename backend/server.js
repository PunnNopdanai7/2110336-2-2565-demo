const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const reteLimit = require("express-rate-limit");
const xss = require("xss-clean");
const hpp = require("hpp");

// Import route files
const tasks = require("./routes/task.route");
const auth = require("./routes/auth.route");

const app = express();

// Load env vars
dotenv.config({ path: ".env" });

// Call Imported function to connect to the database
connectDB();

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// Enhance security
app.use(cookieParser());
app.use(mongoSanitize());
app.use(helmet());
app.use(
  reteLimit({
    windowwsMS: 10 * 60 * 1000, //10 mins converts to ms
    max: 100,
  })
);
app.use(xss());
app.use(hpp());

// Mount routers
app.use("/api/v1/tasks", tasks);
app.use("/api/v1/auth", auth);

const PORT = process.env.PORT;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
});
