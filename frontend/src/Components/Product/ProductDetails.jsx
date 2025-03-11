import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { clearErrors, getProductDetails, newReview } from "../../actions/productAction";
import { addItemsToCart } from "../../actions/cartAction";
import { toast } from "react-toastify";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

// Material UI Components
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Rating,
  Divider,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Chip,
  IconButton,
  Tabs,
  Tab,
  Paper,
  Breadcrumbs,
  Skeleton,
  useMediaQuery,
  useTheme,
  Stack,
  Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CachedIcon from "@mui/icons-material/Cached";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// Components
import Loader from "../Layouts/Loader/Loader";
import MetaData from "../Layouts/MetaData";
import ReviewCard from "./ReviewCard";
import "./ProductDetails.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      aria-labelledby={`product-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const { product = {}, loading, error } = useSelector((state) => state.productDetails);
  const { success, error: reviewError } = useSelector((state) => state.newReview);
  const { isAuthenticated } = useSelector((state) => state.user);

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    toast.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    if (!isAuthenticated) {
      toast.error("Please login to submit a review");
      return;
    }
    setOpen(!open);
  };

  const reviewSubmitHandler = () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, error, reviewError, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} | ShopKart`} />
          <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Breadcrumbs */}
            <Breadcrumbs 
              separator={<NavigateNextIcon fontSize="small" />} 
              aria-label="breadcrumb"
              sx={{ mb: 3 }}
            >
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                Home
              </Link>
              <Link to="/products" style={{ textDecoration: 'none', color: 'inherit' }}>
                Products
              </Link>
              <Typography color="text.primary">{product.name}</Typography>
            </Breadcrumbs>

            <Grid container spacing={4}>
              {/* Product Images */}
              <Grid item xs={12} md={6}>
                <Box className="product-images">
                  {product.images && product.images.length > 0 ? (
                    <>
                      <Swiper
                        spaceBetween={10}
                        navigation={!isMobile}
                        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="product-main-slider"
                      >
                        {product.images.map((item, i) => (
                          <SwiperSlide key={i}>
                            <Box 
                              component="img" 
                              src={item.url || "https://via.placeholder.com/500x500?text=No+Image"}
                              alt={`${product.name} - Image ${i+1}`}
                              sx={{ 
                                width: '100%', 
                                height: { xs: '300px', sm: '400px', md: '500px' },
                                objectFit: 'contain',
                                backgroundColor: '#f9f9f9',
                                borderRadius: '8px'
                              }}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                      
                      {product.images.length > 1 && (
                        <Swiper
                          onSwiper={setThumbsSwiper}
                          spaceBetween={10}
                          slidesPerView={4}
                          freeMode={true}
                          watchSlidesProgress={true}
                          modules={[FreeMode, Navigation, Thumbs]}
                          className="product-thumbs-slider"
                          style={{ marginTop: '10px' }}
                        >
                          {product.images.map((item, i) => (
                            <SwiperSlide key={i}>
                              <Box 
                                component="img" 
                                src={item.url || "https://via.placeholder.com/100x100?text=No+Image"} 
                                alt={`Thumbnail ${i+1}`}
                                sx={{ 
                                  width: '100%', 
                                  height: '80px',
                                  objectFit: 'contain',
                                  cursor: 'pointer',
                                  borderRadius: '4px',
                                  border: '1px solid #eee',
                                  '&:hover': {
                                    borderColor: theme.palette.primary.main
                                  }
                                }}
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      )}
                    </>
                  ) : (
                    <Box 
                      sx={{ 
                        width: '100%', 
                        height: { xs: '300px', sm: '400px', md: '500px' },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f9f9f9',
                        borderRadius: '8px'
                      }}
                    >
                      <Typography variant="body1" color="text.secondary">
                        No images available
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Grid>

              {/* Product Details */}
              <Grid item xs={12} md={6}>
                <Box className="product-details">
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography 
                        variant="h4" 
                        component="h1" 
                        gutterBottom
                        sx={{ 
                          fontWeight: 600,
                          fontSize: { xs: '1.5rem', md: '2rem' }
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        Product ID: #{product._id}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton size="small" sx={{ color: 'grey.500' }}>
                        <ShareIcon />
                      </IconButton>
                      <IconButton size="small" sx={{ color: 'grey.500' }}>
                        <FavoriteIcon />
                      </IconButton>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {/* Ratings */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating 
                      value={product.ratings || 0} 
                      precision={0.5} 
                      readOnly 
                    />
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ ml: 1 }}
                    >
                      ({product.numOfReviews} {product.numOfReviews === 1 ? 'Review' : 'Reviews'})
                    </Typography>
                    <Button 
                      variant="text" 
                      size="small" 
                      onClick={submitReviewToggle}
                      sx={{ ml: 2 }}
                    >
                      Submit Review
                    </Button>
                  </Box>

                  {/* Price */}
                  <Box sx={{ mb: 3 }}>
                    <Typography 
                      variant="h4" 
                      color="primary"
                      sx={{ 
                        fontWeight: 700,
                        fontSize: { xs: '1.8rem', md: '2.2rem' }
                      }}
                    >
                      ₹{product.price?.toLocaleString()}
                    </Typography>
                    {product.mrp && product.mrp > product.price && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            textDecoration: 'line-through',
                            color: 'text.secondary'
                          }}
                        >
                          ₹{product.mrp.toLocaleString()}
                        </Typography>
                        <Chip 
                          label={`${Math.round((product.mrp - product.price) / product.mrp * 100)}% OFF`} 
                          color="success" 
                          size="small"
                        />
                      </Box>
                    )}
                  </Box>

                  {/* Stock Status */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body1">
                      Status: 
                      <span 
                        style={{ 
                          color: product.Stock > 0 ? '#4caf50' : '#f44336',
                          fontWeight: 600,
                          marginLeft: '8px'
                        }}
                      >
                        {product.Stock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </Typography>
                  </Box>

                  {/* Description */}
                  <Typography 
                    variant="body1" 
                    sx={{ mb: 3 }}
                  >
                    {product.description}
                  </Typography>

                  {/* Quantity */}
                  {product.Stock > 0 && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body1" gutterBottom>
                        Quantity:
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button 
                          variant="outlined" 
                          onClick={decreaseQuantity}
                          disabled={quantity <= 1}
                          sx={{ minWidth: '40px', p: 0 }}
                        >
                          <RemoveIcon fontSize="small" />
                        </Button>
                        <TextField
                          value={quantity}
                          size="small"
                          InputProps={{
                            readOnly: true,
                            inputProps: { 
                              style: { textAlign: 'center' } 
                            }
                          }}
                          sx={{ 
                            width: '60px', 
                            mx: 1,
                            '& .MuiOutlinedInput-input': {
                              p: 1
                            }
                          }}
                        />
                        <Button 
                          variant="outlined" 
                          onClick={increaseQuantity}
                          disabled={product.Stock <= quantity}
                          sx={{ minWidth: '40px', p: 0 }}
                        >
                          <AddIcon fontSize="small" />
                        </Button>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ ml: 2 }}
                        >
                          {product.Stock} items available
                        </Typography>
                      </Box>
                    </Box>
                  )}

                  {/* Add to Cart Button */}
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={product.Stock < 1}
                    onClick={addToCartHandler}
                    startIcon={<ShoppingCartIcon />}
                    size="large"
                    fullWidth={isMobile}
                    sx={{ 
                      py: 1.5,
                      px: 4,
                      borderRadius: '30px',
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontWeight: 600,
                      mb: 3
                    }}
                  >
                    Add to Cart
                  </Button>

                  {/* Features */}
                  <Box 
                    sx={{ 
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                      gap: 2,
                      mt: 3
                    }}
                  >
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 2, 
                        display: 'flex', 
                        alignItems: 'center',
                        bgcolor: 'rgba(0,0,0,0.02)',
                        borderRadius: '8px'
                      }}
                    >
                      <LocalShippingIcon color="primary" sx={{ mr: 1.5 }} />
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          Free Delivery
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          On orders above ₹500
                        </Typography>
                      </Box>
                    </Paper>
                    
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 2, 
                        display: 'flex', 
                        alignItems: 'center',
                        bgcolor: 'rgba(0,0,0,0.02)',
                        borderRadius: '8px'
                      }}
                    >
                      <VerifiedUserIcon color="primary" sx={{ mr: 1.5 }} />
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          Genuine Product
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          100% Authentic
                        </Typography>
                      </Box>
                    </Paper>
                    
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 2, 
                        display: 'flex', 
                        alignItems: 'center',
                        bgcolor: 'rgba(0,0,0,0.02)',
                        borderRadius: '8px'
                      }}
                    >
                      <CachedIcon color="primary" sx={{ mr: 1.5 }} />
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          Easy Returns
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          10 days return policy
                        </Typography>
                      </Box>
                    </Paper>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            {/* Product Tabs */}
            <Box sx={{ mt: 6 }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                  value={tabValue} 
                  onChange={handleTabChange} 
                  aria-label="product tabs"
                  variant={isMobile ? "scrollable" : "standard"}
                  scrollButtons={isMobile ? "auto" : false}
                  allowScrollButtonsMobile
                  centered={!isMobile}
                >
                  <Tab label="Description" id="product-tab-0" />
                  <Tab 
                    label={`Reviews (${product.numOfReviews || 0})`} 
                    id="product-tab-1" 
                  />
                  <Tab label="Shipping & Returns" id="product-tab-2" />
                </Tabs>
              </Box>
              
              <TabPanel value={tabValue} index={0}>
                <Typography variant="body1">
                  {product.description || "No description available for this product."}
                </Typography>
              </TabPanel>
              
              <TabPanel value={tabValue} index={1}>
                {product.reviews && product.reviews.length > 0 ? (
                  <Box>
                    <Grid container spacing={3}>
                      {product.reviews.map((review) => (
                        <Grid item xs={12} sm={6} md={4} key={review._id}>
                          <ReviewCard review={review} />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                ) : (
                  <Box 
                    sx={{ 
                      textAlign: 'center', 
                      py: 4 
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      No Reviews Yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Be the first to review this product
                    </Typography>
                    <Button 
                      variant="contained" 
                      onClick={submitReviewToggle}
                    >
                      Submit a Review
                    </Button>
                  </Box>
                )}
              </TabPanel>
              
              <TabPanel value={tabValue} index={2}>
                <Typography variant="h6" gutterBottom>
                  Shipping Information
                </Typography>
                <Typography variant="body2" paragraph>
                  We offer free shipping on all orders above ₹500. Standard delivery typically takes 3-5 business days, depending on your location.
                </Typography>
                
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Return Policy
                </Typography>
                <Typography variant="body2" paragraph>
                  If you're not completely satisfied with your purchase, you can return it within 10 days of delivery for a full refund or exchange. The product must be unused and in its original packaging.
                </Typography>
                <Typography variant="body2">
                  Please note that certain products may not be eligible for return due to hygiene reasons. Contact our customer service for more information.
                </Typography>
              </TabPanel>
            </Box>
          </Container>

          {/* Review Dialog */}
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography component="legend" sx={{ mr: 2 }}>
                    Rating:
                  </Typography>
                  <Rating
                    onChange={(e) => setRating(Number(e.target.value))}
                    value={rating}
                    size="large"
                    precision={0.5}
                  />
                </Box>
                <TextField
                  label="Review Comment"
                  multiline
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  variant="outlined"
                  fullWidth
                  placeholder="Share your experience with this product..."
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
