import { useState } from "react";
import { DashboardLayout } from "../../Ui/ui-custom/DashboardLayout";
import { ExpenseCard } from "../../Ui/ui-custom/ExpenseCard";
import { BalanceCard } from "../../Ui/ui-custom/BalanceCard";
import { BudgetProgress } from "../../Ui/ui-custom/BudgetProgress";
import { ExpenseDialog } from "../../Ui/ui-custom/ExpenseDialog";
import { Button } from "../../Ui/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../Ui/ui/card";

export default function Dashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("monthly");
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);

  const [balance, setBalance] = useState(5840.27);
  const [budget, setBudget] = useState(2500.0);
  const [expenses, setExpenses] = useState([
    { id: 1, description: "Grocery Shopping", amount: 85.2, category: "Groceries", date: "2023-06-15" },
    { id: 2, description: "Electric Bill", amount: 120.5, category: "Utilities", date: "2023-06-14" },
    { id: 3, description: "Restaurant Dinner", amount: 65.3, category: "Dining", date: "2023-06-12" },
  ]);

  const addNewExpense = (expense) => {
    const newExpense = {
      id: expenses.length + 1,
      ...expense,
      date: new Date().toISOString().split("T")[0],
    };

    setExpenses([newExpense, ...expenses]);
    setIsExpenseDialogOpen(false);
    setBalance((prevBalance) => prevBalance - expense.amount);
  };

  return (
    <DashboardLayout className="min-h-screen p-6">
      <div className="flex mt-20 justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Expense Dashboard</h1>
        <Button 
          onClick={() => setIsExpenseDialogOpen(true)} 
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={16} className="text-white" />
          Add Expense
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <BalanceCard 
          balance={balance} 
          className="md:col-span-2 bg-[#0E1526] border border-[#2A2A2A] shadow-lg text-white"
        />

        <ExpenseCard
          title={`${selectedTimeframe.charAt(0).toUpperCase() + selectedTimeframe.slice(1)} Expenses`}
          amount={expenses.reduce((sum, exp) => sum + exp.amount, 0)}
          previousAmount={500}
          icon="neutral"
          tooltipText={`Total expenses this ${selectedTimeframe}`}
          className="bg-[#1E1E1E] border border-[#2A2A2A] text-white shadow-lg"
        />

        <ExpenseCard
          title="Daily Average"
          amount={expenses.length > 0 ? (expenses.reduce((sum, exp) => sum + exp.amount, 0) / expenses.length).toFixed(2) : 0}
          previousAmount={50}
          icon="neutral"
          tooltipText="Average daily spending"
          className="bg-[#0E1526] border border-[#2A2A2A] text-white shadow-lg"
        />
      </div>

      <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="bg-[#0E1526] border border-[#2A2A2A] shadow-lg">
            <CardHeader>
              <CardTitle className="text-white text-base font-medium">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              {expenses.length === 0 ? (
                <p className="text-center text-blue-400">No transactions yet.</p>
              ) : (
                <div className="space-y-4">
                  {expenses.map((transaction) => (
                    <div 
                      key={transaction.id} 
                      className="flex justify-between items-center p-3 bg-[#2A2A2A] rounded-lg border border-[#383838]"
                    >
                      <div>
                        <p className="font-medium text-white">{transaction.description}</p>
                        <p className="text-xs text-blue-400">
                          {transaction.date} • {transaction.category}
                        </p>
                      </div>
                      <span className="text-rose-500 font-medium">-${transaction.amount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <BudgetProgress 
            spent={expenses.reduce((sum, exp) => sum + exp.amount, 0)} 
            budget={budget} 
            className="bg-[#0E1526] border border-[#2A2A2A] shadow-lg text-white"
          />
        </div>
      </div>

      <ExpenseDialog 
        open={isExpenseDialogOpen} 
        onOpenChange={setIsExpenseDialogOpen}
        onSubmit={addNewExpense}
        categories={["Groceries", "Utilities", "Dining", "Entertainment", "Other"]}
        className="bg-[#0E1526] border border-[#2A2A2A] shadow-lg"
      />
    </DashboardLayout>
  );
}
