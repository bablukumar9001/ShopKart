import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Paper, Box, Divider, useMediaQuery, useTheme } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MetaData from '../Layouts/MetaData';
import './Contact.css';
import { toast } from 'react-toastify';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Basic validation
    if (!name || !email || !message) {
      toast.error('Please fill all the required fields');
      setLoading(false);
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      setLoading(false);
      return;
    }
    
    // Here you would typically send the form data to your backend
    // For now, we'll just show a success message with a delay to simulate API call
    setTimeout(() => {
      toast.success('Message sent successfully! We will get back to you soon.');
      
      // Reset form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <MetaData title="Contact Us - ShopKart" />
      
      {/* Hero Section */}
      <Box 
        className="contact-hero"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(245, 0, 87, 0.8) 0%, rgba(74, 20, 140, 0.8) 100%)',
            zIndex: 1
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ textAlign: 'center', py: { xs: 6, md: 10 } }}>
            <Typography 
              variant="h2" 
              component="h1"
              className="contact-title-animated"
              sx={{ 
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                mb: 2,
                color: 'white',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '60px',
                  height: '4px',
                  backgroundColor: 'white',
                  bottom: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  borderRadius: '2px'
                }
              }}
            >
              Get In Touch
            </Typography>
            <Typography 
              variant="body1"
              className="contact-subtitle-animated"
              sx={{ 
                maxWidth: '700px',
                mx: 'auto',
                mt: 4,
                color: 'white',
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.6,
                textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
              }}
            >
              We'd love to hear from you! Send us a message and we'll respond as soon as possible.
            </Typography>
          </Box>
        </Container>
      </Box>
      
      <Container maxWidth="lg" className="contact-form-container">
        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={5}>
            <Paper elevation={3} className="contact-info-card" sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 4, color: '#f50057' }}>
                Contact Information
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 4 }}>
                <LocationOnIcon className="contact-info-icon" sx={{ fontSize: 28, mr: 2, color: '#f50057', mt: 0.5 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>Our Location</Typography>
                  <Typography variant="body1" color="text.secondary">
                    123 Shopping Avenue, Retail District<br />
                    New Delhi, 110001, India
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 4 }}>
                <EmailIcon className="contact-info-icon" sx={{ fontSize: 28, mr: 2, color: '#f50057', mt: 0.5 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>Email Us</Typography>
                  <Typography variant="body1" color="text.secondary">
                    support@shopkart.com<br />
                    info@shopkart.com
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 4 }}>
                <PhoneIcon className="contact-info-icon" sx={{ fontSize: 28, mr: 2, color: '#f50057', mt: 0.5 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>Call Us</Typography>
                  <Typography variant="body1" color="text.secondary">
                    +91 98765 43210<br />
                    +91 12345 67890
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 5 }}>
                <AccessTimeIcon className="contact-info-icon" sx={{ fontSize: 28, mr: 2, color: '#f50057', mt: 0.5 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>Business Hours</Typography>
                  <Typography variant="body1" color="text.secondary">
                    Monday - Friday: 9:00 AM - 8:00 PM<br />
                    Saturday: 10:00 AM - 6:00 PM<br />
                    Sunday: Closed
                  </Typography>
                </Box>
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h6" sx={{ mb: 2 }}>Follow Us</Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  variant="contained" 
                  sx={{ 
                    minWidth: 'auto', 
                    p: 1.2, 
                    borderRadius: '50%', 
                    bgcolor: '#3b5998',
                    '&:hover': { bgcolor: '#2d4373' }
                  }}
                >
                  <FacebookIcon />
                </Button>
                <Button 
                  variant="contained" 
                  sx={{ 
                    minWidth: 'auto', 
                    p: 1.2, 
                    borderRadius: '50%', 
                    bgcolor: '#1da1f2',
                    '&:hover': { bgcolor: '#0c85d0' }
                  }}
                >
                  <TwitterIcon />
                </Button>
                <Button 
                  variant="contained" 
                  sx={{ 
                    minWidth: 'auto', 
                    p: 1.2, 
                    borderRadius: '50%', 
                    bgcolor: '#e1306c',
                    '&:hover': { bgcolor: '#c13584' }
                  }}
                >
                  <InstagramIcon />
                </Button>
                <Button 
                  variant="contained" 
                  sx={{ 
                    minWidth: 'auto', 
                    p: 1.2, 
                    borderRadius: '50%', 
                    bgcolor: '#0077b5',
                    '&:hover': { bgcolor: '#00669c' }
                  }}
                >
                  <LinkedInIcon />
                </Button>
              </Box>
            </Paper>
          </Grid>
          
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Paper elevation={3} className="contact-form-card" sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 4, color: '#f50057' }}>
                Send Us a Message
              </Typography>
              
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Your Name"
                      variant="outlined"
                      fullWidth
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      InputProps={{
                        sx: { borderRadius: '8px' }
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Your Email"
                      variant="outlined"
                      fullWidth
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      InputProps={{
                        sx: { borderRadius: '8px' }
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      label="Subject"
                      variant="outlined"
                      fullWidth
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      InputProps={{
                        sx: { borderRadius: '8px' }
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      label="Your Message"
                      variant="outlined"
                      fullWidth
                      required
                      multiline
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      InputProps={{
                        sx: { borderRadius: '8px' }
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Button 
                      type="submit" 
                      variant="contained" 
                      color="primary" 
                      size="large"
                      endIcon={<SendIcon />}
                      disabled={loading}
                      className="contact-submit-btn"
                      sx={{ 
                        py: 1.5, 
                        px: 4,
                        borderRadius: '30px',
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 600,
                        boxShadow: '0 4px 10px rgba(245, 0, 87, 0.3)'
                      }}
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      
      {/* Map Section */}
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
          Find Us On The Map
        </Typography>
        
        <Box className="map-container" sx={{ width: '100%', height: '450px' }}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9530559786813!2d77.2272529!3d28.6129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1651825201018!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="ShopKart Location"
          ></iframe>
        </Box>
      </Container>
    </>
  );
};

export default Contact; 