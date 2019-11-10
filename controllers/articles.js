const ErrorResponse = require("../utils/errorResponse");
const Articles = require("../models/Articles");
const asyncHandler = require("../middleware/async");

// List all Articles
exports.listArticles = asyncHandler(async (req, res, next) => {
    let query;

    query = Articles.find();

    const data = await query;

    res.status(200).json({
        success: true,
        count: data.length,
        data
    });
});

// Create Article
exports.createArticle = asyncHandler(async (req, res, next) => {
    req.body.user = req.user.id;
    const data = await Articles.create(req.body);

    res.status(200).json({
        success: true,
        data
    });
});

// Read single Article
exports.getArticle = asyncHandler(async (req, res, next) => {
    const article = await Articles.findById(req.params.id);

    // Check if article exists
    if (!article) {
        return next(
            new ErrorResponse(
                `Article with id (${req.params.id}) not found`,
                404
            )
        );
    }

    res.status(200).json({
        success: true,
        data: article
    });
});

// Update article
exports.updateArticle = asyncHandler(async (req, res, next) => {
    let article = await Articles.findById(req.params.id);

    // Check if article exists
    if (!article) {
        next(
            new ErrorResponse(
                `Article with id (${req.params.id}) not found`,
                404
            )
        );
    }
    console.log(`User id: ${article.user}`.yellow.inverse);
    // check if user has correct permissions
    if (article.user.toString() !== req.user.id && req.user.role !== "admin") {
        next(
            new ErrorResponse(`You are not authorised to make this action`, 401)
        );
    }

    // Update article
    article = await Articles.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    // Send response
    res.status(200).json({
        success: true,
        data: article
    });
});

// Delete article
exports.removeArticle = asyncHandler(async (req, res, next) => {
    let article = await Articles.findById(req.params.id);

    // Check if article exists
    if (!article) {
        next(
            new ErrorResponse(
                `Article with id (${req.params.id}) not found`,
                404
            )
        );
    }

    // Delete article
    await article.remove();

    // Send response
    res.status(200).json({
        success: true
    });
});
