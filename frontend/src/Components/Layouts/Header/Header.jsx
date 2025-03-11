import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Badge,
  Container,
  Avatar,
  useMediaQuery,
  useTheme,
  Slide,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  InputAdornment,
  Tooltip,
  Zoom,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CloseIcon from "@mui/icons-material/Close";
import UserOptions from "./UserOptions";
import "./Header.css";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [cartUpdated, setCartUpdated] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  const navigate = useNavigate();
  
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleSearchDialogOpen = () => {
    navigate('/search');
  };

  const handleSearchDialogClose = () => {
    setSearchDialogOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      handleSearchDialogClose();
      navigate(`/search?keyword=${searchQuery}`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const visible = prevScrollPos > currentScrollPos || currentScrollPos < 10;
      
      setPrevScrollPos(currentScrollPos);
      setVisible(visible);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    if (cartItems.length > 0) {
      setCartUpdated(true);
      const timer = setTimeout(() => {
        setCartUpdated(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [cartItems.length]);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Contact", path: "/contact" },
    { label: "About", path: "/about" },
  ];

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <Slide appear={false} direction="down" in={visible}>
        <AppBar 
          position="fixed" 
          sx={{ 
            backgroundColor: "white", 
            color: "#333",
            boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
              {/* Hamburger Menu Icon */}
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ display: { xs: "flex", md: "none" } }}
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>

              {/* Logo */}
              <Typography 
                variant="h6" 
                component={Link} 
                to="/"
                sx={{ 
                  textDecoration: "none", 
                  color: "#333",
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box 
                  component="span"
                  sx={{ 
                    color: 'primary.main',
                    mr: 1,
                    fontWeight: 800,
                    fontSize: '1.5rem'
                  }}
                >
                  Shop
                </Box>
                Kart
              </Typography>

              {/* Desktop Navigation */}
              <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
                {navLinks.map((link) => (
                  <Button
                    key={link.label}
                    component={Link}
                    to={link.path}
                    sx={{ 
                      mx: 1, 
                      textTransform: "none",
                      color: location.pathname === link.path ? "#f50057" : "#333",
                      fontWeight: location.pathname === link.path ? 600 : 400,
                      position: 'relative',
                      '&::after': location.pathname === link.path ? {
                        content: '""',
                        position: 'absolute',
                        bottom: '5px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '20px',
                        height: '2px',
                        backgroundColor: '#f50057',
                        borderRadius: '2px'
                      } : {}
                    }}
                  >
                    {link.label}
                  </Button>
                ))}
              </Box>

              {/* Search and Icons */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Tooltip title="Search" TransitionComponent={Zoom} arrow>
                  <IconButton 
                    color="inherit" 
                    onClick={handleSearchDialogOpen}
                    component={Link}
                    to="/search"
                    sx={{ 
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: '#f50057',
                        transform: 'scale(1.1)'
                      }
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </Tooltip>
                
                <Tooltip title={`Cart (${totalItems} items)`} TransitionComponent={Zoom} arrow>
                  <IconButton 
                    color="inherit" 
                    component={Link} 
                    to="/cart"
                    sx={{ 
                      ml: 1,
                      transition: 'all 0.3s ease',
                      animation: cartUpdated ? 'bounce 0.5s ease' : 'none',
                      '&:hover': {
                        color: '#f50057',
                        transform: 'scale(1.1)'
                      },
                      '@keyframes bounce': {
                        '0%, 100%': { transform: 'scale(1)' },
                        '50%': { transform: 'scale(1.2)' }
                      }
                    }}
                  >
                    <Badge 
                      badgeContent={totalItems} 
                      color="error"
                      sx={{
                        '& .MuiBadge-badge': {
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          minWidth: '20px',
                          height: '20px',
                          padding: '0 6px',
                          animation: totalItems > 0 ? 'pulse 1.5s infinite' : 'none',
                          '@keyframes pulse': {
                            '0%': { boxShadow: '0 0 0 0 rgba(244, 67, 54, 0.7)' },
                            '70%': { boxShadow: '0 0 0 6px rgba(244, 67, 54, 0)' },
                            '100%': { boxShadow: '0 0 0 0 rgba(244, 67, 54, 0)' }
                          }
                        }
                      }}
                    >
                      {totalItems > 0 ? <ShoppingBagOutlinedIcon /> : <ShoppingCartIcon />}
                    </Badge>
                  </IconButton>
                </Tooltip>
                
                {isAuthenticated ? (
                  <Box sx={{ ml: 1 }}>
                    <UserOptions user={user} />
                  </Box>
                ) : (
                  <Button 
                    component={Link} 
                    to="/login"
                    sx={{ 
                      ml: 1,
                      textTransform: 'none',
                      bgcolor: '#f50057',
                      color: 'white',
                      px: 2,
                      '&:hover': {
                        bgcolor: '#c51162'
                      }
                    }}
                  >
                    Login
                  </Button>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Slide>
      
      {/* Drawer for Mobile */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 280 }}
          role="presentation"
        >
          <Box sx={{ 
            p: 2, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            borderBottom: '1px solid #eee'
          }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              <Box 
                component="span"
                sx={{ 
                  color: 'primary.main',
                  mr: 1,
                  fontWeight: 800
                }}
              >
                Shop
              </Box>
              Kart
            </Typography>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          
          <List>
            {navLinks.map((link) => (
              <ListItem 
                button 
                component={Link} 
                to={link.path} 
                key={link.label}
                onClick={toggleDrawer(false)}
                sx={{ 
                  borderLeft: location.pathname === link.path ? '4px solid #f50057' : '4px solid transparent',
                  bgcolor: location.pathname === link.path ? 'rgba(245, 0, 87, 0.08)' : 'transparent'
                }}
              >
                <ListItemText 
                  primary={link.label} 
                  primaryTypographyProps={{ 
                    fontWeight: location.pathname === link.path ? 600 : 400,
                    color: location.pathname === link.path ? '#f50057' : '#333'
                  }}
                />
              </ListItem>
            ))}
          </List>
          
          {isAuthenticated ? (
            <Box sx={{ p: 2, borderTop: '1px solid #eee' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  src={user.avatar?.url} 
                  alt={user.name}
                  sx={{ mr: 2 }}
                />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {user.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
              </Box>
              <Button 
                component={Link} 
                to="/account" 
                fullWidth 
                variant="outlined" 
                color="primary"
                onClick={toggleDrawer(false)}
                sx={{ mb: 1 }}
              >
                My Profile
              </Button>
              <Button 
                component={Link} 
                to="/orders" 
                fullWidth 
                variant="outlined" 
                color="primary"
                onClick={toggleDrawer(false)}
              >
                My Orders
              </Button>
            </Box>
          ) : (
            <Box sx={{ p: 2, borderTop: '1px solid #eee' }}>
              <Button 
                component={Link} 
                to="/login" 
                fullWidth 
                variant="contained" 
                color="primary"
                onClick={toggleDrawer(false)}
              >
                Login / Register
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
      
      {/* Search Dialog */}
      <Dialog 
        open={searchDialogOpen} 
        onClose={handleSearchDialogClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: '12px',
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          bgcolor: '#f5f5f5',
          py: 1.5
        }}>
          <Typography variant="h6">Search Products</Typography>
          <IconButton onClick={handleSearchDialogClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <form onSubmit={handleSearchSubmit}>
            <TextField
              autoFocus
              fullWidth
              placeholder="What are you looking for?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton 
                      size="small" 
                      onClick={() => setSearchQuery('')}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
                sx: { 
                  borderRadius: '30px',
                  py: 0.5,
                  '&.Mui-focused': {
                    boxShadow: '0 0 0 2px rgba(245, 0, 87, 0.2)'
                  }
                }
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                disabled={!searchQuery.trim()}
                sx={{ 
                  borderRadius: '30px',
                  textTransform: 'none',
                  px: 3
                }}
              >
                Search
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Toolbar offset for fixed AppBar */}
      <Toolbar />
    </>
  );
};

export default Header;
