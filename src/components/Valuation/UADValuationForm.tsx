import React, { useState } from 'react';
import { Calculator, Save } from 'lucide-react';
import { Property } from '../../types/property';
import { UADComparableGrid } from './UADComparableGrid';
import { AdjustmentSummary } from './AdjustmentSummary';
import { ValuationConclusion } from './ValuationConclusion';

interface UADValuationFormProps {
  subject: Property;
  comparables: Property[];
}

export function UADValuationForm({ subject, comparables }: UADValuationFormProps) {
  const [adjustments, setAdjustments] = useState<Record<string, Record<string, number>>>({});
  const [confidenceLevel, setConfidenceLevel] = useState<'high' | 'medium' | 'low'>('medium');

  const handleAdjustmentChange = (compId: string, field: string, value: number) => {
    setAdjustments(prev => ({
      ...prev,
      [compId]: {
        ...(prev[compId] || {}),
        [field]: value
      }
    }));
  };

  const calculateAdjustedValues = () => {
    return comparables.map(comp => {
      const totalAdjustment = Object.values(adjustments[comp.id] || {})
        .reduce((sum, val) => sum + val, 0);
      return {
        value: comp.price + totalAdjustment,
        weight: 1 // Default equal weighting, can be adjusted based on reliability
      };
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Calculator className="h-5 w-5 text-indigo-600 mr-2" />
            <h2 className="text-lg font-medium">UAD Valuation Analysis</h2>
          </div>
          <button
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Analysis
          </button>
        </div>

        <UADComparableGrid
          subject={subject}
          comparables={comparables}
          adjustments={adjustments}
          onAdjustmentChange={handleAdjustmentChange}
        />
      </div>

      <AdjustmentSummary
        subject={subject}
        comparables={comparables}
        adjustments={adjustments}
      />

      <ValuationConclusion
        subject={subject}
        adjustedValues={calculateAdjustedValues()}
        confidenceLevel={confidenceLevel}
      />
    </div>
  );
}