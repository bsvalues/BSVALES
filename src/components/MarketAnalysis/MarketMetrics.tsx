import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface MarketMetricsProps {
  title: string;
  value: string | number;
  change: number;
  icon: LucideIcon;
  description?: string;
}

export function MarketMetrics({ 
  title, 
  value, 
  change, 
  icon: Icon,
  description 
}: MarketMetricsProps) {
  const isPositive = change > 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <Icon className="h-6 w-6 text-indigo-600" />
        <div className={`flex items-center ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          <TrendIcon className="h-4 w-4 mr-1" />
          <span className="font-medium">{Math.abs(change)}%</span>
        </div>
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-2xl font-semibold text-indigo-600">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
      {description && (
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}