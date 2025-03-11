import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <Box className="cart-item-card">
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box 
          component="img" 
          src={item.image} 
          alt={item.name}
          sx={{ 
            width: { xs: '60px', sm: '80px' },
            height: { xs: '60px', sm: '80px' },
            objectFit: 'contain',
            borderRadius: '8px',
            border: '1px solid #eee',
            p: 1,
            bgcolor: '#f9f9f9',
            mr: 2
          }}
        />
        
        <Box sx={{ flex: 1 }}>
          <Typography 
            component={Link} 
            to={`/product/${item.product}`}
            variant="subtitle1"
            sx={{ 
              fontWeight: 500,
              color: '#333',
              textDecoration: 'none',
              display: 'block',
              mb: 0.5,
              '&:hover': {
                color: '#f50057',
                textDecoration: 'underline'
              }
            }}
          >
            {item.name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontWeight: 500 }}
            >
              ₹{item.price.toLocaleString()} / item
            </Typography>
            
            <Tooltip title="Remove from cart" arrow>
              <IconButton 
                onClick={() => deleteCartItems(item.product)}
                size="small"
                sx={{ 
                  color: '#f44336',
                  '&:hover': {
                    bgcolor: 'rgba(244, 67, 54, 0.08)'
                  }
                }}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartItemCard;
