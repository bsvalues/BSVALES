import React from 'react';
import { Property } from '../../types/property';

interface ReportPreviewProps {
  property: Property;
  sections: string[];
  onClose: () => void;
}

export function ReportPreview({ property, sections, onClose }: ReportPreviewProps) {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Report Preview</h2>
          <p className="text-sm text-gray-500 mt-1">
            {property.address}
          </p>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Report content will be rendered here */}
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
          >
            Close
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}