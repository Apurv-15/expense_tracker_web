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
  const [isBudgetDialogOpen, setIsBudgetDialogOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(1);
  const [balance, setBalance] = useState(0.00);
  const [balanceInput, setBalanceInput] = useState(balance.toString()); // Add state for balance input
  const [newBalance, setNewBalance] = useState("0.00");
  const [budget, setBudget] = useState(0.00);
  const [budgetInput, setBudgetInput] = useState(budget.toString()); // Add state for budget input
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
      
      // Initialize with default values if document doesn't exist
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          items: [],
          balance: 0,
          budget: 0.0,
          tutorialCompleted: false,
          tutorialSkipped: false
        });
      }

      const data = docSnap.data();
      setExpenses(data.items || []);
      
      // Initialize balance and check tutorial
      if (data.balance !== undefined) {
        setBalance(Number(data.balance));
        setBalanceInput(data.balance.toString()); // Update balance input state
        // Check tutorial status after setting balance
        if (data.balance === 0 && !data.tutorialCompleted && !data.tutorialSkipped) {
          setIsTutorialOpen(true);
        }
      }
      
      // Initialize budget as number
      if (data.budget !== undefined) {
        setBudget(Number(data.budget));
        setBudgetInput(data.budget.toString()); // Update budget input state
      }
    };
    fetchExpenses();
  }, [useremail]);

  // Initialize tutorial state when balance is 0 and no tutorial has been shown
  useEffect(() => {
    if (balance === 0 && !isTutorialOpen) {
      const docRef = doc(db, "expenses", useremail);
      const docSnap = getDoc(docRef).then(snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (!data.tutorialCompleted && !data.tutorialSkipped) {
            setIsTutorialOpen(true);
          }
        }
      });
    }
  }, [balance, useremail, isTutorialOpen]);

  const addNewExpense = async (expense) => {
    // console.log('Adding new expense:', expense);
    
    if (!user?.email) {
      // console.error('No user email available');
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

    // console.log('Updated expenses:', updatedExpenses);
    // console.log('Updated balance:', updatedBalance.toFixed(2));

    // Get current month's expenses
    const currentMonth = new Date().getMonth();
    const monthlyExpenses = updatedExpenses.filter(exp => {
      const expDate = new Date(exp.date);
      return expDate.getMonth() === currentMonth;
    });

    // console.log('Monthly expenses:', monthlyExpenses);

    // Calculate monthly expenses percentage
    const monthlyExpensesTotal = monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const monthlyPercentage = (monthlyExpensesTotal / budget) * 100;

    // console.log('Monthly expenses total:', monthlyExpensesTotal.toFixed(2));
    // console.log('Monthly percentage:', monthlyPercentage.toFixed(2) + '%');
    // console.log('Budget:', budget.toFixed(2));

    // Send email if monthly expenses exceed 80%
    if (monthlyPercentage >= 80 && budget > 0) {
      // console.log('Monthly budget threshold reached!');
      
      try {
        const result = await sendBudgetAlertEmail(budget, monthlyExpenses);
        // console.log('Email send result:', result);
      } catch (error) {
        // console.error('Error sending budget alert:', error);
      }
    }

    try {
      await setDoc(doc(db, "expenses", user?.email), {
        items: updatedExpenses,
        balance: updatedBalance,
        budget: budget // ensure budget is preserved in DB
      });
      // console.log('Successfully updated database');

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
      // console.error('Error updating database:', error);
    }
  };


  const deleteExpense = async (index, amount) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    const updatedBalance = balance + amount;
    await setDoc(doc(db, "expenses", useremail), { items: updatedExpenses, balance: updatedBalance, budget: budget });

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
    if (!useremail) return;
    
    const parsedBalance = parseFloat(balanceInput);
    if (isNaN(parsedBalance)) return;
    
    await setDoc(doc(db, "expenses", useremail), {
      items: expenses,
      balance: parsedBalance,
      budget: budget // ensure budget is preserved in DB
    });
    
    setBalance(parsedBalance);
    setIsBalanceDialogOpen(false);
  };

  const handleBalanceInputChange = (e) => {
    setBalanceInput(e.target.value);
  };

  const handleBudgetUpdate = async (newBudget) => {
    if (!useremail) return;
    
    const parsedBudget = parseFloat(newBudget);
    if (isNaN(parsedBudget)) return;
    
    await setDoc(doc(db, "expenses", useremail), {
      items: expenses,
      balance: balance,
      budget: parsedBudget
    });
    
    setBudget(parsedBudget);
    setIsBudgetDialogOpen(false);
  };

  const handleBudgetInputChange = (e) => {
    setBudgetInput(e.target.value);
  };

  const handleTutorialNext = () => {
    if (tutorialStep === 1) {
      // For step 1, check if balance has been set
      if (balance > 0) {
        setTutorialStep(2);
      } else {
        alert('Please set your initial balance first!');
      }
    } else if (tutorialStep === 2) {
      // For step 2, check if budget has been set
      if (budget > 0) {
        setTutorialStep(3);
      } else {
        alert('Please set your monthly budget first!');
      }
    } else if (tutorialStep === 3) {
      // For step 3, check if expense has been added
      if (expenses.length > 0) {
        completeTutorial();
      } else {
        alert('Please add your first expense first!');
      }
    }
  };

  const handleTutorialBack = () => {
    if (tutorialStep === 2) {
      setTutorialStep(1);
    } else if (tutorialStep === 3) {
      setTutorialStep(2);
    }
  };

  const completeTutorial = async () => {
    if (!useremail) return;
    const docRef = doc(db, "expenses", useremail);
    await setDoc(docRef, {
      tutorialCompleted: true
    }, { merge: true });
    setIsTutorialOpen(false);
  };

  const skipTutorial = async () => {
    if (!useremail) return;
    const docRef = doc(db, "expenses", useremail);
    await setDoc(docRef, {
      tutorialSkipped: true
    }, { merge: true });
    setIsTutorialOpen(false);
  };

  return (
    <DashboardLayout className="min-h-screen p-6">
      {isTutorialOpen && (
        <Dialog open={isTutorialOpen} onOpenChange={setIsTutorialOpen}>
        <DialogContent className="bg-[#0E1526] border border-[#2A2A2A] shadow-lg text-white">
          <DialogHeader>
            <DialogTitle>Welcome to Expense Tracker!</DialogTitle>
            <DialogDescription>
              Let's get started with setting up your account.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            {tutorialStep === 1 && (
              <>
                <p className="text-blue-300">Step 1 of 3</p>
                <p className="text-white">First, let's set your initial balance. This will help track your expenses accurately.</p>
                <Button onClick={() => setIsBalanceDialogOpen(true)} className="w-full bg-blue-600 hover:bg-blue-700">
                  Set Initial Balance
                </Button>
              </>
            )}
            {tutorialStep === 2 && (
              <>
                <p className="text-blue-300">Step 2 of 3</p>
                <p className="text-white">Now, let's set your monthly budget. This will help you stay on track with your spending.</p>
                <Button onClick={() => setIsBudgetDialogOpen(true)} className="w-full bg-blue-600 hover:bg-blue-700">
                  Set Monthly Budget
                </Button>
              </>
            )}
            {tutorialStep === 3 && (
              <>
                <p className="text-blue-300">Step 3 of 3</p>
                <p className="text-white">Let's add your first expense. This will help you start tracking your spending.</p>
                <Button onClick={() => setIsExpenseDialogOpen(true)} className="w-full bg-blue-600 hover:bg-blue-700">
                  Add First Expense
                </Button>
              </>
            )}
          </div>
          <DialogFooter>
            <div className="flex justify-between w-full">
              {tutorialStep > 1 && (
                <Button
                  variant="outline"
                  onClick={handleTutorialBack}
                  className="w-1/3"
                >
                  Back
                </Button>
              )}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={skipTutorial}
                >
                  Skip Tutorial
                </Button>
                <Button
                  onClick={handleTutorialNext}
                  disabled={
                    (tutorialStep === 1 && balance <= 0) ||
                    (tutorialStep === 2 && budget <= 0) ||
                    (tutorialStep === 3 && expenses.length === 0)
                  }
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {tutorialStep === 3 ? 'Complete Tutorial' : 'Next'}
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      )}
      <div className="flex mt-20 justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Expense Dashboard</h1>
        <div className="flex gap-3">
        
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
          <Button
            onClick={() => setIsBudgetDialogOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Set Budget
          </Button>
        </div>
      </div>

      <Dialog open={isBalanceDialogOpen} onOpenChange={setIsBalanceDialogOpen}>
        <DialogContent className="bg-[#0E1526] border border-[#2A2A2A] shadow-lg text-white">
          <DialogHeader>
            <DialogTitle>Set Initial Balance</DialogTitle>
            <DialogDescription>
              Enter your current balance to start tracking your expenses
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="balance">Current Balance</Label>
              <Input
                id="balance"
                type="number"
                value={balanceInput}
                onChange={handleBalanceInputChange}
                className="bg-gray-700 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBalanceDialogOpen(false)} className="text-white">
              Cancel
            </Button>
            <Button
              onClick={handleBalanceUpdate}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isBudgetDialogOpen} onOpenChange={setIsBudgetDialogOpen}>
        <DialogContent className="bg-[#0E1526] border border-[#2A2A2A] shadow-lg text-white">
          <DialogHeader>
            <DialogTitle>Set Monthly Budget</DialogTitle>
            <DialogDescription>
              Enter your monthly budget amount to help track your expenses
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Monthly Budget</Label>
              <Input
                id="budget"
                type="number"
                value={budgetInput}
                onChange={handleBudgetInputChange}
                className="bg-gray-700 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBudgetDialogOpen(false)} className="text-white">
              Cancel
            </Button>
            <Button
              onClick={() => handleBudgetUpdate(budgetInput)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Save
            </Button>
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
