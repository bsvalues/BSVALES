import React from 'react';
import { MapPin, Home, DollarSign } from 'lucide-react';
import { Property } from '../../types/property';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={property.imageUrl}
        alt={property.address}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center text-gray-500 text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{property.county} County</span>
        </div>
        <h3 className="mt-2 text-lg font-semibold text-gray-900">{property.address}</h3>
        <div className="mt-2 flex items-center text-gray-700">
          <Home className="h-4 w-4 mr-1" />
          <span>{property.type}</span>
        </div>
        <div className="mt-2 flex items-center text-indigo-600 font-semibold">
          <DollarSign className="h-4 w-4 mr-1" />
          <span>{property.price.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}