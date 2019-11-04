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
