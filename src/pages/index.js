import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import Filters from '../components/Filters';
import { TaskProvider } from '../context/TaskContext';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <TaskProvider>
      <Container maxWidth="md" className="py-8">
        <Typography variant="h4" component="h1" className="mb-6">
          Le Mie Attività
        </Typography>
        <Box className="space-y-6">
          <TaskForm />
          <Filters />
          <TaskList />
        </Box>
      </Container>
    </TaskProvider>
  );
};

const LandingPage = () => {
  return (
    
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <Footer />
    </div>
  );
};

export default LandingPage; 