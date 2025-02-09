import React from 'react';
import { List } from '@mui/material';
import TaskItem from './TaskItem';
import { useTaskContext } from '../context/TaskContext';

const TaskList = () => {
  const { tasks } = useTaskContext();

  if (!tasks || tasks.length === 0) {
    return <p className="text-center text-gray-500">Nessuna attività disponibile</p>;
  }

  return (
    <List className="space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </List>
  );
};

export default TaskList; 