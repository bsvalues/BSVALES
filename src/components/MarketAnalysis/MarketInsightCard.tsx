import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

interface MarketInsight {
  id: string;
  type: 'positive' | 'negative' | 'neutral';
  title: string;
  description: string;
  change?: number;
}

interface MarketInsightCardProps {
  insight: MarketInsight;
}

export function MarketInsightCard({ insight }: MarketInsightCardProps) {
  const getInsightStyles = (type: MarketInsight['type']) => {
    switch (type) {
      case 'positive':
        return {
          container: 'bg-green-50 border-green-200',
          title: 'text-green-800',
          description: 'text-green-700',
          icon: TrendingUp
        };
      case 'negative':
        return {
          container: 'bg-red-50 border-red-200',
          title: 'text-red-800',
          description: 'text-red-700',
          icon: TrendingDown
        };
      default:
        return {
          container: 'bg-gray-50 border-gray-200',
          title: 'text-gray-800',
          description: 'text-gray-700',
          icon: AlertCircle
        };
    }
  };

  const styles = getInsightStyles(insight.type);
  const Icon = styles.icon;

  return (
    <div className={`p-4 rounded-lg border ${styles.container}`}>
      <div className="flex items-center mb-2">
        <Icon className="h-5 w-5 mr-2" />
        <h4 className={`font-medium ${styles.title}`}>{insight.title}</h4>
      </div>
      <p className={`text-sm ${styles.description}`}>{insight.description}</p>
      {insight.change && (
        <div className="mt-2 text-sm font-medium">
          Change: {insight.change > 0 ? '+' : ''}{insight.change}%
        </div>
      )}
    </div>
  );
}