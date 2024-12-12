import React from 'react';
import { TrendingUp, Users, Home, DollarSign } from 'lucide-react';

interface MarketIndicator {
  title: string;
  value: string | number;
  trend: 'up' | 'down' | 'neutral';
  change: number;
  icon: typeof TrendingUp;
}

export function MarketIndicators() {
  const indicators: MarketIndicator[] = [
    {
      title: 'Population Growth',
      value: '2.3%',
      trend: 'up',
      change: 2.3,
      icon: Users
    },
    {
      title: 'Median Home Price',
      value: '$425,000',
      trend: 'up',
      change: 5.2,
      icon: Home
    },
    {
      title: 'Rental Yield',
      value: '5.8%',
      trend: 'up',
      change: 0.4,
      icon: DollarSign
    },
    {
      title: 'Market Appreciation',
      value: '4.2%',
      trend: 'up',
      change: 4.2,
      icon: TrendingUp
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {indicators.map((indicator) => {
        const Icon = indicator.icon;
        return (
          <div key={indicator.title} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <Icon className="h-6 w-6 text-indigo-600" />
              <div className={`flex items-center ${
                indicator.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">{indicator.change}%</span>
              </div>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">{indicator.title}</h3>
            <p className="mt-2 text-2xl font-semibold text-indigo-600">
              {indicator.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}