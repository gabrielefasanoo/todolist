import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import Filters from '../components/Filters';
import { useTaskContext } from '../context/TaskContext';

const Dashboard = () => {
  const { tasks, loading, error } = useTaskContext();

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

export default Dashboard; 