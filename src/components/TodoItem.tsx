import React from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
    return (
        <div className={`todo-item priority-${todo.priority}`}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
            />
            <span className={todo.completed ? 'completed' : ''}>
                {todo.text}
            </span>
            <span className="priority-badge">
                {todo.priority}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
    );
};

export default TodoItem;
