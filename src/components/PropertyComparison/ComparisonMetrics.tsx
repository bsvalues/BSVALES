import React from 'react';
import { Property } from '../../types/property';

interface ComparisonMetricsProps {
  properties: Property[];
  baseProperty: Property;
}

export function ComparisonMetrics({ properties, baseProperty }: ComparisonMetricsProps) {
  const calculateDifference = (value: number, baseValue: number) => {
    const diff = ((value - baseValue) / baseValue) * 100;
    return {
      value: Math.abs(diff).toFixed(1),
      isPositive: diff > 0
    };
  };

  return (
    <div className="mt-6 bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b">
        <h3 className="text-lg font-medium">Detailed Comparison</h3>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {properties.map(property => {
            const priceDiff = calculateDifference(property.price, baseProperty.price);
            
            return (
              <div key={property.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">{property.address}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    priceDiff.isPositive ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {priceDiff.isPositive ? '+' : '-'}{priceDiff.value}%
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">County</p>
                    <p className="font-medium">{property.county}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Property Type</p>
                    <p className="font-medium">{property.type}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}