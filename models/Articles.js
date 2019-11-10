const mongoose = require("mongoose");
const slugify = require("slugify");

const ArticlesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    slug: String,
    body: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }
});

ArticlesSchema.pre("save", function() {
    console.log("Slugify ran" + this.title);
    this.slug = slugify(this.title, { lower: true });
    next();
});

module.exports = mongoose.model("articles", ArticlesSchema);
