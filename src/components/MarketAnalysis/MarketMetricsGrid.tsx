import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Clock, Home, BarChart2 } from 'lucide-react';
import { MarketMetric } from '../../types/property';

interface MarketMetricsGridProps {
  metrics: MarketMetric[];
}

export function MarketMetricsGrid({ metrics }: MarketMetricsGridProps) {
  const getIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case 'median price': return DollarSign;
      case 'days on market': return Clock;
      case 'active listings': return Home;
      default: return BarChart2;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => {
        const Icon = getIcon(metric.title);
        const isPositive = metric.trend === 'up';
        const TrendIcon = isPositive ? TrendingUp : TrendingDown;

        return (
          <div key={metric.title} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <Icon className="h-6 w-6 text-indigo-600" />
              <div className={`flex items-center ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendIcon className="h-4 w-4 mr-1" />
                <span className="font-medium">{Math.abs(metric.change)}%</span>
              </div>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">{metric.title}</h3>
            <p className="mt-2 text-2xl font-semibold text-indigo-600">
              {metric.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}