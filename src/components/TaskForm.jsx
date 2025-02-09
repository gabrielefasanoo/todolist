import React, { useState } from 'react';
import { Paper, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useTaskContext } from '../context/TaskContext';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const { addTask, categories } = useTaskContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && category) {
      addTask(title, category);
      setTitle('');
      setCategory('');
    }
  };

  return (
    <Paper className="p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex gap-2">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Aggiungi una nuova attività"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            size="small"
          />
          <FormControl size="small" style={{ minWidth: 120 }}>
            <InputLabel>Categoria</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Categoria"
              required
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            disabled={!title.trim() || !category}
          >
            Aggiungi
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default TaskForm;