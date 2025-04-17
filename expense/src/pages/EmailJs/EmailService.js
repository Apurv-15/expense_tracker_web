import { send } from "@emailjs/browser";
import { useAuth0 } from "@auth0/auth0-react";

export const useSendBudgetAlertEmail = () => {
  const { user } = useAuth0();

  const sendBudgetAlertEmail = async (budget, monthlyExpenses) => {
    try {
      const userEmail = user?.email;
      
      if (!userEmail) {
        console.error("No user email available from Auth0");
        return false;
      }

      console.log("Sending monthly budget alert email to:", userEmail);
      
      const monthlyExpensesTotal = monthlyExpenses.reduce(
        (sum, exp) => sum + exp.amount,
        0
      );
      const monthlyPercentage = (monthlyExpensesTotal / budget) * 100;
      const remaining = (budget - monthlyExpensesTotal).toFixed(2);

      console.log('Email parameters:', {
        to_email: userEmail,
        current_balance: monthlyExpensesTotal.toFixed(2),
        budget: budget.toFixed(2),
        remaining,
        monthly_percentage: monthlyPercentage.toFixed(2)
      });

      // Add error handling for EmailJS
      const result = await send(
        "service_deq9tle",
        "template_1govuh4",
        {
          to_email: userEmail,
          current_balance: monthlyExpensesTotal.toFixed(2),
          budget: budget.toFixed(2),
          remaining,
          user_name: "Expense Tracker User",
          monthly_percentage: monthlyPercentage.toFixed(2),
          monthly_expenses: monthlyExpensesTotal.toFixed(2)
        },
        "IAUIW601gsEH3obdW"
      );

      console.log('EmailJS response:', result);
      console.log('Email sent successfully');
      return true;
    } catch (error) {
      // Handle EmailJS errors specifically
      if (error instanceof Error) {
        console.error('Error sending email:', {
          message: error.message,
          stack: error.stack,
          name: error.name
        });
      } else {
        console.error('EmailJS error:', error);
      }

      // Check if it's a specific EmailJS error
      if (error.status) {
        console.error(`EmailJS error ${error.status}: ${error.text}`);
      }

      return false;
    }
  };

  return sendBudgetAlertEmail;
};