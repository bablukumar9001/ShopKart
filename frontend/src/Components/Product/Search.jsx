import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MetaData from "../Layouts/MetaData";
import "./Search.css";
import { Container, Paper, Typography, TextField, Button, Box, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import HistoryIcon from "@mui/icons-material/History";
import ClearIcon from "@mui/icons-material/Clear";

// Popular search terms
const popularSearches = [
  "Smartphones",
  "Laptops",
  "Headphones",
  "Cameras",
  "Watches",
  "Fashion",
  "Home Decor"
];

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [recentSearches, setRecentSearches] = useState([]);

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
    
    // Extract keyword from URL if coming from search dialog
    const searchParams = new URLSearchParams(location.search);
    const keywordParam = searchParams.get("keyword");
    if (keywordParam) {
      setKeyword(keywordParam);
      handleSearch(keywordParam);
    }
  }, [location.search]);

  const handleSearch = (searchTerm = keyword) => {
    if (searchTerm.trim()) {
      // Save to recent searches
      const updatedSearches = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
      
      // Navigate to products page with the search term
      navigate(`/products/${searchTerm}`);
    } else {
      navigate("/products");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handlePopularSearch = (term) => {
    setKeyword(term);
    handleSearch(term);
  };

  const handleClearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  return (
    <>
      <MetaData title="Search Products - ShopKart" />
      <div className="search-page">
        <Container maxWidth="lg">
          <Paper elevation={3} className="search-container">
            <Typography variant="h4" component="h1" className="search-title">
              Find Your Perfect Product
            </Typography>
            
            <form onSubmit={handleSubmit} className="search-form">
              <TextField
                fullWidth
                variant="outlined"
                placeholder="What are you looking for today?"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: keyword && (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setKeyword("")} size="small">
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                  className: "search-input"
                }}
              />
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                className="search-button"
                disabled={!keyword.trim()}
              >
                Search
              </Button>
            </form>
            
            {/* Popular Searches */}
            <Box className="search-suggestions">
              <Box className="suggestion-section">
                <Typography variant="subtitle1" className="suggestion-title">
                  <TrendingUpIcon fontSize="small" /> Popular Searches
                </Typography>
                <Box className="suggestion-tags">
                  {popularSearches.map((term, index) => (
                    <Button 
                      key={index} 
                      variant="outlined" 
                      size="small" 
                      onClick={() => handlePopularSearch(term)}
                      className="suggestion-tag"
                    >
                      {term}
                    </Button>
                  ))}
                </Box>
              </Box>
              
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <Box className="suggestion-section">
                  <Box className="suggestion-header">
                    <Typography variant="subtitle1" className="suggestion-title">
                      <HistoryIcon fontSize="small" /> Recent Searches
                    </Typography>
                    <Button 
                      variant="text" 
                      size="small" 
                      onClick={handleClearRecentSearches}
                      className="clear-button"
                    >
                      Clear
                    </Button>
                  </Box>
                  <Box className="suggestion-tags">
                    {recentSearches.map((term, index) => (
                      <Button 
                        key={index} 
                        variant="outlined" 
                        size="small" 
                        onClick={() => handlePopularSearch(term)}
                        className="suggestion-tag recent"
                      >
                        {term}
                      </Button>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
            
            <Typography variant="body2" color="textSecondary" className="search-tip">
              Tip: Use specific keywords for better results. For example, "blue denim jacket" instead of just "jacket".
            </Typography>
          </Paper>
        </Container>
      </div>
    </>
  );
};

export default Search;
