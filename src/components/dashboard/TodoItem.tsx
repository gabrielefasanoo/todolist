import React from 'react';

interface TodoItemProps {
  title: string;
  completed: boolean;
}

const TodoItem = ({ title, completed }: TodoItemProps) => {
  return (
    <div className="todo-item">
      <input type="checkbox" checked={completed} />
      <span>{title}</span>
    </div>
  );
};

export default TodoItem;
