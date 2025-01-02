const dotenv = require("dotenv");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const stripe = require("stripe");

// Ensure `.env` is loaded before accessing environment variables
dotenv.config({ path: "./config/dotenv.config" });

// Validate Stripe Secret Key
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined in .env");
}

const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

// Process Payment
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const { amount } = req.body;

  if (!amount) {
    return res.status(400).json({
      success: false,
      message: "Amount is required to process payment",
    });
  }

  const paymentIntent = await stripeClient.paymentIntents.create({
    amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
  });

  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  });
});

// Send Stripe API Key
exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  const stripeApiKey = process.env.STRIPE_API_KEY;

  if (!stripeApiKey) {
    return res.status(500).json({
      success: false,
      message: "Stripe API Key is not defined in .env",
    });
  }

  res.status(200).json({
    success: true,
    stripeApiKey,
  });
});
