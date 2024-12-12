import React from 'react';
import { HelpCircle } from 'lucide-react';

export function DataMappingGuide() {
  const requiredFields = [
    { field: 'address', description: 'Property street address' },
    { field: 'county', description: 'County name (Benton, Franklin, Walla Walla, or Yakima)' },
    { field: 'price', description: 'Property price in USD' },
    { field: 'type', description: 'Property type (residential, commercial, land)' }
  ];

  const optionalFields = [
    { field: 'squareFeet', description: 'Total square footage' },
    { field: 'yearBuilt', description: 'Year the property was built' },
    { field: 'bedrooms', description: 'Number of bedrooms' },
    { field: 'bathrooms', description: 'Number of bathrooms' }
  ];

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center mb-4">
        <HelpCircle className="h-5 w-5 text-indigo-600 mr-2" />
        <h3 className="text-sm font-medium text-gray-900">Data Mapping Guide</h3>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-xs font-medium text-gray-700 mb-2">Required Fields</h4>
          <ul className="space-y-2">
            {requiredFields.map(({ field, description }) => (
              <li key={field} className="text-sm">
                <span className="font-medium text-gray-900">{field}:</span>
                <span className="text-gray-600 ml-2">{description}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-medium text-gray-700 mb-2">Optional Fields</h4>
          <ul className="space-y-2">
            {optionalFields.map(({ field, description }) => (
              <li key={field} className="text-sm">
                <span className="font-medium text-gray-900">{field}:</span>
                <span className="text-gray-600 ml-2">{description}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}