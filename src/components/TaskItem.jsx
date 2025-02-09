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
  const { toggleTask, deleteTask, editTask, categories } = useTaskContext();
  const router = useRouter();

  const handleEdit = () => {
    if (editedTitle.trim() !== task.title || editedCategory !== task.category) {
      editTask(task._id, editedTitle, editedCategory);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(task.title);
    setEditedCategory(task.category);
    setIsEditing(false);
  };

  return (
    <Paper className="mb-2">
      <ListItem
        secondaryAction={
          <div className="flex gap-1">
            {isEditing ? (
              <>
                <IconButton edge="end" onClick={handleEdit}>
                  <SaveIcon />
                </IconButton>
                <IconButton edge="end" onClick={handleCancel}>
                  <CancelIcon />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton edge="end" onClick={() => setIsEditing(true)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => deleteTask(task._id)}>
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
              <Chip
                label={task.category}
                size="small"
                className="mt-1"
                style={{
                  backgroundColor: task.completed ? '#e0e0e0' : '#2196f3',
                  color: task.completed ? '#757575' : 'white',
                }}
              />
            </>
          )}
        </div>
      </ListItem>
    </Paper>
  );
};

export default TaskItem;