import React from 'react';
import { Property } from '../../types/property';

interface ComparisonChartProps {
  properties: Property[];
}

export function ComparisonChart({ properties }: ComparisonChartProps) {
  const maxPrice = Math.max(...properties.map(p => p.price));
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-medium mb-6">Price Comparison</h3>
      <div className="space-y-4">
        {properties.map(property => {
          const percentage = (property.price / maxPrice) * 100;
          
          return (
            <div key={property.id} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{property.address}</span>
                <span className="font-medium">${property.price.toLocaleString()}</span>
              </div>
              <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="absolute h-full bg-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}