import React from 'react';
import { Container, Typography, Grid, Paper, Box, Divider, Avatar, Card, CardContent, CardMedia } from '@mui/material';
import MetaData from '../Layouts/MetaData';
import './About.css';

// Team member data
const teamMembers = [
  {
    name: 'John Doe',
    position: 'Founder & CEO',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    bio: 'John has over 15 years of experience in retail and e-commerce. He founded ShopKart with a vision to make quality products accessible to everyone.'
  },
  {
    name: 'Jane Smith',
    position: 'Chief Technology Officer',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    bio: 'Jane leads our technology team with her expertise in building scalable e-commerce platforms and implementing innovative solutions.'
  },
  {
    name: 'Michael Johnson',
    position: 'Head of Operations',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    bio: 'Michael ensures that all our operations run smoothly, from inventory management to order fulfillment and customer satisfaction.'
  },
  {
    name: 'Sarah Williams',
    position: 'Marketing Director',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    bio: 'Sarah brings creative marketing strategies that have helped ShopKart grow its customer base and establish a strong brand presence.'
  }
];

// Company milestones
const milestones = [
  {
    year: '2015',
    title: 'Foundation',
    description: 'ShopKart was founded with a mission to revolutionize online shopping in India.'
  },
  {
    year: '2017',
    title: 'Expansion',
    description: 'Expanded our product range to include electronics, fashion, and home essentials.'
  },
  {
    year: '2019',
    title: 'One Million Customers',
    description: 'Reached the milestone of serving one million satisfied customers across the country.'
  },
  {
    year: '2021',
    title: 'Mobile App Launch',
    description: 'Launched our mobile application to provide a seamless shopping experience on the go.'
  },
  {
    year: '2023',
    title: 'International Shipping',
    description: 'Started international shipping to make our products available worldwide.'
  }
];

const About = () => {
  return (
    <>
      <MetaData title="About Us - ShopKart" />
      
      {/* Hero Section */}
      <Box 
        className="about-hero"
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
            background: 'linear-gradient(135deg, rgba(74, 20, 140, 0.8) 0%, rgba(245, 0, 87, 0.8) 100%)',
            zIndex: 1
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ textAlign: 'center', py: { xs: 6, md: 10 } }}>
            <Typography 
              variant="h2" 
              component="h1"
              className="about-title-animated"
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
              Our Story
            </Typography>
            <Typography 
              variant="body1"
              className="about-subtitle-animated"
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
              Discover the journey of ShopKart, from a small startup to one of India's leading e-commerce platforms.
            </Typography>
          </Box>
        </Container>
      </Box>
      
      {/* About Us Content */}
      <Container maxWidth="lg" className="about-container">
        {/* Our Mission */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#333', position: 'relative', pb: 2, mb: 3 }}>
                Our Mission
                <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '60px', height: '4px', backgroundColor: '#f50057', borderRadius: '2px' }}></Box>
              </Typography>
              <Typography variant="body1" paragraph sx={{ color: '#666', lineHeight: 1.8 }}>
                At ShopKart, our mission is to provide customers with a seamless and enjoyable shopping experience. We believe in offering high-quality products at competitive prices, backed by exceptional customer service.
              </Typography>
              <Typography variant="body1" paragraph sx={{ color: '#666', lineHeight: 1.8 }}>
                We strive to be the most customer-centric e-commerce platform, where customers can find anything they might want to buy online at the best possible prices. Our commitment to innovation and continuous improvement drives us to constantly enhance our services and offerings.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ overflow: 'hidden', borderRadius: '12px', height: '100%' }}>
              <Box 
                component="img" 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Our Mission"
                sx={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
              />
            </Paper>
          </Grid>
        </Grid>
        
        {/* Our Values */}
        <Grid container spacing={4} sx={{ mb: 8, flexDirection: { xs: 'column-reverse', md: 'row' } }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ overflow: 'hidden', borderRadius: '12px', height: '100%' }}>
              <Box 
                component="img" 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Our Values"
                sx={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#333', position: 'relative', pb: 2, mb: 3 }}>
                Our Values
                <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '60px', height: '4px', backgroundColor: '#f50057', borderRadius: '2px' }}></Box>
              </Typography>
              <Typography variant="body1" paragraph sx={{ color: '#666', lineHeight: 1.8 }}>
                Our core values guide everything we do at ShopKart. We believe in integrity, transparency, and accountability in all our business practices. Customer satisfaction is at the heart of our operations, and we go the extra mile to ensure a positive shopping experience.
              </Typography>
              <Typography variant="body1" paragraph sx={{ color: '#666', lineHeight: 1.8 }}>
                We also value innovation and continuous learning, constantly seeking new ways to improve our platform and services. Sustainability is another key value, as we work towards reducing our environmental footprint and promoting responsible consumption.
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        {/* Company Milestones */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600, color: '#333', position: 'relative', pb: 2, mb: 5, display: 'inline-block', mx: 'auto', width: 'auto' }}>
            Our Journey
            <Box sx={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '60px', height: '4px', backgroundColor: '#f50057', borderRadius: '2px' }}></Box>
          </Typography>
          
          <Box className="timeline">
            {milestones.map((milestone, index) => (
              <Box key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                <Box className="timeline-content">
                  <Typography variant="h6" className="year">{milestone.year}</Typography>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#333' }}>{milestone.title}</Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>{milestone.description}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        
        {/* Our Team */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600, color: '#333', position: 'relative', pb: 2, mb: 5, display: 'inline-block', mx: 'auto', width: 'auto' }}>
            Meet Our Team
            <Box sx={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '60px', height: '4px', backgroundColor: '#f50057', borderRadius: '2px' }}></Box>
          </Typography>
          
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card className="team-card" sx={{ height: '100%', borderRadius: '12px', overflow: 'hidden', transition: 'all 0.3s ease' }}>
                  <CardMedia
                    component="img"
                    height="240"
                    image={member.image}
                    alt={member.name}
                  />
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#333' }}>
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ color: '#f50057', mb: 2 }}>
                      {member.position}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      {member.bio}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        
        {/* Why Choose Us */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600, color: '#333', position: 'relative', pb: 2, mb: 5, display: 'inline-block', mx: 'auto', width: 'auto' }}>
            Why Choose ShopKart
            <Box sx={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '60px', height: '4px', backgroundColor: '#f50057', borderRadius: '2px' }}></Box>
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} className="feature-card" sx={{ p: 3, height: '100%', borderRadius: '12px' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#333', mb: 2 }}>
                  Quality Products
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  We carefully curate our product selection to ensure that we offer only high-quality items that meet our standards for durability, functionality, and value.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} className="feature-card" sx={{ p: 3, height: '100%', borderRadius: '12px' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#333', mb: 2 }}>
                  Competitive Pricing
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Our direct relationships with manufacturers and efficient operations allow us to offer competitive prices without compromising on quality.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} className="feature-card" sx={{ p: 3, height: '100%', borderRadius: '12px' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#333', mb: 2 }}>
                  Fast Delivery
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  We have optimized our logistics network to ensure quick and reliable delivery of your orders, with real-time tracking available for all shipments.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} className="feature-card" sx={{ p: 3, height: '100%', borderRadius: '12px' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#333', mb: 2 }}>
                  Secure Payments
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Our payment system is equipped with the latest security measures to protect your financial information and provide a safe shopping experience.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} className="feature-card" sx={{ p: 3, height: '100%', borderRadius: '12px' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#333', mb: 2 }}>
                  24/7 Customer Support
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Our dedicated customer service team is available around the clock to assist you with any questions or concerns you may have.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} className="feature-card" sx={{ p: 3, height: '100%', borderRadius: '12px' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#333', mb: 2 }}>
                  Easy Returns
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  We offer a hassle-free return policy, making it easy for you to return or exchange products if they don't meet your expectations.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default About; 