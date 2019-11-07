const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }
    // else if (req.cookies.token) {
    //     token - req.cookies.toke;
    // }

    // Make sure token exists
    if (!token) {
        return next(new ErrorResponse("Not authorised", 401));
    }

    // if token, verify
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log(decoded);

        req.user = await User.findById(decoded.id);

        next();
    } catch (err) {
        console.log(err.red);
        return next(new ErrorResponse("Not authorised", 401));
    }
};
