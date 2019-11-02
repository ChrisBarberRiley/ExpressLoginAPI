const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");

// Load application config vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

// Require routes
const pages = require("./routes/pages");

const app = express();

// Body parser
app.use(express.json());

// Dev logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Mount routers
app.use("/api/v1/pages", pages);

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
