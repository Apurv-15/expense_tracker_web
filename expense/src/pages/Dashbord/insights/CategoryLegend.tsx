import React from 'react';

interface CategoryLegendProps {
  categories: { name: string; value: number }[];
  colors: string[];
}

const CategoryLegend: React.FC<CategoryLegendProps> = ({ categories, colors }) => {
  return (
    <div className="mt-6 grid grid-cols-2 gap-2">
      {categories.map((category, index) => (
        <div key={index} className="flex items-center">
          <div
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: colors[index % colors.length] }}
          ></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">{category.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryLegend;
