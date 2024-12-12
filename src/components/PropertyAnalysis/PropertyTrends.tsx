import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PropertyTrendsProps {
  trends: Array<{
    period: string;
    value: number;
    change: number;
  }>;
}

export function PropertyTrends({ trends }: PropertyTrendsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium mb-4">Value Trends</h3>
      <div className="space-y-3">
        {trends.map((trend) => (
          <div key={trend.period} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
            <div>
              <span className="text-sm text-gray-500">{trend.period}</span>
              <div className="font-medium">${trend.value.toLocaleString()}</div>
            </div>
            <div className={`flex items-center ${
              trend.change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend.change >= 0 ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              <span className="font-medium">{Math.abs(trend.change)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}