const ErrorHander = require("../Utils/errorhander");

module.exports = (err, req, res, next) => {
    // Assign default status code if not provided
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Handle CastError for invalid MongoDB Object IDs
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid ${err.path}: ${err.value}`;
        err = new ErrorHander(message, 400);
    }

    // Handle other specific errors if needed
    // Example: RangeError or other error types can be handled similarly
    if (err instanceof RangeError) {
        err = new ErrorHander("Range error occurred", 400);
    }

    // Log error for debugging purposes
    console.error("Error details:", err);


    // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHander(message, 400);
  }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again `;
    err = new ErrorHander(message, 400);
  }

  // JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again `;
    err = new ErrorHander(message, 400);
  }


    // Send JSON response with error information
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
