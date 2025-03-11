import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { 
  Box, 
  Typography, 
  Button, 
  IconButton, 
  Container, 
  Paper, 
  Divider, 
  Grid,
  Card,
  CardContent,
  Tooltip,
  Badge
} from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../Layouts/MetaData";

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
    navigate("/shipping");
  };

  // Calculate cart totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  
  const tax = subtotal * 0.18; // 18% tax
  const shippingCharges = subtotal > 1000 ? 0 : 200; // Free shipping over ₹1000
  const total = subtotal + tax + shippingCharges;

  return (
    <Fragment>
      <MetaData title="Shopping Cart - ShopKart" />
      
      <Container maxWidth="lg" sx={{ py: 4, minHeight: '80vh' }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 700, 
            mb: 4,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <ShoppingCartIcon sx={{ mr: 1.5, color: '#f50057' }} />
          Your Shopping Cart
          <Badge 
            badgeContent={cartItems.length} 
            color="primary" 
            sx={{ ml: 2 }}
          />
        </Typography>
        
        {cartItems.length === 0 ? (
          <Paper 
            elevation={0} 
            sx={{ 
              p: 5, 
              textAlign: 'center',
              borderRadius: '10px',
              border: '1px dashed #ccc',
              bgcolor: '#f9f9f9'
            }}
          >
            <RemoveShoppingCartIcon 
              sx={{ 
                fontSize: 80, 
                color: '#f50057',
                opacity: 0.7,
                mb: 2
              }} 
            />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
              Your Cart is Empty
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Looks like you haven't added any products to your cart yet.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              component={Link} 
              to="/products"
              startIcon={<ShoppingBagIcon />}
              sx={{ 
                mt: 2,
                borderRadius: '30px',
                px: 3,
                py: 1,
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              Continue Shopping
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={4}>
            {/* Cart Items */}
            <Grid item xs={12} md={8}>
              <Paper 
                elevation={0} 
                sx={{ 
                  borderRadius: '10px',
                  overflow: 'hidden',
                  border: '1px solid #eee',
                  mb: { xs: 3, md: 0 }
                }}
              >
                <Box 
                  className="cart-header" 
                  sx={{ 
                    bgcolor: '#f50057',
                    color: 'white',
                    py: 1.5,
                    px: 3,
                    display: 'grid',
                    gridTemplateColumns: { xs: '3fr 1fr 1fr', md: '4fr 1fr 1fr' }
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Product</Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, textAlign: 'center' }}>Quantity</Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, textAlign: 'right' }}>Subtotal</Typography>
                </Box>
                
                {cartItems.map((item) => (
                  <Box key={item.product} sx={{ borderBottom: '1px solid #eee' }}>
                    <Box 
                      sx={{ 
                        display: 'grid',
                        gridTemplateColumns: { xs: '3fr 1fr 1fr', md: '4fr 1fr 1fr' },
                        py: 2,
                        px: 3,
                        alignItems: 'center'
                      }}
                    >
                      <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconButton
                          onClick={() => decreaseQuantity(item.product, item.quantity)}
                          size="small"
                          sx={{ 
                            bgcolor: '#f1f1f1',
                            '&:hover': { bgcolor: '#e0e0e0' }
                          }}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            mx: 1.5,
                            minWidth: '30px',
                            textAlign: 'center',
                            fontWeight: 600
                          }}
                        >
                          {item.quantity}
                        </Typography>
                        
                        <IconButton
                          onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}
                          size="small"
                          sx={{ 
                            bgcolor: '#f1f1f1',
                            '&:hover': { bgcolor: '#e0e0e0' }
                          }}
                          disabled={item.quantity >= item.stock}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                      
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontWeight: 600,
                          textAlign: 'right',
                          color: '#f50057'
                        }}
                      >
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Paper>
            </Grid>
            
            {/* Order Summary */}
            <Grid item xs={12} md={4}>
              <Card 
                elevation={0} 
                sx={{ 
                  borderRadius: '10px',
                  border: '1px solid #eee'
                }}
              >
                <CardContent>
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 600,
                      pb: 2,
                      borderBottom: '1px solid #eee'
                    }}
                  >
                    Order Summary
                  </Typography>
                  
                  <Box sx={{ my: 2 }}>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        mb: 1.5
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        ₹{subtotal.toLocaleString()}
                      </Typography>
                    </Box>
                    
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        mb: 1.5
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Tax (18%)
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        ₹{tax.toFixed(2)}
                      </Typography>
                    </Box>
                    
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        mb: 1.5
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Shipping Charges
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {shippingCharges === 0 ? (
                          <span style={{ color: 'green' }}>FREE</span>
                        ) : (
                          `₹${shippingCharges.toFixed(2)}`
                        )}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Divider />
                  
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      mt: 2,
                      mb: 3
                    }}
                  >
                    <Typography variant="h6" fontWeight={600}>
                      Total
                    </Typography>
                    <Typography variant="h6" fontWeight={600} color="primary">
                      ₹{total.toLocaleString()}
                    </Typography>
                  </Box>
                  
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    onClick={checkoutHandler}
                    endIcon={<ArrowForwardIcon />}
                    sx={{ 
                      py: 1.5,
                      borderRadius: '30px',
                      textTransform: 'none',
                      fontWeight: 600,
                      boxShadow: '0 4px 10px rgba(245, 0, 87, 0.3)'
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                  
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    component={Link}
                    to="/products"
                    sx={{ 
                      mt: 2,
                      borderRadius: '30px',
                      textTransform: 'none'
                    }}
                  >
                    Continue Shopping
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </Fragment>
  );
};

export default Cart;
