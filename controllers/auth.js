const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const asyncHandler = require("../middleware/async");

// @desc        Register a new user
// @route       POST /api/v1/auth/register
// @access      Public
exports.register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        const user = await User.create({
            name,
            email,
            password,
            role
        });

        sendTokenResponse(user, 200, res);
    } catch (err) {
        next(err);
    }
};

// @desc        Login user
// @route       POST /api/v1/auth/login
// @access      Public
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Make sure email and password exists
        if (!email || !password) {
            return next(
                new ErrorResponse("Please provide an email and password", 400)
            );
        }

        // Check user exists
        const user = await User.findOne({ email }).select("+password");

        if (!email) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        // Check if password matches stored password
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        sendTokenResponse(user, 200, res);
    } catch (err) {
        next(err);
    }
};

// Get token from model, create cookie, send response
exports.sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    if (process.env.NODE_ENV === "production") {
        options.secure = true;
    }

    res.status(statusCode)
        .cookie("token", token, options)
        .json({
            success: true,
            token
        });
};

exports.getMe = asyncHandler(async (req, res, next) => {
    console.log(req.user.id);
    const user = await User.findById(req.user.id);

    if (!user) {
        next(new ErrorResponse(`Cannot find user id ${req.user.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: user
    });
});
