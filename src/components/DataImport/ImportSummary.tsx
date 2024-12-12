import React from 'react';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { useDataImportStore } from '../../hooks/useDataImportStore';

export function ImportSummary() {
  const { successful, failed, errors } = useDataImportStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Import Summary</h3>
        {successful > 0 && failed === 0 ? (
          <span className="flex items-center text-green-600">
            <CheckCircle className="h-5 w-5 mr-1" />
            Complete
          </span>
        ) : (
          <span className="flex items-center text-yellow-600">
            <AlertTriangle className="h-5 w-5 mr-1" />
            Completed with issues
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-green-600 font-medium">Successfully Imported</span>
          </div>
          <p className="mt-1 text-2xl font-semibold text-green-700">{successful}</p>
        </div>

        <div className="p-4 bg-red-50 rounded-lg">
          <div className="flex items-center">
            <XCircle className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-red-600 font-medium">Failed</span>
          </div>
          <p className="mt-1 text-2xl font-semibold text-red-700">{failed}</p>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Error Details</h4>
          <div className="bg-red-50 rounded-lg p-4">
            <ul className="list-disc list-inside space-y-1 text-sm text-red-600">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}