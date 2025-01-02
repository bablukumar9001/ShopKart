const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../Controller/paymentController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

// Route to process payment
router.post("/payment/process", isAuthenticatedUser, processPayment);

// Route to get Stripe API Key
router.get("/stripeapikey", isAuthenticatedUser, sendStripeApiKey);

module.exports = router;
