import React from 'react';
import { Line } from 'lucide-react';

export function PriceChart() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Price Trends</h3>
        <select className="text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
          <option value="3">Last 3 months</option>
          <option value="6">Last 6 months</option>
          <option value="12">Last 12 months</option>
        </select>
      </div>
      
      <div className="h-64 flex items-center justify-center text-gray-500">
        <p>Price trend chart will be implemented with a charting library</p>
      </div>
    </div>
  );
}