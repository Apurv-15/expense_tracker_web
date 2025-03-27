import React from "react";
import { cn } from "../../lib/utils";
import { AnimatedNumber } from "./AnimatedNumber";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TrendingUp, TrendingDown, CreditCard } from "lucide-react";

export function ExpenseCard({
  title,
  amount,
  previousAmount,
  icon = "card",
  customIcon,
  className = "",
  tooltipText = "",
}) {
  const percentChange = previousAmount
    ? ((amount - previousAmount) / previousAmount) * 100
    : 0;

  const isIncrease = percentChange > 0;

  const getIconComponent = () => {
    switch (icon) {
      case "up":
        return <TrendingUp className="h-5 w-5 text-emerald-500" />;
      case "down":
        return <TrendingDown className="h-5 w-5 text-rose-500" />;
      case "card":
        return <CreditCard className="h-5 w-5 text-primary" />;
      case "custom":
        return customIcon;
      default:
        return null;
    }
  };

  return (
    <Card className={cn("overflow-hidden glass-card animate-fade-in", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-5">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="rounded-full p-1">{getIconComponent()}</div>
      </CardHeader>
      <CardContent className="px-5 pb-4">
        <div className="text-2xl font-semibold">
          <AnimatedNumber value={amount} prefix="$" duration={1500} decimals={2} />
        </div>

        {previousAmount !== undefined && (
          <p className={cn("text-xs mt-1", isIncrease ? "text-emerald-500" : "text-rose-500")}>
            {isIncrease ? "+" : ""}
            {percentChange.toFixed(1)}% from previous
          </p>
        )}

        {tooltipText && <p className="text-xs text-muted-foreground mt-2">{tooltipText}</p>}
      </CardContent>
    </Card>
  );
}
