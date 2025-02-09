import React from 'react';
import { Container } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <Container maxWidth="lg" className="min-h-screen py-8">
      {children}
    </Container>
  );
};

export default Layout; 