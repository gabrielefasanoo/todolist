import React, { useState } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box
} from '@mui/material';
import { useTaskContext } from '../context/TaskContext';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('bassa');
  const { addTask, categories } = useTaskContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && category) {
      addTask(title, category, priority);
      setTitle('');
      setCategory('');
      setPriority('bassa');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Aggiungi un nuovo task"
          size="small"
        />
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Categoria</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Categoria"
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Priorità</InputLabel>
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            label="Priorità"
          >
            <MenuItem value="alta">Alta</MenuItem>
            <MenuItem value="media">Media</MenuItem>
            <MenuItem value="bassa">Bassa</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" disabled={!title || !category}>
          Aggiungi
        </Button>
      </Box>
    </form>
  );
};

export default TaskForm;