import React from 'react';
import { DollarSign, TrendingUp, PiggyBank, ArrowUpRight } from 'lucide-react';

interface InvestmentMetricsProps {
  metrics: {
    roi: number;
    capRate: number;
    cashFlow: number;
    appreciation: number;
  };
}

export function InvestmentMetrics({ metrics }: InvestmentMetricsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium mb-4">Investment Analysis</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <TrendingUp className="h-4 w-4 mr-1" />
              ROI
            </div>
            <div className="text-lg font-semibold text-indigo-600">
              {metrics.roi.toFixed(1)}%
            </div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <PiggyBank className="h-4 w-4 mr-1" />
              Cap Rate
            </div>
            <div className="text-lg font-semibold text-indigo-600">
              {metrics.capRate.toFixed(1)}%
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <DollarSign className="h-4 w-4 mr-1" />
              Cash Flow
            </div>
            <div className="text-lg font-semibold text-indigo-600">
              ${metrics.cashFlow.toFixed(0)}/mo
            </div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              Appreciation
            </div>
            <div className="text-lg font-semibold text-indigo-600">
              {metrics.appreciation.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}