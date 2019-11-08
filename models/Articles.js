const mongoose = require("mongoose");
const slugify = require("slugify");

const ArticlesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    body: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

ArticlesSchema.pre("save", function() {
    this.slug = slugify(this.name, { lower: true });
    next();
});

module.exports = mongoose.model("articles", ArticlesSchema);
