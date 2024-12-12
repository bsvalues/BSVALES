import React, { useState } from 'react';
import { ComparisonTable } from './ComparisonTable';
import { ComparisonChart } from './ComparisonChart';
import { PropertySelector } from './PropertySelector';
import { Property } from '../../types/property';

export function ComparisonDashboard() {
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([]);

  const handleAddProperty = (property: Property) => {
    if (selectedProperties.length < 4) {
      setSelectedProperties([...selectedProperties, property]);
    }
  };

  const handleRemoveProperty = (propertyId: string) => {
    setSelectedProperties(selectedProperties.filter(p => p.id !== propertyId));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Property Comparison</h2>
        <span className="text-sm text-gray-500">
          {selectedProperties.length}/4 properties selected
        </span>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <PropertySelector 
          onSelect={handleAddProperty}
          disabled={selectedProperties.length >= 4}
        />
      </div>

      {selectedProperties.length > 0 && (
        <>
          <ComparisonTable 
            properties={selectedProperties}
            onRemove={handleRemoveProperty}
          />
          <ComparisonChart 
            properties={selectedProperties}
          />
        </>
      )}
    </div>
  );
}