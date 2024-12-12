import React, { useState } from 'react';
import { ComparableSelector } from './ComparableSelector';
import { UADComparableGrid } from './UADComparableGrid';
import { AdjustmentSummary } from './AdjustmentSummary';
import { StatisticalAnalysis } from './StatisticalAnalysis';
import { ValuationConclusion } from './ValuationConclusion';
import { Property } from '../../types/property';

interface ComparableAdjustmentSystemProps {
  subject: Property;
}

export function ComparableAdjustmentSystem({ subject }: ComparableAdjustmentSystemProps) {
  const [selectedComparables, setSelectedComparables] = useState<Property[]>([]);
  const [adjustments, setAdjustments] = useState<Record<string, Record<string, number>>>({});

  const handleComparableSelect = (comparable: Property) => {
    if (selectedComparables.length < 3) {
      setSelectedComparables([...selectedComparables, comparable]);
    }
  };

  const handleComparableRemove = (comparableId: string) => {
    setSelectedComparables(selectedComparables.filter(c => c.id !== comparableId));
    const newAdjustments = { ...adjustments };
    delete newAdjustments[comparableId];
    setAdjustments(newAdjustments);
  };

  const handleAdjustmentChange = (comparableId: string, field: string, value: number) => {
    setAdjustments(prev => ({
      ...prev,
      [comparableId]: {
        ...(prev[comparableId] || {}),
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <ComparableSelector
        subject={subject}
        onSelect={handleComparableSelect}
        selectedIds={selectedComparables.map(c => c.id)}
      />

      {selectedComparables.length > 0 && (
        <>
          <UADComparableGrid
            subject={subject}
            comparables={selectedComparables}
            adjustments={adjustments}
            onAdjustmentChange={handleAdjustmentChange}
            onRemoveComparable={handleComparableRemove}
          />

          <AdjustmentSummary
            subject={subject}
            comparables={selectedComparables}
            adjustments={adjustments}
          />

          <StatisticalAnalysis
            subject={subject}
            comparables={selectedComparables}
            adjustments={adjustments}
          />

          <ValuationConclusion
            subject={subject}
            adjustedValues={selectedComparables.map(comp => ({
              value: comp.price + Object.values(adjustments[comp.id] || {}).reduce((sum, val) => sum + val, 0),
              weight: 1
            }))}
            confidenceLevel={selectedComparables.length >= 3 ? 'high' : 'medium'}
          />
        </>
      )}
    </div>
  );
}