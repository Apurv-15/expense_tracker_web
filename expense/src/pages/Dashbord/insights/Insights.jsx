import { useState } from 'react';
import { DashboardLayout } from '../../../Ui/ui-custom/DashboardLayout';
import { ExpenseChart } from '../../../Ui/ui-custom/ExpenseChart';
import { Card, CardContent, CardHeader, CardTitle } from '../../../Ui/ui/card';
import { Button } from '../../../Ui/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../../../Ui/ui/dialog';
import { Input } from '../../../Ui/ui/input';
import { Label } from '../../../Ui/ui/label';
import { DollarSign, Settings } from 'lucide-react';
import { useToast } from "../../../hooks/use-toast";

// Sample data - this would normally come from your database
const sampleData = {
  chartData: {
    daily: [
      { name: 'Mon', amount: 45 },
      { name: 'Tue', amount: 35 },
      { name: 'Wed', amount: 55 },
      { name: 'Thu', amount: 40 },
      { name: 'Fri', amount: 60 },
      { name: 'Sat', amount: 35 },
      { name: 'Sun', amount: 30 },
    ],
    weekly: [
      { name: 'Week 1', amount: 320 },
      { name: 'Week 2', amount: 280 },
      { name: 'Week 3', amount: 340 },
      { name: 'Week 4', amount: 290 },
    ],
    monthly: [
      { name: 'Jan', amount: 1200 },
      { name: 'Feb', amount: 940 },
      { name: 'Mar', amount: 1100 },
      { name: 'Apr', amount: 1300 },
      { name: 'May', amount: 900 },
      { name: 'Jun', amount: 1200 },
      { name: 'Jul', amount: 1000 },
      { name: 'Aug', amount: 1100 },
      { name: 'Sep', amount: 1400 },
      { name: 'Oct', amount: 1260 },
      { name: 'Nov', amount: 1150 },
      { name: 'Dec', amount: 1260 },
    ],
  },
  categories: [
    { name: 'Groceries', amount: 420.50, percentage: 35, color: 'bg-blue-500' },
    { name: 'Utilities', amount: 250.00, percentage: 20, color: 'bg-blue-400' },
    { name: 'Dining', amount: 350.75, percentage: 28, color: 'bg-blue-600' },
    { name: 'Entertainment', amount: 180.50, percentage: 15, color: 'bg-blue-300' },
    { name: 'Other', amount: 58.00, percentage: 2, color: 'bg-blue-700' },
  ],
};

export default function Insights() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('monthly');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [monthlyBudget, setMonthlyBudget] = useState(2500);
  const [newBudget, setNewBudget] = useState('2500');
  const { toast } = useToast();
  
  // Get the display data based on the selected timeframe
  const getTimeframeData = () => {
    switch (selectedTimeframe) {
      case 'daily':
        return {
          chartData: sampleData.chartData.daily,
          label: 'Daily'
        };
      case 'yearly':
        return {
          chartData: sampleData.chartData.monthly, // Use monthly data for yearly view
          label: 'Yearly'
        };
      default:
        return {
          chartData: sampleData.chartData.monthly,
          label: 'Monthly'
        };
    }
  };
  
  const timeframeData = getTimeframeData();

  const handleBudgetUpdate = () => {
    const parsedBudget = parseFloat(newBudget);
    if (isNaN(parsedBudget) || parsedBudget <= 0) {
      toast({
        title: "Invalid Budget",
        description: "Please enter a valid budget amount greater than zero.",
        variant: "destructive"
      });
      return;
    }

    setMonthlyBudget(parsedBudget);
    setIsDialogOpen(false);
    toast({
      title: "Budget Updated",
      description: `Monthly budget has been set to $${parsedBudget.toFixed(2)}.`,
    });
  };
  
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
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
            <ExpenseChart 
              data={{
                daily: sampleData.chartData.daily,
                weekly: sampleData.chartData.weekly,
                monthly: sampleData.chartData.monthly
              }} 
              initialTimeRange={selectedTimeframe === 'yearly' ? 'monthly' : selectedTimeframe}
              className="text-white"
            />
          </CardContent>
        </Card>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gray-800/50 border-gray-700 animate-fade-in [animation-delay:400ms]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-medium text-white">Monthly Budget</CardTitle>
              <div className="bg-blue-500/10 p-2 rounded-full">
                <DollarSign className="h-4 w-4 text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Current Budget</p>
                    <p className="text-2xl font-semibold text-white">${monthlyBudget.toFixed(2)}</p>
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
                    <p className="font-medium text-white">${sampleData.chartData.monthly.reduce((sum, item) => sum + item.amount / 12, 0).toFixed(2)}</p>
                    <p className={`text-sm ${monthlyBudget >= sampleData.chartData.monthly.reduce((sum, item) => sum + item.amount / 12, 0) ? 'text-blue-400' : 'text-red-400'}`}>
                      {monthlyBudget >= sampleData.chartData.monthly.reduce((sum, item) => sum + item.amount / 12, 0) ? 'Under Budget' : 'Over Budget'}
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
                {sampleData.categories.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <div className={`h-2 w-2 rounded-full ${category.color} mr-2`}>
                        </div>
                        <span className="text-white">{category.name}</span>
                      </div>
                      <span className="font-medium text-white">${category.amount.toFixed(2)}</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-700">
                      <div className={`h-full rounded-full ${category.color}`} style={{ width: `${category.percentage}%` }}>
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
              <Label htmlFor="budget" className="text-white">Monthly Budget ($)</Label>
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
