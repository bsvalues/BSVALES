import React, { useState } from 'react';
import { Calculator, X, Save, RefreshCw } from 'lucide-react';
import { Property } from '../../types/property';

interface AdjustmentFormProps {
  subject: Property;
  comparable: Property;
  onAdjustmentChange: (adjustments: Record<string, number>) => void;
  onRemove: () => void;
}

export function AdjustmentForm({
  subject,
  comparable,
  onAdjustmentChange,
  onRemove
}: AdjustmentFormProps) {
  const [adjustments, setAdjustments] = useState<Record<string, number>>({
    // Location Adjustments
    location: 0,
    neighborhood: 0,
    view: 0,
    
    // Physical Characteristics
    siteSize: 0,
    design: 0,
    quality: 0,
    age: 0,
    condition: 0,
    gla: 0,
    basement: 0,
    functional: 0,
    
    // Amenities
    garage: 0,
    porch: 0,
    pool: 0,
    landscaping: 0,
    
    // Market Conditions
    timeAdjustment: 0,
    financing: 0,
    saleConditions: 0,
    
    // Additional Features
    energyEfficiency: 0,
    upgrades: 0,
    otherFeatures: 0
  });

  const handleChange = (field: string, value: number) => {
    const newAdjustments = { ...adjustments, [field]: value };
    setAdjustments(newAdjustments);
    onAdjustmentChange(newAdjustments);
  };

  const handleReset = () => {
    const resetAdjustments = Object.keys(adjustments).reduce((acc, key) => ({
      ...acc,
      [key]: 0
    }), {});
    setAdjustments(resetAdjustments);
    onAdjustmentChange(resetAdjustments);
  };

  const totalAdjustment = Object.values(adjustments).reduce((sum, val) => sum + val, 0);
  const adjustmentPercentage = (totalAdjustment / comparable.price) * 100;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Calculator className="h-5 w-5 text-indigo-600 mr-2" />
          <h3 className="text-lg font-medium">{comparable.address}</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleReset}
            className="text-gray-600 hover:text-gray-800 p-2"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button
            onClick={onRemove}
            className="text-gray-400 hover:text-gray-600 p-2"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(adjustments).map(([field, value]) => (
          <div key={field} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {field.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="number"
                value={value}
                onChange={(e) => handleChange(field, Number(e.target.value))}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <span className="text-sm text-gray-500">Total Adjustment:</span>
            <span className={`ml-2 font-medium ${
              totalAdjustment >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {totalAdjustment >= 0 ? '+' : ''}{totalAdjustment.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-sm text-gray-500">Adjustment %:</span>
            <span className={`ml-2 font-medium ${
              Math.abs(adjustmentPercentage) <= 25 ? 'text-green-600' : 'text-red-600'
            }`}>
              {adjustmentPercentage.toFixed(1)}%
            </span>
          </div>
          <div>
            <span className="text-sm text-gray-500">Adjusted Price:</span>
            <span className="ml-2 font-medium text-indigo-600">
              ${(comparable.price + totalAdjustment).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}