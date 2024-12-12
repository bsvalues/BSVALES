import React from 'react';
import { AlertCircle } from 'lucide-react';

interface MarketInsight {
  id: string;
  type: 'positive' | 'negative' | 'neutral';
  message: string;
}

export function MarketInsights() {
  const insights: MarketInsight[] = [
    {
      id: '1',
      type: 'positive',
      message: 'Property values in this area have increased 8.5% year-over-year'
    },
    {
      id: '2',
      type: 'neutral',
      message: 'Average days on market remains stable at 28 days'
    },
    {
      id: '3',
      type: 'negative',
      message: 'Available inventory has decreased by 15% compared to last quarter'
    }
  ];

  const getInsightColor = (type: MarketInsight['type']) => {
    switch (type) {
      case 'positive': return 'bg-green-50 text-green-700 border-green-200';
      case 'negative': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center mb-4">
        <AlertCircle className="h-5 w-5 text-indigo-600 mr-2" />
        <h3 className="text-lg font-medium">Market Insights</h3>
      </div>
      <div className="space-y-3">
        {insights.map(insight => (
          <div
            key={insight.id}
            className={`p-4 rounded-lg border ${getInsightColor(insight.type)}`}
          >
            {insight.message}
          </div>
        ))}
      </div>
    </div>
  );
}