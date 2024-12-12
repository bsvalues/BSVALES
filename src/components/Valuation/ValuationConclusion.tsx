import React from 'react';
import { DollarSign, AlertCircle, CheckCircle } from 'lucide-react';
import { Property } from '../../types/property';

interface ValuationConclusionProps {
  subject: Property;
  adjustedValues: Array<{
    value: number;
    weight: number;
  }>;
  confidenceLevel: 'high' | 'medium' | 'low';
}

export function ValuationConclusion({ subject, adjustedValues, confidenceLevel }: ValuationConclusionProps) {
  const weightedAverage = adjustedValues.reduce((sum, { value, weight }) => 
    sum + (value * weight), 0) / adjustedValues.reduce((sum, { weight }) => sum + weight, 0);

  const getConfidenceColor = () => {
    switch (confidenceLevel) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getConfidenceIcon = () => {
    switch (confidenceLevel) {
      case 'high': return CheckCircle;
      case 'medium': return AlertCircle;
      case 'low': return AlertCircle;
      default: return AlertCircle;
    }
  };

  const ConfidenceIcon = getConfidenceIcon();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium mb-6">Value Conclusion</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-indigo-50 rounded-lg">
          <div className="flex items-center text-sm text-indigo-600 mb-2">
            <DollarSign className="h-5 w-5 mr-1" />
            Final Value Opinion
          </div>
          <div className="text-3xl font-bold text-indigo-600">
            ${weightedAverage.toLocaleString()}
          </div>
          <div className="mt-2 text-sm text-indigo-600">
            Based on weighted analysis of comparable sales
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start">
            <ConfidenceIcon className={`h-5 w-5 mr-2 mt-0.5 ${getConfidenceColor()}`} />
            <div>
              <p className={`font-medium ${getConfidenceColor()}`}>
                {confidenceLevel.charAt(0).toUpperCase() + confidenceLevel.slice(1)} Confidence Level
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {confidenceLevel === 'high' 
                  ? 'Strong support from market data with minimal adjustments required.'
                  : confidenceLevel === 'medium'
                  ? 'Moderate support from market data with reasonable adjustments.'
                  : 'Limited market data or significant adjustments required.'}
              </p>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              This conclusion considers:
            </p>
            <ul className="mt-2 text-sm text-gray-600 space-y-1">
              <li>• Quality and quantity of comparable sales</li>
              <li>• Market conditions and trends</li>
              <li>• Property characteristics and condition</li>
              <li>• Location and neighborhood factors</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}