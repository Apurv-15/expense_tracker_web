import { cn } from '../../lib/utils';
import { PageTransition } from './PageTransition';
import React from "react";

export function DashboardLayout({ children, className = "" }) {  // Default value added
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <main className={cn("py-6", className)}>  
          <PageTransition>
            {children}
          </PageTransition>
        </main>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Expense Dashboard • Designed with precision</p>
      </footer>
    </div>
  );
}
