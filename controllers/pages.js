const Pages = require("../models/Pages");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc        Get all pages
// @route       GET /api/v1/pages
// @access      Public
exports.getPages = asyncHandler(async (req, res, next) => {
    const data = await Pages.find();

    res.status(200).json({
        success: true,
        count: data.length,
        data
    });
});

// @desc        Get specific page
// @route       GET /api/v1/pages/:id
// @access      Public
exports.getSinglePage = asyncHandler(async (req, res, next) => {
    const data = await Pages.findById(req.params.id);

    if (!data) {
        return next(
            new ErrorResponse(`Page with id (${req.params.id}) not found`, 404)
        );
    }

    res.status(200).json({
        success: true,
        msg: `Show specific page ${req.params.id}`,
        data
    });
});

// @desc        Create specific page
// @route       POST /api/v1/pages/
// @access      Public
exports.createSinglePage = asyncHandler(async (req, res, next) => {
    const page = await Pages.create(req.body);
    res.status(201).json({
        success: true,
        msg: `Create new page`,
        data: page
    });
});

// @desc        Delete specific page
// @route       DELETE /api/v1/pages/:id
// @access      Public
exports.deleteSinglePage = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `Delete specific page ${req.params.id}`
    });
});
