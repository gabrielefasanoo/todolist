import React from 'react';
import { Paper, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { useTaskContext } from '../context/TaskContext';

const Filters = () => {
  const { currentFilter, setFilter } = useTaskContext();

  return (
    <Paper className="p-2">
      <ToggleButtonGroup
        value={currentFilter}
        exclusive
        onChange={(e, newFilter) => newFilter && setFilter(newFilter)}
        fullWidth
      >
        <ToggleButton value="all">
          Tutte
        </ToggleButton>
        <ToggleButton value="active">
          Attive
        </ToggleButton>
        <ToggleButton value="completed">
          Completate
        </ToggleButton>
      </ToggleButtonGroup>
    </Paper>
  );
};

export default Filters; 