import React, { useState } from 'react';
import { Calculator, Save, RefreshCw } from 'lucide-react';
import { Property } from '../../types/property';

interface AdjustmentFactors {
  location: number;
  size: number;
  age: number;
  condition: number;
  quality: number;
  bedrooms: number;
  bathrooms: number;
  garageSpaces: number;
  lotSize: number;
  view: number;
}

interface ComparableAdjustmentFormProps {
  subject: Property;
  comparable: Property;
  onSave: (adjustments: AdjustmentFactors) => void;
}

export function ComparableAdjustmentForm({
  subject,
  comparable,
  onSave
}: ComparableAdjustmentFormProps) {
  const [adjustments, setAdjustments] = useState<AdjustmentFactors>({
    location: 0,
    size: 0,
    age: 0,
    condition: 0,
    quality: 0,
    bedrooms: 0,
    bathrooms: 0,
    garageSpaces: 0,
    lotSize: 0,
    view: 0
  });

  const handleReset = () => {
    setAdjustments({
      location: 0,
      size: 0,
      age: 0,
      condition: 0,
      quality: 0,
      bedrooms: 0,
      bathrooms: 0,
      garageSpaces: 0,
      lotSize: 0,
      view: 0
    });
  };

  const calculateTotalAdjustment = () => {
    return Object.values(adjustments).reduce((sum, value) => sum + value, 0);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Calculator className="h-5 w-5 text-indigo-600 mr-2" />
          <h3 className="text-lg font-medium">Comparable Adjustments</h3>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {Object.entries(adjustments).map(([factor, value]) => (
            <div key={factor}>
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {factor.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setAdjustments({
                    ...adjustments,
                    [factor]: parseFloat(e.target.value) || 0
                  })}
                  className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="text-lg font-medium mb-4">Adjustment Summary</h4>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Original Price</p>
              <p className="text-xl font-semibold text-gray-900">
                ${comparable.price.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Adjustments</p>
              <p className={`text-xl font-semibold ${
                calculateTotalAdjustment() >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {calculateTotalAdjustment() >= 0 ? '+' : ''}
                ${calculateTotalAdjustment().toLocaleString()}
              </p>
            </div>
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-500">Adjusted Price</p>
              <p className="text-xl font-semibold text-indigo-600">
                ${(comparable.price + calculateTotalAdjustment()).toLocaleString()}
              </p>
            </div>
          </div>

          <button
            onClick={() => onSave(adjustments)}
            className="mt-6 w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Adjustments
          </button>
        </div>
      </div>
    </div>
  );
}