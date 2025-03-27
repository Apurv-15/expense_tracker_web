import React from "react";
import { cn } from "../../lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AnimatedNumber } from "./AnimatedNumber";
import { AlertCircle } from "lucide-react";

export function BudgetProgress({ spent, budget, className = "" }) {
  const remaining = budget - spent;
  const percentSpent = (spent / budget) * 100;
  const isOverBudget = spent > budget;

  // Determine color based on percentage spent
  const getProgressColor = () => {
    if (percentSpent >= 100) return "bg-destructive";
    if (percentSpent >= 75) return "bg-amber-500";
    return "bg-emerald-500";
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center justify-between">
          <span>Monthly Budget</span>
          {isOverBudget && <AlertCircle className="h-4 w-4 text-destructive animate-pulse" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-sm text-muted-foreground">Spent</p>
              <p className="text-2xl font-semibold">
                <AnimatedNumber value={spent} prefix="₹" duration={1500} decimals={2} />
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Budget</p>
              <p className="text-lg font-medium">₹{budget.toFixed(2)}</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-3 rounded-full bg-secondary overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all duration-1000", getProgressColor())}
              style={{ width: `${Math.min(percentSpent, 100)}%` }}
            ></div>
          </div>

          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Remaining</p>
              <p className={cn("font-medium", isOverBudget ? "text-destructive" : "text-emerald-500")}>
                {isOverBudget ? "-" : ""}₹
                <AnimatedNumber value={Math.abs(remaining)} duration={1500} decimals={2} />
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Progress</p>
              <p className="font-medium">
                <AnimatedNumber value={Math.min(percentSpent, 100)} duration={1500} decimals={0} suffix="%" />
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
