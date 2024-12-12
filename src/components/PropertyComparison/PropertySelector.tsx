import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { mockProperties } from '../../utils/mockData';

interface PropertySelectorProps {
  onSelect: (property: any) => void;
  disabled?: boolean;
}

export function PropertySelector({ onSelect, disabled }: PropertySelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredProperties = mockProperties.filter(property =>
    property.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <div className="flex">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsOpen(true)}
            disabled={disabled}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {isOpen && filteredProperties.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg">
          <ul className="max-h-60 overflow-auto rounded-md py-1 text-base">
            {filteredProperties.map((property) => (
              <li
                key={property.id}
                onClick={() => {
                  onSelect(property);
                  setIsOpen(false);
                  setSearchTerm('');
                }}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              >
                <p className="font-medium">{property.address}</p>
                <p className="text-sm text-gray-500">{property.county} County - ${property.price.toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}