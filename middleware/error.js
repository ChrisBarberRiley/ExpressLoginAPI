const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
    let error = { ...err };

    error.message = err.message;
    // Console log for devs
    console.log(err.stack.red);

    if (err.name === "CastError") {
        const message = `Resource (${err.value}) not found`;
        error = new ErrorResponse(message, 404);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        msg: error.message || "Server error!"
    });
};

module.exports = errorHandler;
