import React from 'react';
import { IndianRupee } from 'lucide-react';
import StatCard from './StateCard';

const DashboardStats = ({ 
  expenses, 
  getTotalExpenses, 
  getThisMonthExpenses,
  getExpenseTrend 
}) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const trend = getExpenseTrend();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger-header">
      <StatCard
        title="Total Balance"
        value={formatCurrency(getTotalExpenses())}
        subtext="Updated just now"
        icon={IndianRupee}
        iconColor="text-blue-600 dark:text-blue-400"
        iconBgColor="bg-blue-100 dark:bg-blue-900/30"
      />
      
      <StatCard
        title="Monthly Expenses"
        value={formatCurrency(getThisMonthExpenses())}
        icon={IndianRupee}  // ✅ Changed from Calendar to IndianRupee
        iconColor="text-purple-600 dark:text-purple-400"
        iconBgColor="bg-purple-100 dark:bg-purple-900/30"
        trend={trend}
      />
      
      <StatCard
        title="Expense Count"
        value={expenses.length}
        subtext="Total transactions"
        icon={IndianRupee}  // ✅ Changed from TrendingUp to IndianRupee
        iconColor="text-green-600 dark:text-green-400"
        iconBgColor="bg-green-100 dark:bg-green-900/30"
      />
    </div>
  );
};

export default DashboardStats;
