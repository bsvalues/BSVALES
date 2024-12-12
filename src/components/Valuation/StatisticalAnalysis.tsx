import React from 'react';
import { BarChart2, TrendingUp, AlertCircle } from 'lucide-react';
import { Property } from '../../types/property';

interface StatisticalAnalysisProps {
  subject: Property;
  comparables: Property[];
  adjustments: Record<string, Record<string, number>>;
}

export function StatisticalAnalysis({
  subject,
  comparables,
  adjustments
}: StatisticalAnalysisProps) {
  const getAdjustedPrices = () => {
    return comparables.map(comp => {
      const totalAdjustment = Object.values(adjustments[comp.id] || {})
        .reduce((sum, val) => sum + val, 0);
      return comp.price + totalAdjustment;
    });
  };

  const adjustedPrices = getAdjustedPrices();
  const mean = adjustedPrices.reduce((sum, price) => sum + price, 0) / adjustedPrices.length;
  const median = adjustedPrices.sort((a, b) => a - b)[Math.floor(adjustedPrices.length / 2)];
  const stdDev = Math.sqrt(
    adjustedPrices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / adjustedPrices.length
  );
  const cov = (stdDev / mean) * 100;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <BarChart2 className="h-5 w-5 text-indigo-600 mr-2" />
        <h3 className="text-lg font-medium">Statistical Analysis</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Mean</p>
          <p className="text-lg font-semibold text-indigo-600">
            ${mean.toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Median</p>
          <p className="text-lg font-semibold text-indigo-600">
            ${median.toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Standard Deviation</p>
          <p className="text-lg font-semibold text-indigo-600">
            ${stdDev.toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Coefficient of Variation</p>
          <p className={`text-lg font-semibold ${
            cov <= 15 ? 'text-green-600' : 'text-red-600'
          }`}>
            {cov.toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center mb-2">
          <TrendingUp className="h-4 w-4 text-gray-400 mr-2" />
          <h4 className="font-medium">Value Conclusion Range</h4>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg text-center">
            <p className="text-sm text-gray-500">Low</p>
            <p className="font-medium">${(mean - stdDev).toLocaleString()}</p>
          </div>
          <div className="p-3 bg-indigo-50 rounded-lg text-center">
            <p className="text-sm text-gray-500">Indicated Value</p>
            <p className="font-medium text-indigo-600">${mean.toLocaleString()}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg text-center">
            <p className="text-sm text-gray-500">High</p>
            <p className="font-medium">${(mean + stdDev).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {cov > 15 && (
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg flex items-start">
          <AlertCircle className="h-5 w-5 text-yellow-400 mr-2 mt-0.5" />
          <p className="text-sm text-yellow-700">
            The coefficient of variation exceeds 15%, indicating higher variability in the adjusted values. 
            Consider reviewing adjustments or selecting additional comparables for a more reliable value conclusion.
          </p>
        </div>
      )}
    </div>
  );
}