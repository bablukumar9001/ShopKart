const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../Controller/orderController");

const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

// Create a new order
router.route("/order/new").post(isAuthenticatedUser, newOrder);

// Get a single order by ID
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

// Get all orders for the logged-in user
router.route("/orders/me").get(isAuthenticatedUser, myOrders);

// Get all orders (Admin only)
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

// Update or delete an order (Admin only)
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;
