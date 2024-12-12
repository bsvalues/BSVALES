import React from 'react';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

interface ImportProgressProps {
  total: number;
  processed: number;
  successful: number;
  failed: number;
  isComplete: boolean;
}

export function ImportProgress({
  total,
  processed,
  successful,
  failed,
  isComplete
}: ImportProgressProps) {
  const progress = (processed / total) * 100;

  return (
    <div className="space-y-4">
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block text-indigo-600">
              Import Progress
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-indigo-600">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
          <div
            style={{ width: `${progress}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600 transition-all duration-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-500">Processed</div>
          <div className="text-lg font-semibold text-gray-900">{processed}/{total}</div>
        </div>
        <div className="p-3 bg-green-50 rounded-lg">
          <div className="text-sm text-green-600">Successful</div>
          <div className="text-lg font-semibold text-green-600">{successful}</div>
        </div>
        <div className="p-3 bg-red-50 rounded-lg">
          <div className="text-sm text-red-600">Failed</div>
          <div className="text-lg font-semibold text-red-600">{failed}</div>
        </div>
      </div>

      {isComplete && (
        <div className="flex items-center justify-center p-4">
          {failed === 0 ? (
            <div className="flex items-center text-green-600">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>Import completed successfully</span>
            </div>
          ) : (
            <div className="flex items-center text-red-600">
              <XCircle className="h-5 w-5 mr-2" />
              <span>Import completed with errors</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}