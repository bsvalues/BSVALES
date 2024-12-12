import React, { useState } from 'react';
import { Property } from '../../types/property';

interface DataMappingFormProps {
  onMappingChange: (mappings: Record<string, string>) => void;
}

export function DataMappingForm({ onMappingChange }: DataMappingFormProps) {
  const [mappings, setMappings] = useState<Record<string, string>>({});

  const propertyFields = [
    { key: 'address', label: 'Property Address' },
    { key: 'county', label: 'County' },
    { key: 'price', label: 'Price' },
    { key: 'type', label: 'Property Type' },
    { key: 'squareFeet', label: 'Square Footage' },
    { key: 'yearBuilt', label: 'Year Built' },
    { key: 'bedrooms', label: 'Bedrooms' },
    { key: 'bathrooms', label: 'Bathrooms' }
  ];

  const handleMappingChange = (field: string, value: string) => {
    const newMappings = { ...mappings, [field]: value };
    setMappings(newMappings);
    onMappingChange(newMappings);
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <h3 className="text-lg font-medium mb-4">Map Data Fields</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {propertyFields.map(({ key, label }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <input
              type="text"
              placeholder="Enter source field name"
              value={mappings[key] || ''}
              onChange={(e) => handleMappingChange(key, e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
}