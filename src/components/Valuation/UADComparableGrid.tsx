import React from 'react';
import { X } from 'lucide-react';
import { Property } from '../../types/property';
import { UADFieldInput } from './UADFieldInput';

interface UADComparableGridProps {
  subject: Property;
  comparables: Property[];
  adjustments: Record<string, Record<string, number>>;
  onAdjustmentChange: (comparableId: string, field: string, value: number) => void;
  onRemoveComparable: (comparableId: string) => void;
}

export function UADComparableGrid({
  subject,
  comparables,
  adjustments,
  onAdjustmentChange,
  onRemoveComparable
}: UADComparableGridProps) {
  const adjustmentFields = [
    { section: 'Sale or Financing', fields: [
      { id: 'saleType', label: 'Sale Type', type: 'saleType' as const },
      { id: 'financing', label: 'Financing', type: 'financing' as const },
      { id: 'concessions', label: 'Concessions', type: 'number' as const }
    ]},
    { section: 'Location', fields: [
      { id: 'location', label: 'Location', type: 'number' as const },
      { id: 'site', label: 'Site', type: 'number' as const },
      { id: 'view', label: 'View', type: 'number' as const }
    ]},
    { section: 'Physical Characteristics', fields: [
      { id: 'condition', label: 'Condition', type: 'number' as const },
      { id: 'gla', label: 'GLA', type: 'number' as const },
      { id: 'rooms', label: 'Room Count', type: 'number' as const },
      { id: 'basement', label: 'Basement', type: 'number' as const },
      { id: 'functional', label: 'Functional Utility', type: 'number' as const }
    ]}
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Feature
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Subject
            </th>
            {comparables.map((comp, index) => (
              <th key={comp.id} className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex justify-between items-center">
                  <span>Comparable {index + 1}</span>
                  <button
                    onClick={() => onRemoveComparable(comp.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {adjustmentFields.map(section => (
            <React.Fragment key={section.section}>
              <tr className="bg-gray-50">
                <td colSpan={comparables.length + 2} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {section.section}
                </td>
              </tr>
              {section.fields.map(field => (
                <tr key={field.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {field.label}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {/* Subject property value */}
                  </td>
                  {comparables.map(comp => (
                    <td key={comp.id} className="px-6 py-4 whitespace-nowrap">
                      <UADFieldInput
                        type={field.type}
                        value={adjustments[comp.id]?.[field.id] || 0}
                        onChange={(value) => onAdjustmentChange(comp.id, field.id, value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}