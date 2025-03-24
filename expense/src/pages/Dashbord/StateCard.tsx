import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  trend?: {
    percentage: number;
    increased: boolean;
  };
}

const StatCard = ({ 
  title, 
  value, 
  subtext, 
  icon: Icon, 
  iconColor, 
  iconBgColor,
  trend 
}: StatCardProps) => {
  return (
    <div className="glass-morphism rounded-2xl p-6 animate-fade-in fly-out">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <div className={`${iconBgColor} p-2 rounded-full`}>
          <Icon className={`w-4 h-4 ${iconColor}`} />
        </div>
      </div>
      <p className="text-2xl md:text-3xl font-bold">{value}</p>
      {trend ? (
        <div className="flex items-center mt-1">
          <span className={`text-xs ${trend.increased ? 'text-red-500' : 'text-green-500'}`}>
            {trend.increased ? '↑' : '↓'} {trend.percentage}%
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">from last month</span>
        </div>
      ) : (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtext}</p>
      )}
    </div>
  );
};

export default StatCard;