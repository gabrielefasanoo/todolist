import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  TextField,
  Paper,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
// ...existing imports...
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useTaskContext } from '../context/TaskContext';

const TaskItem = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedCategory, setEditedCategory] = useState(task.category);
  const [editedPriority, setEditedPriority] = useState(task.priority || 'bassa');
  const { toggleTask, deleteTask, editTask, categories } = useTaskContext();
  const router = useRouter();

  const priorityColors = {
    alta: '#f44336',    // rosso
    media: '#ff9800',   // arancione
    bassa: '#4caf50'    // verde
  };

  const handleEdit = () => {
    if (
      editedTitle.trim() !== task.title || 
      editedCategory !== task.category ||
      editedPriority !== task.priority
    ) {
      editTask(task._id, editedTitle, editedCategory, editedPriority);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(task.title);
    setEditedCategory(task.category);
    setEditedPriority(task.priority || 'bassa');
    setIsEditing(false);
  };

  return (
    <Paper className="mb-2">
      <ListItem
        secondaryAction={
          <div>
            {isEditing ? (
              <>
                <IconButton onClick={handleEdit}>
                  <SaveIcon />
                </IconButton>
                <IconButton onClick={handleCancel}>
                  <CancelIcon />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton onClick={() => setIsEditing(true)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => deleteTask(task._id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </div>
        }
      >
        <Checkbox
          checked={task.completed}
          onChange={() => toggleTask(task._id)}
          edge="start"
        />
        <div className="flex flex-col flex-grow">
          {isEditing ? (
            <>
              <TextField
                fullWidth
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                size="small"
                autoFocus
                className="mb-2"
              />
              <div className="flex gap-2">
                <Select
                  size="small"
                  value={editedCategory}
                  onChange={(e) => setEditedCategory(e.target.value)}
                  fullWidth
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
                <Select
                  size="small"
                  value={editedPriority}
                  onChange={(e) => setEditedPriority(e.target.value)}
                  style={{ minWidth: 120 }}
                >
                  <MenuItem value="alta">Alta</MenuItem>
                  <MenuItem value="media">Media</MenuItem>
                  <MenuItem value="bassa">Bassa</MenuItem>
                </Select>
              </div>
            </>
          ) : (
            <>
              <ListItemText
                primary={task.title}
                onClick={() => router.push(`/dashboard/${task._id}`)}
                className="cursor-pointer"
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                }}
              />
              <div className="flex gap-2 mt-1">
                <Chip
                  label={task.category}
                  size="small"
                  style={{
                    backgroundColor: task.completed ? '#e0e0e0' : '#2196f3',
                    color: task.completed ? '#757575' : 'white',
                  }}
                />
                <Chip
                  label={`Priorità ${task.priority || 'bassa'}`}
                  size="small"
                  style={{
                    backgroundColor: task.completed ? '#e0e0e0' : priorityColors[task.priority || 'bassa'],
                    color: 'white',
                  }}
                />
              </div>
            </>
          )}
        </div>
      </ListItem>
    </Paper>
  );
};

export default TaskItem;