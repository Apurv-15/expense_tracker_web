
import { ThemeToggle } from './ThemeToggle';
import { cn } from '../../lib/utils';
import { Calendar } from 'lucide-react';
import React from "react";


interface DashboardHeaderProps {
  className?: string;
}

export function DashboardHeader({ className }: DashboardHeaderProps) {
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);
  
  return (
    <header className={cn(
      "flex items-center justify-between py-6 animate-fade-in",
      className
    )}>
      <div className="flex-1">
        <h1 className="text-2xl font-semibold tracking-tight">Expense Dashboard</h1>
        <div className="flex items-center mt-1 text-sm text-muted-foreground">
          <Calendar className="mr-1 h-3.5 w-3.5" />
          <span>{formattedDate}</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Placeholder for user components */}
        <div className="flex items-center">
          {/* @USER: Insert notification component here */}
        </div>
        
        <ThemeToggle />
      </div>
    </header>
  );
}
