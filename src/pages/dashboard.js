import React, { useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useRouter } from 'next/router';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import Filters from '../components/Filters';
import { TaskProvider } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const DashboardPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <Container>
        <Typography>Caricamento...</Typography>
      </Container>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <TaskProvider>
        <Container maxWidth="md" className="flex-grow py-8">
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
    </div>
  );
};

export default DashboardPage; 