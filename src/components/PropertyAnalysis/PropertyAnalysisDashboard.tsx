import React from 'react';
import { PropertyTrends } from './PropertyTrends';
import { PropertyScore } from './PropertyScore';
import { InvestmentMetrics } from './InvestmentMetrics';
import { Property } from '../../types/property';
import { usePropertyAnalysis } from '../../hooks/usePropertyAnalysis';

interface PropertyAnalysisDashboardProps {
  property: Property;
}

export function PropertyAnalysisDashboard({ property }: PropertyAnalysisDashboardProps) {
  const analysis = usePropertyAnalysis(property);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PropertyScore score={analysis.score} />
        <PropertyTrends trends={analysis.trends} />
        <InvestmentMetrics metrics={analysis.investmentMetrics} />
      </div>
    </div>
  );
}