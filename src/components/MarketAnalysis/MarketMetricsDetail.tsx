import React from 'react';
import { BarChart2, TrendingUp, TrendingDown, DollarSign, Clock, Home } from 'lucide-react';
import { MarketMetric } from '../../types/property';
import { formatCurrency } from '../../utils/formatters';

interface MarketMetricsDetailProps {
  metrics: MarketMetric[];
  county?: string;
}

export function MarketMetricsDetail({ metrics, county }: MarketMetricsDetailProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <BarChart2 className="h-5 w-5 text-indigo-600 mr-2" />
        <h3 className="text-lg font-medium">
          Detailed Market Metrics {county && `for ${county} County`}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((metric) => {
          const isPositive = metric.trend === 'up';
          const TrendIcon = isPositive ? TrendingUp : TrendingDown;

          return (
            <div
              key={metric.title}
              className="flex items-center p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center">
                  {metric.title.includes('Price') ? (
                    <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                  ) : metric.title.includes('Days') ? (
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                  ) : (
                    <Home className="h-5 w-5 text-gray-400 mr-2" />
                  )}
                  <span className="text-sm text-gray-600">{metric.title}</span>
                </div>
                <div className="mt-1 text-lg font-semibold">
                  {typeof metric.value === 'number' 
                    ? formatCurrency(metric.value)
                    : metric.value}
                </div>
              </div>
              <div className={`flex items-center ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendIcon className="h-4 w-4 mr-1" />
                <span className="font-medium">{Math.abs(metric.change)}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}