// import React from 'react'
// import {Link} from "react-router-dom"
// import ReactStar from "react-rating-stars-component"



// const ProductCard = ({product}) => {
//   const options ={
//     edit:false,
//     color:"rgba(20,20,20,0,1)",
//     activeColor:"tomato",
//     size:window.innerWidth <600 ? 20:25,
//     value:product.ratings,
//     inHalf:true
//   }

//   return (
//   <>
  
//   <Link className='productCard'to={`/product/${product._id}`}>
//   <img src={product.images[0].urls} alt={product.name} />
//   <p>{product.name}</p>

//   <div>
//     <ReactStar{ ...options}/> <span>({product.numOfReviews})</span>
//   </div>
//   <span>₹{product.price}</span>
  
//   </Link>
  
//   </>
//   )
// }

// export default ProductCard


import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Rating, Chip, Card, CardContent, CardMedia, CardActionArea, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  // Check if the product or product.images is undefined or empty
  if (!product || !product.images || product.images.length === 0) {
    return null; // Don't render the component if data is missing
  }

  return (
    <Card className="product-card">
      <CardActionArea component={Link} to={`/product/${product._id}`}>
        <div className="product-card-media-container">
          <CardMedia
            component="img"
            image={product.images[0]?.url || "/placeholder-image.jpg"}
            alt={product.name}
            className="product-card-media"
          />
          {product.stock <= 0 && (
            <div className="out-of-stock-overlay">
              <Typography variant="subtitle1">Out of Stock</Typography>
            </div>
          )}
        </div>
        
        <CardContent className="product-card-content">
          <Chip 
            label={product.category} 
            size="small" 
            className="product-category-chip"
          />
          
          <Typography 
            variant="h6" 
            className="product-card-title"
            title={product.name}
          >
            {product.name}
          </Typography>
          
          <Box className="product-card-rating">
            <Rating 
              value={product.ratings} 
              precision={0.5} 
              size="small" 
              readOnly 
            />
            <Typography variant="body2" className="product-review-count">
              ({product.numOfReviews})
            </Typography>
          </Box>
          
          <Box className="product-card-price-container">
            <Typography variant="h6" className="product-card-price">
              ₹{product.price.toLocaleString()}
            </Typography>
            {product.offerPrice && product.offerPrice < product.price && (
              <>
                <Typography variant="body2" className="product-card-original-price">
                  ₹{product.offerPrice.toLocaleString()}
                </Typography>
                <Chip 
                  label={`${Math.round((1 - product.offerPrice / product.price) * 100)}% OFF`} 
                  size="small" 
                  className="product-discount-chip"
                />
              </>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
      
      <Box className="product-card-actions">
        <IconButton 
          className="product-card-action-button wishlist"
          aria-label="add to wishlist"
        >
          <FavoriteIcon fontSize="small" />
        </IconButton>
        <IconButton 
          className="product-card-action-button cart"
          aria-label="add to cart"
          disabled={product.stock <= 0}
        >
          <ShoppingCartIcon fontSize="small" />
        </IconButton>
      </Box>
    </Card>
  );
};

export default ProductCard;
