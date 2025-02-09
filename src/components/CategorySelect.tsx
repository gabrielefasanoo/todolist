import React from 'react';
import { useTaskContext } from '../context/TaskContext';

interface CategorySelectProps {
  selectedCategory: string;
  onChange: (category: string) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ selectedCategory, onChange }) => {
  const { categories } = useTaskContext();

  return (
    <select
      value={selectedCategory}
      onChange={(e) => onChange(e.target.value)}
      className="category-select"
    >
      <option value="">Seleziona categoria</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default CategorySelect;