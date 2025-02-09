import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Chip,
} from '@mui/material';
import { useTaskContext } from '../context/TaskContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks } = useTaskContext();
  const task = tasks.find(t => t._id === id);

  if (!task) {
    return (
      <Container maxWidth="md" className="py-8">
        <Typography>Attività non trovata</Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/dashboard')}
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
          onClick={() => navigate('/dashboard')}
          className="mb-4"
        >
          Torna alla Dashboard
        </Button>
        
        <Typography variant="h4" className="mb-4">
          {task.title}
        </Typography>

        <Box className="space-y-4">
          <Box>
            <Typography variant="subtitle1" color="textSecondary">
              Stato
            </Typography>
            <Chip
              label={task.completed ? 'Completata' : 'Attiva'}
              color={task.completed ? 'success' : 'primary'}
            />
          </Box>

          {task.description && (
            <Box>
              <Typography variant="subtitle1" color="textSecondary">
                Descrizione
              </Typography>
              <Typography>{task.description}</Typography>
            </Box>
          )}

          <Box>
            <Typography variant="subtitle1" color="textSecondary">
              Priorità
            </Typography>
            <Chip
              label={task.priority}
              color={
                task.priority === 'alta'
                  ? 'error'
                  : task.priority === 'media'
                  ? 'warning'
                  : 'default'
              }
            />
          </Box>

          {task.dueDate && (
            <Box>
              <Typography variant="subtitle1" color="textSecondary">
                Scadenza
              </Typography>
              <Typography>
                {new Date(task.dueDate).toLocaleDateString()}
              </Typography>
            </Box>
          )}

          {task.tags && task.tags.length > 0 && (
            <Box>
              <Typography variant="subtitle1" color="textSecondary">
                Tag
              </Typography>
              <Box className="flex gap-2 flex-wrap">
                {task.tags.map(tag => (
                  <Chip key={tag} label={tag} size="small" />
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default TaskDetails; 