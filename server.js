const express = require("express");
const dotenv = require("dotenv");

// Require routes
const pages = require("./routes/pages");

// Load application config vars
dotenv.config({ path: "./config/config.env" });

const app = express();

// Mount routers
app.use("/api/v1/pages", pages);

// Declare port and run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
