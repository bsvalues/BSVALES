import React, { useState } from 'react';
import { MarketMetricsGrid } from './MarketMetricsGrid';
import { MarketTrendChart } from './MarketTrendChart';
import { MarketInsightCard } from './MarketInsightCard';
import { MarketMetric } from '../../types/property';
import { TIME_RANGES } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatters';

const mockMetrics: MarketMetric[] = [
  {
    title: 'Median Price',
    value: formatCurrency(425000),
    change: 5.2,
    trend: 'up'
  },
  {
    title: 'Days on Market',
    value: '28',
    change: -15.3,
    trend: 'down'
  },
  {
    title: 'Active Listings',
    value: '234',
    change: -2.1,
    trend: 'down'
  },
  {
    title: 'Price per Sq Ft',
    value: formatCurrency(245),
    change: 3.5,
    trend: 'up'
  }
];

const mockTrendData = Array.from({ length: 12 }, (_, i) => ({
  date: `2024-${(i + 1).toString().padStart(2, '0')}-01`,
  value: 400000 + Math.random() * 50000
}));

const mockInsights = [
  {
    id: '1',
    type: 'positive' as const,
    title: 'Strong Market Growth',
    description: 'Property values have increased by 8.5% in Benton County this quarter.',
    change: 8.5
  },
  {
    id: '2',
    type: 'negative' as const,
    title: 'Limited Inventory',
    description: 'Available properties have decreased by 15% in Franklin County.',
    change: -15
  },
  {
    id: '3',
    type: 'neutral' as const,
    title: 'Stable Sales Velocity',
    description: 'Average days on market remains consistent at 28 days across all counties.',
    change: 0
  }
];

export function MarketDashboard() {
  const [selectedCounty, setSelectedCounty] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Market Analysis</h2>
        <select
          value={selectedCounty}
          onChange={(e) => setSelectedCounty(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="all">All Counties</option>
          <option value="benton">Benton County</option>
          <option value="franklin">Franklin County</option>
          <option value="walla-walla">Walla Walla County</option>
          <option value="yakima">Yakima County</option>
        </select>
      </div>

      <MarketMetricsGrid metrics={mockMetrics} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MarketTrendChart
          data={mockTrendData}
          title="Median Price Trends"
          timeRanges={TIME_RANGES}
        />
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Market Insights</h3>
          {mockInsights.map((insight) => (
            <MarketInsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </div>
    </div>
  );
}