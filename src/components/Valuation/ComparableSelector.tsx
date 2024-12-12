import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Property } from '../../types/property';
import { mockProperties } from '../../utils/mockData';

interface ComparableSelectorProps {
  subject: Property;
  onSelect: (comparable: Property) => void;
  selectedIds: string[];
}

export function ComparableSelector({
  subject,
  onSelect,
  selectedIds
}: ComparableSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProperties = mockProperties.filter(property => 
    property.id !== subject.id &&
    !selectedIds.includes(property.id) &&
    (property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
     property.county.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search comparable properties..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {filteredProperties.length > 0 && (
        <div className="mt-4 grid grid-cols-1 gap-4">
          {filteredProperties.map(property => (
            <button
              key={property.id}
              onClick={() => onSelect(property)}
              className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <div className="font-medium">{property.address}</div>
                <div className="text-sm text-gray-500 flex items-center mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {property.county} County
                </div>
              </div>
              <div className="text-lg font-medium text-indigo-600">
                ${property.price.toLocaleString()}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}