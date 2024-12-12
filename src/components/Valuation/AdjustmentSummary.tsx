import React from 'react';
import { Property } from '../../types/property';
import { Calculator, AlertCircle } from 'lucide-react';

interface AdjustmentSummaryProps {
  subject: Property;
  comparables: Property[];
  adjustments: Record<string, Record<string, number>>;
}

export function AdjustmentSummary({ subject, comparables, adjustments }: AdjustmentSummaryProps) {
  const calculateTotalAdjustments = (compId: string) => {
    return Object.values(adjustments[compId] || {}).reduce((sum, val) => sum + val, 0);
  };

  const getAdjustedValues = () => {
    return comparables.map(comp => ({
      original: comp.price,
      adjusted: comp.price + calculateTotalAdjustments(comp.id),
      totalAdjustment: calculateTotalAdjustments(comp.id),
      percentageAdjustment: (calculateTotalAdjustments(comp.id) / comp.price) * 100
    }));
  };

  const adjustedValues = getAdjustedValues();
  const averageAdjustedValue = adjustedValues.reduce((sum, val) => sum + val.adjusted, 0) / adjustedValues.length;
  const medianAdjustedValue = adjustedValues.map(v => v.adjusted).sort((a, b) => a - b)[Math.floor(adjustedValues.length / 2)];
  const averagePercentageAdjustment = Math.abs(adjustedValues.reduce((sum, val) => sum + val.percentageAdjustment, 0) / adjustedValues.length);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <Calculator className="h-5 w-5 text-indigo-600 mr-2" />
        <h3 className="text-lg font-medium">Adjustment Summary</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Average Adjusted Value</p>
          <p className="text-xl font-semibold text-indigo-600">
            ${averageAdjustedValue.toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Median Adjusted Value</p>
          <p className="text-xl font-semibold text-indigo-600">
            ${medianAdjustedValue.toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Average Net Adjustment</p>
          <p className={`text-xl font-semibold ${
            averagePercentageAdjustment <= 15 ? 'text-green-600' : 'text-red-600'
          }`}>
            {averagePercentageAdjustment.toFixed(1)}%
          </p>
        </div>
      </div>

      {averagePercentageAdjustment > 15 && (
        <div className="p-4 bg-yellow-50 rounded-lg flex items-start">
          <AlertCircle className="h-5 w-5 text-yellow-400 mr-2 mt-0.5" />
          <div className="text-sm text-yellow-700">
            <p className="font-medium mb-1">High Adjustment Warning</p>
            <p>The average net adjustment exceeds 15%. Consider reviewing comparable selection or adjustment factors for more reliable results.</p>
          </div>
        </div>
      )}
    </div>
  );
}