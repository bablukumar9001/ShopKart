import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { Box, Typography, Button, IconButton } from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty < 1) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    // navigate("/login?redirect=shipping");
    navigate("/shipping");
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <Box
          className="emptyCart"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="50vh"
          textAlign="center"
        >
          <RemoveShoppingCartIcon fontSize="large" />
          <Typography variant="h5" gutterBottom>
            No Product in Your Cart
          </Typography>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              View Products
            </Button>
          </Link>
        </Box>
      ) : (
        <Fragment>
          <Box className="cartPage">
            <Box className="cartHeader" display="flex" justifyContent="space-between" py={2} px={3}>
              <Typography variant="body1">Product</Typography>
              <Typography variant="body1">Quantity</Typography>
              <Typography variant="body1">Subtotal</Typography>
            </Box>

            {cartItems.map((item) => (
              <Box
                className="cartContainer"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                py={2}
                px={3}
                key={item.product}
              >
                <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                <Box className="cartInput" display="flex" alignItems="center">
                  <IconButton
                    onClick={() => decreaseQuantity(item.product, item.quantity)}
                    color="primary"
                  >
                    -
                  </IconButton>
                  <input
                    type="number"
                    value={item.quantity}
                    readOnly
                    style={{
                      width: "40px",
                      textAlign: "center",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                  <IconButton
                    onClick={() =>
                      increaseQuantity(item.product, item.quantity, item.stock)
                    }
                    color="primary"
                  >
                    +
                  </IconButton>
                </Box>
                <Typography className="cartSubtotal" variant="body1">
                  ₹{item.price * item.quantity}
                </Typography>
              </Box>
            ))}

            <Box
              className="cartGrossProfit"
              display="flex"
              flexDirection="column"
              alignItems="flex-end"
              py={2}
              px={3}
            >
              <Box className="cartGrossProfitBox" display="flex" justifyContent="space-between" width="300px">
                <Typography variant="body1">Gross Total</Typography>
                <Typography variant="body1">
                  ₹
                  {cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}
                </Typography>
              </Box>
              <Button
                className="checkOutBtn"
                variant="contained"
                color="primary"
                onClick={checkoutHandler}
                style={{ marginTop: "16px" }}
              >
                Check Out
              </Button>
            </Box>
          </Box>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
