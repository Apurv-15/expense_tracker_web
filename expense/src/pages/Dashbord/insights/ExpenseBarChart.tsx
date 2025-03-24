
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

interface ChartData {
  name: string;
  amount: number;
}

interface ExpenseBarChartProps {
  data: ChartData[];
  formatCurrency: (value: number) => string;
}

const ExpenseBarChart = ({ data, formatCurrency }: ExpenseBarChartProps) => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis 
            axisLine={false} 
            tickLine={false}
            tickFormatter={formatCurrency}
          />
          <Tooltip
            formatter={(value) => [formatCurrency(value as number), 'Amount']}
            contentStyle={{
              borderRadius: '8px',
              border: 'none',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Bar 
            dataKey="amount" 
            fill="#0088FE" 
            radius={[4, 4, 0, 0]}
            animationDuration={1000}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseBarChart;
