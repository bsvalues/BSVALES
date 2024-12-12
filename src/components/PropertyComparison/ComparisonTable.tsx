import React from 'react';
import { X } from 'lucide-react';
import { Property } from '../../types/property';

interface ComparisonTableProps {
  properties: Property[];
  onRemove: (propertyId: string) => void;
}

export function ComparisonTable({ properties, onRemove }: ComparisonTableProps) {
  const metrics = [
    { key: 'price', label: 'Price' },
    { key: 'type', label: 'Property Type' },
    { key: 'county', label: 'County' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Metric
            </th>
            {properties.map((property) => (
              <th key={property.id} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center justify-between">
                  <span>{property.address}</span>
                  <button
                    onClick={() => onRemove(property.id)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {metrics.map((metric) => (
            <tr key={metric.key}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {metric.label}
              </td>
              {properties.map((property) => (
                <td key={property.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {metric.key === 'price' ? `$${property[metric.key].toLocaleString()}` : property[metric.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}