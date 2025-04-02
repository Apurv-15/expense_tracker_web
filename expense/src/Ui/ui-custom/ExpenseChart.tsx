import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { cn } from '../../lib/utils';
import React from "react";

interface ExpenseChartProps {
  data: {
    daily: Array<{ name: string; amount: number }>;
    weekly: Array<{ name: string; amount: number }>;
    monthly: Array<{ name: string; amount: number }>;
  };
  className?: string;
  initialTimeRange?: 'daily' | 'weekly' | 'monthly';
}

export function ExpenseChart({ data, className, initialTimeRange = 'monthly' }: ExpenseChartProps) {
  const [timeRange, setTimeRange] = useState(initialTimeRange);
  const [chartData, setChartData] = useState(data[initialTimeRange] || data.monthly);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setChartData(data[timeRange as keyof typeof data]);
  }, [data, timeRange]);

  useEffect(() => {
    if (initialTimeRange) {
      setTimeRange(initialTimeRange);
    }
  }, [initialTimeRange]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn(
      'transition-all duration-500 h-[240px] w-full',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
      className
    )}>
      <ResponsiveContainer width="100%" height="100%">
        {timeRange === 'daily' ? (
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1E90FF" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#1E90FF" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/40" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              className="text-muted-foreground text-xs"
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              className="text-muted-foreground text-xs"
              tickFormatter={(value) => `₹${value}`}
            />
            <Tooltip 
              formatter={(value) => [`₹${value}`, 'Amount']}
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
                color: 'hsl(var(--card-foreground))'
              }}
            />
            <Bar 
              dataKey="amount" 
              fill="url(#colorBar)" 
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </BarChart>
        ) : (
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/40" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              className="text-muted-foreground text-xs"
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickLine={false} 
              axisLine={{ stroke: 'hsl(var(--border))' }}
              className="text-muted-foreground text-xs"
              tickFormatter={(value) => `₹${value}`}
            />
            <Tooltip 
              formatter={(value) => [`₹${value}`, 'Amount']}
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
                color: 'hsl(var(--card-foreground))'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="amount" 
              stroke="hsl(var(--primary))" 
              fillOpacity={1} 
              fill="url(#colorAmount)"
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}