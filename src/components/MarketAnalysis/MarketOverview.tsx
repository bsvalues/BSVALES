import React from 'react';
import { MarketStatistics } from './MarketStatistics';
import { MarketTrendChart } from './MarketTrendChart';
import { MarketInsightCard } from './MarketInsightCard';
import { useMarketAnalysis } from '../../hooks/useMarketAnalysis';
import { TIME_RANGES } from '../../utils/constants';

interface MarketOverviewProps {
  county?: string;
}

export function MarketOverview({ county }: MarketOverviewProps) {
  const { trends, insights } = useMarketAnalysis(county);

  return (
    <div className="space-y-8">
      <MarketStatistics county={county} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MarketTrendChart
          data={trends}
          title="Market Price Trends"
          timeRanges={TIME_RANGES}
        />
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Market Insights</h3>
          {insights.map((insight) => (
            <MarketInsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </div>
    </div>
  );
}