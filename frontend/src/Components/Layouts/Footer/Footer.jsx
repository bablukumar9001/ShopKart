import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Grid, Typography, IconButton, TextField, Button, Divider } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import SendIcon from "@mui/icons-material/Send";
import AndroidIcon from "@mui/icons-material/Android";
import AppleIcon from "@mui/icons-material/Apple";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Box component="footer" className="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4} py={8}>
          {/* Company Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="footer-heading" gutterBottom>
              ShopKart
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Your one-stop destination for all your shopping needs. Quality products, competitive prices, and exceptional service.
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <LocationOnIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary">
                123 Shopping Ave, Retail City
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <PhoneIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary">
                +1 (555) 123-4567
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <EmailIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary">
                support@shopkart.com
              </Typography>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="footer-heading" gutterBottom>
              Quick Links
            </Typography>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms & Conditions</Link>
              </li>
            </ul>
          </Grid>

          {/* Categories */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="footer-heading" gutterBottom>
              Categories
            </Typography>
            <ul className="footer-links">
              <li>
                <Link to="/products?category=electronics">Electronics</Link>
              </li>
              <li>
                <Link to="/products?category=clothing">Clothing</Link>
              </li>
              <li>
                <Link to="/products?category=accessories">Accessories</Link>
              </li>
              <li>
                <Link to="/products?category=footwear">Footwear</Link>
              </li>
              <li>
                <Link to="/products?category=beauty">Beauty</Link>
              </li>
              <li>
                <Link to="/products?category=home">Home & Kitchen</Link>
              </li>
            </ul>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="footer-heading" gutterBottom>
              Download Our App
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Download App for Android and iOS mobile phones
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
              <Button 
                variant="outlined" 
                startIcon={<AndroidIcon />}
                sx={{ justifyContent: "flex-start" }}
              >
                Google Play Store
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<AppleIcon />}
                sx={{ justifyContent: "flex-start" }}
              >
                Apple App Store
              </Button>
            </Box>
            
            <Typography variant="h6" className="footer-heading" gutterBottom>
              Newsletter
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Subscribe to receive updates on new arrivals and special offers
            </Typography>
            <Box sx={{ display: "flex" }}>
              <TextField
                size="small"
                placeholder="Your Email"
                variant="outlined"
                sx={{ 
                  flexGrow: 1,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "4px 0 0 4px"
                  }
                }}
              />
              <Button 
                variant="contained" 
                color="primary"
                sx={{ 
                  borderRadius: "0 4px 4px 0",
                  boxShadow: "none"
                }}
              >
                <SendIcon fontSize="small" />
              </Button>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3 }} />
        
        {/* Social Media & Copyright */}
        <Box sx={{ 
          display: "flex", 
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          py: 2
        }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: { xs: 2, sm: 0 } }}>
            © {currentYear} ShopKart. All Rights Reserved.
          </Typography>
          
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton className="social-icon facebook">
              <FacebookIcon />
            </IconButton>
            <IconButton className="social-icon twitter">
              <TwitterIcon />
            </IconButton>
            <IconButton className="social-icon instagram">
              <InstagramIcon />
            </IconButton>
            <IconButton className="social-icon youtube">
              <YouTubeIcon />
            </IconButton>
            <IconButton className="social-icon linkedin">
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
