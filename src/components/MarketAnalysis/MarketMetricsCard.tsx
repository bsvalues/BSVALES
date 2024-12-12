import React from 'react';
import { LucideIcon } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

interface MarketMetricsCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: LucideIcon;
  trend: 'up' | 'down' | 'stable';
  description?: string;
}

export function MarketMetricsCard({
  title,
  value,
  change,
  icon: Icon,
  trend,
  description
}: MarketMetricsCardProps) {
  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-600';
  };

  const formattedValue = typeof value === 'number' ? formatCurrency(value) : value;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <Icon className="h-6 w-6 text-indigo-600" />
        <div className={`flex items-center ${getTrendColor()}`}>
          <span className="font-medium">{formatPercentage(change)}</span>
        </div>
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-2xl font-semibold text-indigo-600">
        {formattedValue}
      </p>
      {description && (
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}