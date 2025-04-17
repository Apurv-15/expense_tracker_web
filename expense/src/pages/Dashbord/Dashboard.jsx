import { useState, useEffect } from "react";
import { DashboardLayout } from "../../Ui/ui-custom/DashboardLayout";
import { ExpenseCard } from "../../Ui/ui-custom/ExpenseCard";
import { BalanceCard } from "../../Ui/ui-custom/BalanceCard";
import { BudgetProgress } from "../../Ui/ui-custom/BudgetProgress";
import { ExpenseDialog } from "../../Ui/ui-custom/ExpenseDialog";
import { Button } from "../../Ui/ui/button";
import { Plus, Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../Ui/ui/card";
import { db } from "../../firebase/firebase";
import { useAuth0 } from "@auth0/auth0-react";
import {
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";
import { useSendBudgetAlertEmail } from "../../pages/EmailJs/EmailService";
import VoiceInputButton from "../../Ui/ui-custom/VoiceInputButton";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../Ui/ui/dialog";
import { Input } from "../../Ui/ui/input";
import { Label } from "../../Ui/ui/label";

export default function Dashboard() {
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);
  const [isBalanceDialogOpen, setIsBalanceDialogOpen] = useState(false);
  const [balance, setBalance] = useState(0.00);
  const [newBalance, setNewBalance] = useState("0.00");
  const [budget, setBudget] = useState(2500.0);
  const [expenses, setExpenses] = useState([]);
  const sendBudgetAlertEmail = useSendBudgetAlertEmail();

  const [expenseFormData, setExpenseFormData] = useState({
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });
  const { user } = useAuth0();
  const useremail = user?.email;

  useEffect(() => {
    if (!useremail) return;
    const fetchExpenses = async () => {
      const docRef = doc(db, "expenses", useremail);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setExpenses(data.items || []);
        if (data.balance) {
          setBalance(data.balance);
          setNewBalance(data.balance.toString());
        }
      }
    };
    fetchExpenses();
  }, [useremail]);

  const addNewExpense = async (expense) => {
    console.log('Adding new expense:', expense);
    
    if (!user?.email) {
      console.error('No user email available');
      return;
    }

    const newExpense = {
      description: expense.description,
      amount: parseFloat(expense.amount),
      category: expense.category,
      date: expense.date,
    };

    const updatedExpenses = [newExpense, ...expenses];
    const updatedBalance = balance - newExpense.amount;

    console.log('Updated expenses:', updatedExpenses);
    console.log('Updated balance:', updatedBalance.toFixed(2));

    // Get current month's expenses
    const currentMonth = new Date().getMonth();
    const monthlyExpenses = updatedExpenses.filter(exp => {
      const expDate = new Date(exp.date);
      return expDate.getMonth() === currentMonth;
    });

    console.log('Monthly expenses:', monthlyExpenses);

    // Calculate monthly expenses percentage
    const monthlyExpensesTotal = monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const monthlyPercentage = (monthlyExpensesTotal / budget) * 100;

    console.log('Monthly expenses total:', monthlyExpensesTotal.toFixed(2));
    console.log('Monthly percentage:', monthlyPercentage.toFixed(2) + '%');
    console.log('Budget:', budget.toFixed(2));

    // Send email if monthly expenses exceed 80%
    if (monthlyPercentage >= 80 && budget > 0) {
      console.log('Monthly budget threshold reached!');
      
      try {
        const result = await sendBudgetAlertEmail(budget, monthlyExpenses);
        console.log('Email send result:', result);
      } catch (error) {
        console.error('Error sending budget alert:', error);
      }
    }

    try {
      await setDoc(doc(db, "expenses", user?.email), {
        items: updatedExpenses,
        balance: updatedBalance,
      });
      console.log('Successfully updated database');

      setExpenses(updatedExpenses);
      setBalance(updatedBalance);
      setIsExpenseDialogOpen(false);
      setExpenseFormData({
        description: '',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Error updating database:', error);
    }
  };


  const deleteExpense = async (index, amount) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    const updatedBalance = balance + amount;
    await setDoc(doc(db, "expenses", useremail), { items: updatedExpenses, balance: updatedBalance });

    setExpenses(updatedExpenses);
    setBalance(updatedBalance);
  };

  const handleVoiceTranscription = (expenseData) => {
    const formattedData = {
      description: expenseData.description || '',
      amount: expenseData.amount || '',
      category: expenseData.category || '',
      date: expenseData.date || new Date().toISOString().split('T')[0]
    };
    setExpenseFormData(formattedData);
    setIsExpenseDialogOpen(true);
  };

  const handleBalanceUpdate = async () => {
    const parsedBalance = parseFloat(newBalance);
    if (isNaN(parsedBalance)) return;
    await setDoc(doc(db, "expenses", useremail), {
      items: expenses,
      balance: parsedBalance,
      budget: budget // ensure budget is preserved in DB
    });
    setBalance(parsedBalance);
    setIsBalanceDialogOpen(false);
  };

  return (
    <DashboardLayout className="min-h-screen p-6">
      <div className="flex mt-20 justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Expense Dashboard</h1>
        <div className="flex gap-3">
          <VoiceInputButton onTranscriptionComplete={handleVoiceTranscription} />
          <Button
            onClick={() => setIsExpenseDialogOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <Plus size={16} className="text-white" /> Add Expense
          </Button>
          <Button
            onClick={() => setIsBalanceDialogOpen(true)}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            Set Balance
          </Button>
        </div>
      </div>

      <Dialog open={isBalanceDialogOpen} onOpenChange={setIsBalanceDialogOpen}>
        <DialogContent className="bg-gray-800 border border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">Set Current Balance</DialogTitle>
            <DialogDescription className="text-gray-400">
              Enter your current balance to initialize or update your financial tracking.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="balance" className="text-white">Current Balance (₹)</Label>
            <Input
              id="balance"
              type="number"
              value={newBalance}
              onChange={(e) => setNewBalance(e.target.value)}
              className="bg-gray-700 text-white"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBalanceDialogOpen(false)} className="text-white">Cancel</Button>
            <Button onClick={handleBalanceUpdate} className="bg-blue-600 hover:bg-blue-700 text-white">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <BalanceCard
          balance={balance}
          className="md:col-span-2 bg-[#0E1526] border border-[#2A2A2A] shadow-lg text-white"
        />
        <ExpenseCard
          title="Total Expenses"
          amount={expenses.reduce((sum, exp) => sum + exp.amount, 0)}
          previousAmount={500}
          icon="neutral"
          tooltipText="Total expenses this month"
          className="bg-[#051031] border border-[#0d0143] text-white shadow-lg"
        />
        <ExpenseCard
          title="Daily Average"
          amount={
            expenses.length > 0
              ? (
                  expenses.reduce((sum, exp) => sum + exp.amount, 0) /
                  expenses.length
                ).toFixed(2)
              : 0
          }
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
              <CardTitle className="text-white text-base font-medium">
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {expenses.length === 0 ? (
                <p className="text-center text-blue-400">No transactions yet.</p>
              ) : (
                <div className="space-y-4">
                  {expenses.map((transaction, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-[#180936] rounded-lg border border-[#383838]"
                    >
                      <div>
                        <p className="font-medium text-white">{transaction.description}</p>
                        <p className="text-xs text-blue-400">
                          {transaction.date} • {transaction.category}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-rose-500 font-medium">
                          -₹{transaction.amount.toFixed(2)}
                        </span>
                        <button
                          onClick={() => deleteExpense(index, transaction.amount)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
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
        initialData={expenseFormData}
        className="bg-[#0E1526] border border-[#2A2A2A] shadow-lg"
      />
    </DashboardLayout>
  );
}
