import React from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, Box } from '@mui/material';
import TaskList from '../../components/TaskList';
import TaskForm from '../../components/TaskForm';
import Filters from '../../components/Filters';
import { useTaskContext } from '../../context/TaskContext';
import { useAuth } from '../../context/AuthContext';

const DashboardPage = () => {
  const router = useRouter();
  const { tasks, loading, error } = useTaskContext();
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (loading) return <Typography>Caricamento...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="md" className="py-8">
      <Typography variant="h4" component="h1" className="mb-6">
        Le Mie Attività
      </Typography>
      <Box className="space-y-6">
        <TaskForm />
        <Filters />
        <TaskList tasks={tasks} />
      </Box>
    </Container>
  );
};

export default DashboardPage; 