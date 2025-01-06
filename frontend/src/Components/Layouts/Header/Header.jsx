import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, Button, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  useEffect(() => {
    console.log("Header rendered on route:", window.location.pathname);
  }, []);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Contact", path: "/contact" },
    { label: "About", path: "/about" },
    { label: "Search", path: "/search" },
  ];

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "white", color: "#333" }}>
        <Toolbar>
          {/* Hamburger Menu Icon */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { xs: "flex", sm: "none" } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: "none", color: "#333" }}>
              <img
                src="/images/logo.png"
                alt="Logo"
                style={{ width: "150px", height: "auto" }}
              />
            </Link>
          </Typography>

          {/* Desktop Navigation and Icons */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}>
            {navLinks.slice(0, 4).map((link) => (
              <Button
                key={link.label}
                color="inherit"
                component={Link}
                to={link.path}
                sx={{ mx: 1, textTransform: "none" }}
              >
                {link.label}
              </Button>
            ))}
            <IconButton color="inherit" component={Link} to="/search">
              <SearchIcon />
            </IconButton>
            <IconButton color="inherit" component={Link} to="/cart">
              <ShoppingCartIcon />
            </IconButton>
            <IconButton color="inherit" component={Link} to="/login">
              <AccountCircleIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {navLinks.map((link) => (
              <ListItem button component={Link} to={link.path} key={link.label}>
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
          </List>
          <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
            {/* Mobile Icons */}
            <IconButton color="inherit" component={Link} to="/search">
              <SearchIcon />
            </IconButton>
            <IconButton color="inherit" component={Link} to="/cart">
              <ShoppingCartIcon />
            </IconButton>
            <IconButton color="inherit" component={Link} to="/login">
              <AccountCircleIcon />
            </IconButton>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
