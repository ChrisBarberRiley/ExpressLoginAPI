const ErrorResponse = require("../utils/errorResponse");
const Articles = require("../models/Articles");

exports.listBlogs = async (req, res, next) => {
    res.status(200).json({
        message: "Hello world"
    });
};
