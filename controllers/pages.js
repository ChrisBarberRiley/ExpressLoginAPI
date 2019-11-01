// @desc        Get all pages
// @route       GET /api/v1/pages
// @access      Public
exports.getPages = (req, res, next) => {
    res.status(200).json({ success: true, msg: "Show all pages" });
};

// @desc        Get specific page
// @route       GET /api/v1/pages/:id
// @access      Public
exports.getSinglePage = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `Show specific page ${req.params.id}`
    });
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
