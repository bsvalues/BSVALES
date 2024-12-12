import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function MarketTrends() {
  const trends = [
    { label: 'Price per Sq Ft', value: '$245', change: 3.5 },
    { label: 'Inventory', value: '234 units', change: -2.1 },
    { label: 'Time to Sell', value: '28 days', change: -15.3 },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-medium mb-6">Market Trends</h3>
      
      <div className="space-y-4">
        {trends.map((trend) => (
          <div key={trend.label} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">{trend.label}</p>
              <p className="text-lg font-semibold">{trend.value}</p>
            </div>
            <div className={`flex items-center ${trend.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend.change > 0 ? (
                <TrendingUp className="h-5 w-5 mr-1" />
              ) : (
                <TrendingDown className="h-5 w-5 mr-1" />
              )}
              <span className="font-medium">{Math.abs(trend.change)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}