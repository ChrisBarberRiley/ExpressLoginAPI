const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// Load envs
dotenv.config({ path: "./config/config.env" });

// Load models
const Pages = require("./models/Pages");

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// Read JSON files
const pages = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/pages.json`, "UTF-8")
);

// Import into DB
const importData = async () => {
    try {
        await Pages.create(pages);

        console.log("Data imported".green.inverse);
        process.exit();
    } catch (err) {
        console.log(err);
        console.log("Data import failed".red.inverse);
        process.exit();
    }
};

// Delete data
const deleteData = async () => {
    try {
        await Pages.deleteMany();

        console.log("Data deleted".green.inverse);
        process.exit();
    } catch (err) {
        console.log(err);
        console.log("Data cannot be deleted".red.inverse);
        process.exit();
    }
};

if (process.argv[2] == "-i") {
    importData();
} else if (process.argv[2] == "-d") {
    deleteData();
}
