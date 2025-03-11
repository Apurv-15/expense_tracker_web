import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useState } from 'react';
import { Plus } from 'lucide-react';

const lineData = [
  { name: 'Jan', amount: 2400 },
  { name: 'Feb', amount: 1398 },
  { name: 'Mar', amount: 9800 },
  { name: 'Apr', amount: 3908 },
  { name: 'May', amount: 4800 },
  { name: 'Jun', amount: 3800 },
];

const categories = [
  { name: 'Restaurant', value: 4000, color: '#FF6B6B', icon: '🍽️' },
  { name: 'Savings', value: 6000, color: '#4ECDC4', icon: '💰' },
  { name: 'Health', value: 3000, color: '#45B7D1', icon: '⚕️' },
  { name: 'Shopping', value: 4500, color: '#96CEB4', icon: '🛍️' },
  { name: 'Groceries', value: 2500, color: '#FFEEAD', icon: '🛒' },
  { name: 'Transportation', value: 1800, color: '#D4A5A5', icon: '🚗' },
  { name: 'Bills', value: 3200, color: '#9B8EA9', icon: '📄' },
];

const ExpenseChart = () => {
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expenses, setExpenses] = useState(categories.map(cat => ({ ...cat, value: 0 })));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCategory || !amount) return;
    const newExpenses = expenses.map(exp => {
      if (exp.name === selectedCategory) {
        return { ...exp, value: exp.value + Number(amount) };
      }
      return exp;
    });
    setExpenses(newExpenses);
    setAmount('');
    setSelectedCategory('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-card p-6 rounded-lg border border-border shadow-sm h-[400px] animate-fadeIn">
        <h3 className="text-lg font-semibold mb-4">Expense Trend</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={lineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `₹${value}`} />
            <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-card p-6 rounded-lg border border-border shadow-sm animate-fadeIn">
        <h3 className="text-lg font-semibold mb-4">Add New Expense</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border rounded-lg bg-background"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Amount (₹)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full p-2 border rounded-lg bg-background"
                required
                min="0"
              />
            </div>
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            <Plus size={20} />
            Add Expense
          </button>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-lg border border-border shadow-sm h-[300px] animate-fadeIn">
          <h3 className="text-lg font-semibold mb-4">Expenses by Category</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenses}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {expenses.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${value}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card p-6 rounded-lg border border-border shadow-sm animate-fadeIn">
          <h3 className="text-lg font-semibold mb-4">Category Breakdown</h3>
          <div className="space-y-4">
            {expenses.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                  <span>{category.icon} {category.name}</span>
                </div>
                <span className="font-medium">
                  ₹{category.value.toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;
