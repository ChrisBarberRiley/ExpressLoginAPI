const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");

// Load application config vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

// Require routes
const pages = require("./routes/pages");
const authentication = require("./routes/auth");

const app = express();

// Body parser
app.use(express.json());

// Dev logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Mount routers
app.use("/api/v1/pages", pages);
app.use("/api/v1/auth", authentication);

// Custom error handling
app.use(errorHandler);

// Declare port and run server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
    console.log(`App listening on port ${PORT}`.yellow.bold)
);

// handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`.red);

    // Close server and exit process
    server.close(() => process.exit(1));
});
