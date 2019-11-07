const mongoose = require("mongoose");
const slugify = require("slugify");

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

// Create Page slug from name
PagesSchema.pre("save", function() {
    console.log("Slugify ran" + this.name);
    this.slug = slugify(this.name, { lower: true });
    next();
});

module.exports = mongoose.model("Pages", PagesSchema);
