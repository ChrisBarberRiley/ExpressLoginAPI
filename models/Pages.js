const mongoose = require("mongoose");

const PagesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
        unique: true,
        trim: true
    },
    slug: String,
    description: {
        type: String,
        required: [true, "Please add a description"],
        unique: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Pages", PagesSchema);
