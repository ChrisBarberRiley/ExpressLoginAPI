const Pages = require("../models/Pages");
const ErrorResponse = require("../utils/errorResponse");
// @desc        Get all pages
// @route       GET /api/v1/pages
// @access      Public
exports.getPages = async (req, res, next) => {
    try {
        const data = await Pages.find();

        res.status(200).json({
            success: true,
            msg: "Show all pages",
            data
        });
    } catch (err) {
        next(err);
    }
};

// @desc        Get specific page
// @route       GET /api/v1/pages/:id
// @access      Public
exports.getSinglePage = async (req, res, next) => {
    try {
        const data = await Pages.findById(req.params.id);

        if (!data) {
            return next(
                new ErrorResponse(
                    `Page with id (${req.params.id}) not found`,
                    404
                )
            );
        }

        res.status(200).json({
            success: true,
            msg: `Show specific page ${req.params.id}`,
            data
        });
    } catch (err) {
        next(err);
    }
};

// @desc        Create specific page
// @route       POST /api/v1/pages/
// @access      Public
exports.createSinglePage = async (req, res, next) => {
    try {
        const page = await Pages.create(req.body);
        res.status(201).json({
            success: true,
            msg: `Create new page`,
            data: page
        });
    } catch (err) {
        next(err);
    }
};

// @desc        Delete specific page
// @route       DELETE /api/v1/pages/:id
// @access      Public
exports.deleteSinglePage = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `Delete specific page ${req.params.id}`
    });
};
