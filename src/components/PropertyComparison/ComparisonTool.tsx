import React, { useState } from 'react';
import { Property } from '../../types/property';
import { ComparisonTable } from './ComparisonTable';
import { PropertySelector } from './PropertySelector';

export function ComparisonTool() {
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([]);

  const handleAddProperty = (property: Property) => {
    if (selectedProperties.length < 3) {
      setSelectedProperties([...selectedProperties, property]);
    }
  };

  const handleRemoveProperty = (propertyId: string) => {
    setSelectedProperties(selectedProperties.filter(p => p.id !== propertyId));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Compare Properties</h2>
        <PropertySelector 
          onSelect={handleAddProperty}
          disabled={selectedProperties.length >= 3}
        />
      </div>

      {selectedProperties.length > 0 && (
        <ComparisonTable 
          properties={selectedProperties}
          onRemove={handleRemoveProperty}
        />
      )}
    </div>
  );
}