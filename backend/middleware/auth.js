const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken")
const User = require("../models/user");
const ErrorHander = require("../Utils/errorhander");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;

    // console.log(token)

    if (!token) {
        return next(new ErrorHander("Please Login to access this resource", 401));

    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();

})

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHander(
                    `Role: ${req.user.role} is not allowed to access this resouce `,
                    403
                )
            );
        }

        next();
    };
};