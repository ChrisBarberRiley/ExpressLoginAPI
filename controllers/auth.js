const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

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

        const token = user.getSignedJwtToken();

        res.status(200).json({
            success: true,
            token
        });
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

        const token = user.getSignedJwtToken();

        res.status(200).json({
            success: true,
            token
        });
    } catch (err) {
        next(err);
    }
};
