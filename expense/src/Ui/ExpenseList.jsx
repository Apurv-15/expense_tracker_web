import React from 'react';
import { Trash2 } from 'lucide-react';

const ExpenseList = ({ expenses, onDelete }) => {
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };
  
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };
  
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Food':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Travel':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Bills':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'Shopping':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  if (expenses.length === 0) {
    return (
      <div className="glass-morphism rounded-2xl p-8 text-center animate-fade-in">
        <p className="text-gray-500 dark:text-gray-400">No expenses yet. Add one to get started!</p>
      </div>
    );
  }
  
  return (
    <div className="glass-morphism rounded-2xl overflow-hidden animate-fade-in">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold">Recent Expenses</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Date</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Description</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Category</th>
              <th className="px-6 py-4 text-right text-sm font-medium text-gray-500 dark:text-gray-400">Amount</th>
              <th className="px-6 py-4 text-right text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr 
                key={expense.id} 
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{formatDate(expense.date)}</td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{expense.description}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(expense.category)}`}>
                    {expense.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-right font-medium text-gray-900 dark:text-white">
                  {formatAmount(expense.amount)}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onDelete(expense.id)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                    aria-label="Delete expense"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;
