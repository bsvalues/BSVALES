import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { PropertySearchCriteria } from '../../types/property';

interface SearchFormProps {
  onSearch: (criteria: PropertySearchCriteria) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [criteria, setCriteria] = useState<PropertySearchCriteria>({
    county: '',
    minPrice: '',
    maxPrice: '',
    propertyType: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(criteria);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <select
          value={criteria.county}
          onChange={(e) => setCriteria({ ...criteria, county: e.target.value })}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select County</option>
          <option value="benton">Benton</option>
          <option value="franklin">Franklin</option>
          <option value="walla-walla">Walla Walla</option>
          <option value="yakima">Yakima</option>
        </select>

        <input
          type="text"
          placeholder="Min Price"
          value={criteria.minPrice}
          onChange={(e) => setCriteria({ ...criteria, minPrice: e.target.value })}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />

        <input
          type="text"
          placeholder="Max Price"
          value={criteria.maxPrice}
          onChange={(e) => setCriteria({ ...criteria, maxPrice: e.target.value })}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />

        <select
          value={criteria.propertyType}
          onChange={(e) => setCriteria({ ...criteria, propertyType: e.target.value })}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Property Type</option>
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
          <option value="land">Land</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Search className="h-5 w-5 mr-2" />
        Search Properties
      </button>
    </form>
  );
}