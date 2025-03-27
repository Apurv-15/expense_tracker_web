import React from "react";
import { cn } from "../../lib/utils";
import { Card, CardContent } from "../ui/card";
import { AnimatedNumber } from "./AnimatedNumber";
import { Wallet } from "lucide-react";

export function BalanceCard({ balance, className = "" }) {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-500 ease-out glass-card animate-scale-in",
        className
      )}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Current Balance</h2>
          <Wallet className="h-5 w-5 text-primary" />
        </div>

        <div className="flex flex-col">
          <div className="text-3xl font-bold mb-1 text-primary">
            <AnimatedNumber value={balance} prefix="$" duration={2000} decimals={2} />
          </div>
          <p className="text-sm text-muted-foreground">Updated just now</p>
        </div>

        {/* Placeholder for user-added component */}
        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="text-xs text-muted-foreground">
            {/* @USER: Insert savings goal component here */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
