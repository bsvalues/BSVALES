import React from 'react';
import { DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { Property } from '../../types/property';
import { useValuation } from '../../hooks/useValuation';

interface ValuationSummaryProps {
  property: Property;
}

export function ValuationSummary({ property }: ValuationSummaryProps) {
  const { estimatedValue, confidence, comparables } = useValuation(property);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Valuation Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <DollarSign className="h-4 w-4 mr-1" />
              Estimated Value
            </div>
            <div className="text-2xl font-semibold text-indigo-600">
              ${estimatedValue.toLocaleString()}
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <TrendingUp className="h-4 w-4 mr-1" />
              Confidence Level
            </div>
            <div className="text-2xl font-semibold text-indigo-600">
              {confidence}%
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <AlertCircle className="h-4 w-4 mr-1" />
              Value Range
            </div>
            <div className="text-2xl font-semibold text-indigo-600">
              ±5%
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Valuation Methodology</h4>
          <p className="text-sm text-gray-600">
            This valuation is based on a comprehensive analysis of comparable sales, 
            market trends, and property characteristics. The estimate considers recent 
            transactions, property condition, location factors, and current market dynamics.
          </p>
        </div>
      </div>
    </div>
  );
}