import React, { createContext, useContext, useState } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [currentFilter, setFilter] = useState('all');
  const [categories, setCategories] = useState(['Lavoro', 'Personale', 'Shopping']);

  const addTask = (title, category) => {
    const newTask = {
      _id: Date.now().toString(),
      title,
      completed: false,
      category,
      createdAt: new Date()
    };
    setTasks([...tasks, newTask]);
  };

  const addCategory = (category) => {
    if (!categories.includes(category)) {
      setCategories([...categories, category]);
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task._id !== id));
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task._id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const editTask = (id, title, category) => {
    setTasks(tasks.map(task =>
      task._id === id ? { ...task, title, category } : task
    ));
  };

  const getFilteredTasks = () => {
    switch (currentFilter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  };

  const getTasksByCategory = (category) => {
    return tasks.filter(task => task.category === category);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: getFilteredTasks(),
        categories,
        currentFilter,
        addTask,
        addCategory,
        deleteTask,
        toggleTask,
        editTask,
        setFilter,
        getTasksByCategory
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext deve essere usato all\'interno di un TaskProvider');
  }
  return context;
};