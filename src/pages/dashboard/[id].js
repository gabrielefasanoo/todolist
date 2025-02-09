import React from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Chip,
} from '@mui/material';
import { useTaskContext } from '../../context/TaskContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function TaskDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const { tasks } = useTaskContext();
  const task = tasks.find(t => t._id === id);

  if (!task) {
    return (
      <Container maxWidth="md" className="py-8">
        <Typography>Attività non trovata</Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push('/dashboard')}
        >
          Torna alla Dashboard
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" className="py-8">
      <Paper className="p-6">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push('/dashboard')}
          className="mb-4"
        >
          Torna alla Dashboard
        </Button>
        
        <Typography variant="h4" className="mb-4">
          {task.title}
        </Typography>

        <Box className="space-y-4">
          {/* ... resto del codice invariato ... */}
        </Box>
      </Paper>
    </Container>
  );
} 