import React from 'react';
import { Building2, MapPin, Ruler, Calendar, Home, DollarSign, BarChart2 } from 'lucide-react';
import { Property } from '../../types/property';
import { ValuationWidget } from '../Valuation/ValuationWidget';

interface PropertyDetailsProps {
  property: Property;
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-64">
        <img
          src={property.imageUrl}
          alt={property.address}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <h1 className="text-2xl font-bold text-white">{property.address}</h1>
          <div className="flex items-center text-white/90 mt-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{property.county} County</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <Building2 className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Property Type</p>
              <p className="font-medium">{property.type}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <DollarSign className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">List Price</p>
              <p className="font-medium">${property.price.toLocaleString()}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <BarChart2 className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Market Trend</p>
              <p className="font-medium text-green-600">↑ 5.2% this quarter</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <ValuationWidget property={property} />
        </div>
      </div>
    </div>
  );
}