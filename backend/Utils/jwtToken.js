require("dotenv").config({ path: "./config/dotenv.config" });

// Create Token and saving in cookie
const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // Options for the cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // Prevent client-side JavaScript access
    secure: process.env.NODE_ENV === "production", // Secure in production
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // None for cross-origin, Lax for development
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
