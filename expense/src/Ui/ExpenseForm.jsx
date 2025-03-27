import React, { useState } from 'react';
import { Calendar, IndianRupee, Tag, AlignLeft } from 'lucide-react';

const ExpenseForm = ({ onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Other');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const categories = ['Food', 'Travel', 'Bills', 'Shopping', 'Other'];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || !description || !category || !date) return;

    onSubmit({
      amount: parseFloat(amount),
      description,
      category,
      date,
    });

    // Reset form
    setAmount('');
    setDescription('');
    setCategory('Other');
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="glass-morphism rounded-2xl p-6 animate-fade-in">
      <h3 className="text-xl font-semibold mb-6">Add New Expense</h3>

      <div className="space-y-5">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
              <IndianRupee className="w-4 h-4" />
            </div>
            <input
              type="number"
              id="amount"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all
                bg-transparent dark:bg-gray-800/50 dark:text-white"
              required
              step="0.01"
              min="0"
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
              <AlignLeft className="w-4 h-4" />
            </div>
            <input
              type="text"
              id="description"
              placeholder="What was this expense for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all
                bg-transparent dark:bg-gray-800/50 dark:text-white"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <div className="flex items-center">
              <Tag className="w-4 h-4 mr-1" />
              Category
            </div>
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  category === cat
                    ? 'bg-blue-500 text-white dark:bg-blue-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              Date
            </div>
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all
              bg-transparent dark:bg-gray-800/50 dark:text-white"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-lg bg-blue-500 text-white font-medium transition-all 
            hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 mt-4"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
