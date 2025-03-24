import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ExpenseForm from '../../Ui/ExpenseForm';
import ExpenseList from '../../Ui/ExpenseList';
import { toast } from 'sonner';
// import { DollarSign } from 'lucide-react';
import { Button } from '../../Ui/button';
import DashboardStats from './DashboardStats';
import { initPageAnimations } from '../../utils/AnimateUtils';

const Dashboard = () => {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses-guest');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  useEffect(() => {
    localStorage.setItem('expenses-guest', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    // Initialize animations after component mounts
    initPageAnimations();

    // Re-initialize animations on window resize
    const handleResize = () => {
      initPageAnimations();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleAddExpense = (expenseData) => {
    const newExpense = {
      ...expenseData,
      id: uuidv4(),
    };

    setExpenses((prev) => [newExpense, ...prev]);
    toast.success('Expense added successfully');
  };

  const handleDeleteExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    toast.success('Expense deleted successfully');
  };

  const getTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const getThisMonthExpenses = () => {
    const now = new Date();
    return expenses
      .filter((expense) => {
        const expenseDate = new Date(expense.date);
        return (
          expenseDate.getMonth() === now.getMonth() &&
          expenseDate.getFullYear() === now.getFullYear()
        );
      })
      .reduce((total, expense) => total + expense.amount, 0);
  };

  const getExpenseTrend = () => {
    const thisMonth = getThisMonthExpenses();

    // Get last month's expenses
    const lastMonth = (() => {
      const now = new Date();
      const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1);

      return expenses
        .filter((expense) => {
          const expenseDate = new Date(expense.date);
          return (
            expenseDate.getMonth() === lastMonthDate.getMonth() &&
            expenseDate.getFullYear() === lastMonthDate.getFullYear()
          );
        })
        .reduce((total, expense) => total + expense.amount, 0);
    })();

    if (lastMonth === 0) return { percentage: 0, increased: false };

    const percentage = ((thisMonth - lastMonth) / lastMonth) * 100;
    return {
      percentage: Math.abs(Math.round(percentage)),
      increased: percentage > 0
    };
  };

  return (
    <div className="min-h-screen dark:bg-gray-950">
    

      <main className="pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex justify-between items-center animate-on-scroll stagger-header">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Welcome back, User
              </p>
            </div>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
  Add Expense (₹)
</Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <DashboardStats
                expenses={expenses}
                getTotalExpenses={getTotalExpenses}
                getThisMonthExpenses={getThisMonthExpenses}
                getExpenseTrend={getExpenseTrend}
              />

              <div className="animate-on-scroll">
                <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} />
              </div>
            </div>

            <div className="animate-on-scroll">
              <ExpenseForm onSubmit={handleAddExpense} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
