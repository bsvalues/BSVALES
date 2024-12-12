import React, { useState, useEffect } from 'react';
import { Calculator, RefreshCw, AlertCircle } from 'lucide-react';
import { Property } from '../../types/property';
import { calculateAutoAdjustments } from '../../utils/comparableCalculations';

interface AutoloadComparableFormProps {
  subject: Property;
  comparable: Property;
  onAdjustmentChange: (adjustments: Record<string, number>) => void;
}

export function AutoloadComparableForm({
  subject,
  comparable,
  onAdjustmentChange
}: AutoloadComparableFormProps) {
  const [adjustments, setAdjustments] = useState<Record<string, number>>({});
  const [isAutoCalculated, setIsAutoCalculated] = useState(true);
  const [overrides, setOverrides] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Auto-calculate initial adjustments
    const autoAdjustments = calculateAutoAdjustments(subject, comparable);
    setAdjustments(autoAdjustments);
    onAdjustmentChange(autoAdjustments);
  }, [subject, comparable]);

  const handleManualAdjustment = (field: string, value: number) => {
    setOverrides({ ...overrides, [field]: true });
    const newAdjustments = { ...adjustments, [field]: value };
    setAdjustments(newAdjustments);
    onAdjustmentChange(newAdjustments);
    setIsAutoCalculated(false);
  };

  const handleResetField = (field: string) => {
    const autoAdjustments = calculateAutoAdjustments(subject, comparable);
    setOverrides({ ...overrides, [field]: false });
    setAdjustments({ ...adjustments, [field]: autoAdjustments[field] });
    onAdjustmentChange({ ...adjustments, [field]: autoAdjustments[field] });
  };

  const adjustmentFields = [
    { section: 'Location', fields: [
      { id: 'location', label: 'Location' },
      { id: 'view', label: 'View' },
      { id: 'siteSize', label: 'Site Size' }
    ]},
    { section: 'Improvements', fields: [
      { id: 'quality', label: 'Quality' },
      { id: 'condition', label: 'Condition' },
      { id: 'age', label: 'Age' },
      { id: 'gla', label: 'GLA' },
      { id: 'rooms', label: 'Room Count' },
      { id: 'basement', label: 'Basement' },
      { id: 'functional', label: 'Functional Utility' }
    ]},
    { section: 'Amenities', fields: [
      { id: 'garage', label: 'Garage/Parking' },
      { id: 'porch', label: 'Porch/Patio' },
      { id: 'pool', label: 'Pool' }
    ]}
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Calculator className="h-5 w-5 text-indigo-600 mr-2" />
          <h3 className="text-lg font-medium">Comparable Adjustments</h3>
        </div>
        {!isAutoCalculated && (
          <div className="flex items-center text-sm text-yellow-600">
            <AlertCircle className="h-4 w-4 mr-1" />
            Contains manual overrides
          </div>
        )}
      </div>

      {adjustmentFields.map(section => (
        <div key={section.section} className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">{section.section}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {section.fields.map(field => (
              <div key={field.id} className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <div className="flex">
                  <input
                    type="number"
                    value={adjustments[field.id] || 0}
                    onChange={(e) => handleManualAdjustment(field.id, Number(e.target.value))}
                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                      overrides[field.id] ? 'border-yellow-300' : ''
                    }`}
                  />
                  {overrides[field.id] && (
                    <button
                      onClick={() => handleResetField(field.id)}
                      className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                      title="Reset to auto-calculated value"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Total Adjustments</p>
            <p className="text-lg font-semibold text-indigo-600">
              ${Object.values(adjustments).reduce((sum, val) => sum + val, 0).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Adjusted Price</p>
            <p className="text-lg font-semibold text-indigo-600">
              ${(comparable.price + Object.values(adjustments).reduce((sum, val) => sum + val, 0)).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}