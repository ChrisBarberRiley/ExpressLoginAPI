const Pages = require("../models/Pages");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc        Get all pages
// @route       GET /api/v1/pages
// @access      Public
exports.getPages = asyncHandler(async (req, res, next) => {
    let query;

    const reqQuery = { ...req.query };

    const removeFields = ["select", "sort", "page", "limit"];

    removeFields.forEach(param => delete reqQuery[param]);

    console.log(reqQuery);

    let queryStr = JSON.stringify(reqQuery);

    queryStr = queryStr.replace(
        /\b(gte|gt|lte|lt|in)\b/g,
        match => `$${match}`
    );

    query = Pages.find(JSON.parse(queryStr));

    if (req.query.select) {
        const fields = req.query.select.split(",").join(" ");
        query = query.select(fields);
    }

    if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
    } else {
        query = query.sort("-createdAt");
    }

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    const data = await query;

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
