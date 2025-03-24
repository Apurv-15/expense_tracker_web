import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from '@/components/Navbar';
import { Expense } from '@/components/ExpenseList';
import TimeframeSelector from '@/components/insights/TimeframeSelector';
import ExpenseBarChart from '@/components/insights/ExpenseBarChart';
import ExpensePieChart from '@/components/insights/ExpensePieChart';
import CategoryLegend from '@/components/insights/CategoryLegend';
import { initPageAnimations } from '@/utils/animationUtils';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Insight = () => {
  const { user } = useAuth0();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [timeFrame, setTimeFrame] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');
  
  useEffect(() => {
    const savedExpenses = localStorage.getItem(`expenses-${user?.sub || 'guest'}`);
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, [user?.sub]);
  
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
  
  const getCategoryData = () => {
    const categoryMap: Record<string, number> = {};
    
    expenses.forEach((expense) => {
      if (categoryMap[expense.category]) {
        categoryMap[expense.category] += expense.amount;
      } else {
        categoryMap[expense.category] = expense.amount;
      }
    });
    
    return Object.keys(categoryMap).map((category) => ({
      name: category,
      value: categoryMap[category],
    }));
  };
  
  const getTimeFrameData = () => {
    const now = new Date();
    const data: Record<string, number> = {};
    
    if (timeFrame === 'weekly') {
      // Last 7 days
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        data[dayName] = 0;
      }
      
      expenses.forEach((expense) => {
        const expenseDate = new Date(expense.date);
        const dayDiff = Math.floor((now.getTime() - expenseDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (dayDiff <= 6) {
          const dayName = expenseDate.toLocaleDateString('en-US', { weekday: 'short' });
          data[dayName] = (data[dayName] || 0) + expense.amount;
        }
      });
    } else if (timeFrame === 'monthly') {
      // Last 6 months
      for (let i = 5; i >= 0; i--) {
        const date = new Date(now);
        date.setMonth(date.getMonth() - i);
        const monthName = date.toLocaleDateString('en-US', { month: 'short' });
        data[monthName] = 0;
      }
      
      expenses.forEach((expense) => {
        const expenseDate = new Date(expense.date);
        const monthDiff = (now.getFullYear() - expenseDate.getFullYear()) * 12 + 
                        (now.getMonth() - expenseDate.getMonth());
        
        if (monthDiff <= 5 && monthDiff >= 0) {
          const monthName = expenseDate.toLocaleDateString('en-US', { month: 'short' });
          data[monthName] = (data[monthName] || 0) + expense.amount;
        }
      });
    } else {
      // Last 6 years
      for (let i = 5; i >= 0; i--) {
        const year = now.getFullYear() - i;
        data[year.toString()] = 0;
      }
      
      expenses.forEach((expense) => {
        const expenseDate = new Date(expense.date);
        const year = expenseDate.getFullYear();
        const yearDiff = now.getFullYear() - year;
        
        if (yearDiff <= 5 && yearDiff >= 0) {
          data[year.toString()] = (data[year.toString()] || 0) + expense.amount;
        }
      });
    }
    
    return Object.keys(data).map((key) => ({
      name: key,
      amount: data[key],
    }));
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const categoryData = getCategoryData();
  const timeFrameData = getTimeFrameData();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 stagger-header">
            <h1 className="text-3xl font-bold animate-fade-in">Insights</h1>
            <p className="text-gray-600 dark:text-gray-400 animate-fade-in">Visualize your spending patterns</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-morphism rounded-2xl p-6 animate-fade-in animate-on-scroll fly-out">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Spending Over Time</h2>
                <TimeframeSelector timeFrame={timeFrame} setTimeFrame={setTimeFrame} />
              </div>
              
              <ExpenseBarChart data={timeFrameData} formatCurrency={formatCurrency} />
            </div>
            
            <div className="glass-morphism rounded-2xl p-6 animate-fade-in animate-on-scroll fly-out">
              <h2 className="text-xl font-semibold mb-6">Spending by Category</h2>
              
              <ExpensePieChart 
                data={categoryData} 
                colors={COLORS} 
                formatCurrency={formatCurrency} 
              />
              
              <CategoryLegend categories={categoryData} colors={COLORS} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Insight;