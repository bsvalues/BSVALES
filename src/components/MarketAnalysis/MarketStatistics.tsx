import React from 'react';
import { BarChart2, TrendingUp, Clock, Home } from 'lucide-react';
import { MarketMetricsCard } from './MarketMetricsCard';
import { useMarketAnalysis } from '../../hooks/useMarketAnalysis';

interface MarketStatisticsProps {
  county?: string;
}

export function MarketStatistics({ county }: MarketStatisticsProps) {
  const { metrics } = useMarketAnalysis(county);

  const statisticsConfig = [
    {
      icon: BarChart2,
      description: 'Based on recent sales data'
    },
    {
      icon: TrendingUp,
      description: 'Year over year comparison'
    },
    {
      icon: Clock,
      description: 'Average time to sell'
    },
    {
      icon: Home,
      description: 'Current market inventory'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <MarketMetricsCard
          key={metric.title}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          icon={statisticsConfig[index].icon}
          trend={metric.trend}
          description={statisticsConfig[index].description}
        />
      ))}
    </div>
  );
}