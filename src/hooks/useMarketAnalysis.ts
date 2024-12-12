import { useState, useEffect } from 'react';
import { MarketMetric } from '../types/property';
import { formatCurrency } from '../utils/formatters';

interface MarketAnalysis {
  metrics: MarketMetric[];
  trends: Array<{
    date: string;
    value: number;
  }>;
  insights: Array<{
    id: string;
    type: 'positive' | 'negative' | 'neutral';
    title: string;
    description: string;
    change?: number;
  }>;
}

export function useMarketAnalysis(county?: string) {
  const [analysis, setAnalysis] = useState<MarketAnalysis>({
    metrics: [],
    trends: [],
    insights: []
  });

  useEffect(() => {
    // In a real application, this would fetch data from an API
    // For now, we'll use mock data
    const mockAnalysis: MarketAnalysis = {
      metrics: [
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
      ],
      trends: Array.from({ length: 12 }, (_, i) => ({
        date: `2024-${(i + 1).toString().padStart(2, '0')}-01`,
        value: 400000 + Math.random() * 50000
      })),
      insights: [
        {
          id: '1',
          type: 'positive',
          title: 'Strong Market Growth',
          description: `Property values have increased significantly in ${county || 'all counties'}.`,
          change: 8.5
        },
        {
          id: '2',
          type: 'negative',
          title: 'Limited Inventory',
          description: 'Available properties have decreased, creating a competitive market.',
          change: -15
        },
        {
          id: '3',
          type: 'neutral',
          title: 'Stable Sales Velocity',
          description: 'Average days on market remains consistent with historical averages.',
          change: 0
        }
      ]
    };

    setAnalysis(mockAnalysis);
  }, [county]);

  return analysis;
}