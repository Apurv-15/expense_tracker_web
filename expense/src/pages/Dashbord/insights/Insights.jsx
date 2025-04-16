import { useState, useEffect } from 'react';
import { DashboardLayout } from '../../../Ui/ui-custom/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../../Ui/ui/card';
import { Button } from '../../../Ui/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../../../Ui/ui/dialog';
import { Input } from '../../../Ui/ui/input';
import { Label } from '../../../Ui/ui/label';
import { IndianRupee, Settings } from 'lucide-react';
import { useToast } from "../../../hooks/use-toast";
import { db } from '../../../firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth0 } from "@auth0/auth0-react";
import ExpenseBarChart from './ExpenseBarChart';

export default function Insights() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('monthly');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [monthlyBudget, setMonthlyBudget] = useState(2500);
  const [newBudget, setNewBudget] = useState('2500');
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processedData, setProcessedData] = useState({
    chartData: {
      daily: [],
      monthly: [],
      yearly: []
    },
    categories: []
  });

  const { toast } = useToast();
  const { user } = useAuth0();
  const useremail = user?.email;

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        if (!useremail) {
          throw new Error('User not authenticated');
        }

        const docRef = doc(db, "expenses", useremail);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          
          // If data is stored as an array of items
          if (data.items && Array.isArray(data.items)) {
            setExpenses(data.items);
          } else {
            // If data is stored in a different structure
            const items = data.items || [];
            setExpenses(items);
          }
          
          // Set budget if available
          if (data.budget) {
            setMonthlyBudget(data.budget);
          }
          setLoading(false);
        } else {
          // Initialize with empty array if no data exists
          setExpenses([]);
          setLoading(false);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
        toast({
          title: "Error fetching expenses",
          description: err.message,
          variant: "destructive"
        });
      }
    };

    fetchExpenses();
  }, [useremail]);

  useEffect(() => {
    const processData = () => {
      if (!expenses || expenses.length === 0) {
        return {
          chartData: {
            daily: [],
            monthly: [],
            yearly: []
          },
          categories: []
        };
      }

      // Group expenses by category
      const categoryTotals = expenses.reduce((acc, expense) => {
        const category = expense.category || 'Uncategorized';
        acc[category] = (acc[category] || 0) + (expense.amount || 0);
        return acc;
      }, {});

      // Calculate percentages
      const total = expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);
      const categories = Object.entries(categoryTotals).map(([category, amount]) => ({
        name: category,
        amount,
        percentage: total > 0 ? ((amount / total) * 100).toFixed(1) : 0
      })).sort((a, b) => b.amount - a.amount);

      // Prepare time-based data
      const chartData = {
        daily: [],
        monthly: [],
        yearly: []
      };

      // Group expenses by timeframe
      expenses.forEach(expense => {
        if (!expense.date) return;
        
        const date = new Date(expense.date);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        // Daily data
        const dailyKey = `${year}-${month + 1}-${day}`;
        const dailyIndex = chartData.daily.findIndex(d => d.name === dailyKey);
        if (dailyIndex !== -1) {
          chartData.daily[dailyIndex].amount += expense.amount;
        } else {
          chartData.daily.push({
            name: dailyKey,
            amount: expense.amount
          });
        }

        // Monthly data
        const monthlyKey = `${year}-${month + 1}`;
        const monthlyIndex = chartData.monthly.findIndex(d => d.name === monthlyKey);
        if (monthlyIndex !== -1) {
          chartData.monthly[monthlyIndex].amount += expense.amount;
        } else {
          chartData.monthly.push({
            name: monthlyKey,
            amount: expense.amount
          });
        }

        // Yearly data
        const yearlyIndex = chartData.yearly.findIndex(d => d.name === year.toString());
        if (yearlyIndex !== -1) {
          chartData.yearly[yearlyIndex].amount += expense.amount;
        } else {
          chartData.yearly.push({
            name: year.toString(),
            amount: expense.amount
          });
        }
      });

      // Sort data by date
      chartData.daily.sort((a, b) => new Date(a.name) - new Date(b.name));
      chartData.monthly.sort((a, b) => new Date(a.name) - new Date(b.name));
      chartData.yearly.sort((a, b) => new Date(a.name) - new Date(b.name));

      return {
        chartData,
        categories
      };
    };

    const processed = processData();
    setProcessedData(processed);
    console.log('Processed Expenses:', processed);
  }, [expenses]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(value);
  };

  const handleBudgetUpdate = async () => {
    try {
      const parsedBudget = parseFloat(newBudget);
      if (isNaN(parsedBudget) || parsedBudget <= 0) {
        throw new Error('Please enter a valid budget amount');
      }

      const docRef = doc(db, "expenses", useremail);
      await setDoc(docRef, {
        items: expenses,
        budget: parsedBudget
      });

      setMonthlyBudget(parsedBudget);
      setIsDialogOpen(false);
      toast({
        title: "Budget Updated",
        description: `Monthly budget set to ₹${parsedBudget.toFixed(2)}`,
      });
    } catch (error) {
      toast({
        title: "Error Updating Budget",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mt-15 flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Expense Analytics</h1>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 text-white"
          onClick={() => setIsDialogOpen(true)}
        >
          <Settings size={16} className="text-blue-400" />
          Set Monthly Budget
        </Button>
      </div>
      
      <div className="grid gap-6">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium text-white">Spending Overview</CardTitle>
            <div className="flex space-x-2">
              <Button 
                variant={selectedTimeframe === 'daily' ? 'default' : 'outline'} 
                size="sm"
                className="text-white"
                onClick={() => setSelectedTimeframe('daily')}
              >
                Daily
              </Button>
              <Button 
                variant={selectedTimeframe === 'monthly' ? 'default' : 'outline'} 
                size="sm"
                className="text-white"
                onClick={() => setSelectedTimeframe('monthly')}
              >
                Monthly
              </Button>
              <Button 
                variant={selectedTimeframe === 'yearly' ? 'default' : 'outline'} 
                size="sm"
                className="text-white"
                onClick={() => setSelectedTimeframe('yearly')}
              >
                Yearly
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative h-96">
              <div className="absolute inset-0 bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-lg shadow-lg">
                <ExpenseBarChart 
                  data={processedData.chartData[selectedTimeframe] || []}
                  formatCurrency={formatCurrency}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gray-800/50 border-gray-700 animate-fade-in [animation-delay:400ms]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-medium text-white">Monthly Budget</CardTitle>
              <div className="bg-blue-500/10 p-2 rounded-full">
                <IndianRupee className="h-4 w-4 text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Current Budget</p>
                    <p className="text-2xl font-semibold text-white">₹{monthlyBudget.toFixed(2)}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-white"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    Update
                  </Button>
                </div>
                
                <div>
                  <p className="text-sm text-gray-400 mb-1">Total Monthly Expenses</p>
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-white">₹{processedData.chartData.monthly.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}</p>
                    <p className={`text-sm ${monthlyBudget >= processedData.chartData.monthly.reduce((sum, item) => sum + item.amount, 0) ? 'text-blue-400' : 'text-red-400'}`}>
                      {monthlyBudget >= processedData.chartData.monthly.reduce((sum, item) => sum + item.amount, 0) ? 'Under Budget' : 'Over Budget'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        
          <Card className="bg-gray-800/50 border-gray-700 animate-fade-in [animation-delay:400ms]">
            <CardHeader>
              <CardTitle className="text-base font-medium text-white">Spending by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {processedData.categories.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <div className={`h-2 w-2 rounded-full bg-blue-500 mr-2`}>
                        </div>
                        <span className="text-white">{category.name}</span>
                      </div>
                      <span className="font-medium text-white">₹{category.amount.toFixed(2)}</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-700">
                      <div className="h-full rounded-full bg-blue-500" style={{ width: `${category.percentage}%` }}>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Budget Setting Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-800/50 backdrop-blur-md border-gray-700/50 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-lg text-white">Set Monthly Budget</DialogTitle>
            <DialogDescription className="text-gray-400">
              Enter your monthly expense budget. This will help you track your spending against your budget.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="budget" className="text-white">Monthly Budget (₹)</Label>
              <Input
                id="budget"
                placeholder="0.00"
                type="number"
                step="0.01"
                min="0"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                className="bg-gray-700 text-white"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" className="text-white" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={handleBudgetUpdate}>Save Budget</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
