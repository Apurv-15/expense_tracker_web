import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
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
  // Generate gradient colors for bars
  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#9B59B6',
    '#3498DB',
    '#E74C3C'
  ];

  return (
    <div className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" opacity={0.1} />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false}
            tick={{ fill: '#ffffff' }}
            fontSize={12}
            angle={-45}
            textAnchor="end"
          />
          <YAxis 
            axisLine={false} 
            tickLine={false}
            tickFormatter={formatCurrency}
            tick={{ fill: '#ffffff' }}
            fontSize={12}
          />
          <Tooltip
            formatter={(value) => [formatCurrency(value as number), 'Amount']}
            contentStyle={{
              borderRadius: '8px',
              border: 'none',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#1f2937',
              color: '#ffffff'
            }}
            labelStyle={{ color: '#ffffff' }}
          />
          <Bar 
            dataKey="amount" 
            radius={[4, 4, 0, 0]}
            animationDuration={1000}
            animationBegin={1000}
            fill="#0088FE"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseBarChart;
