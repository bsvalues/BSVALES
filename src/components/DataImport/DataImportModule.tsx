import React, { useState } from 'react';
import { Upload, FileText, Database, AlertCircle } from 'lucide-react';
import { DataPreview } from './DataPreview';
import { DataMappingForm } from './DataMappingForm';
import { useDataImport } from '../../hooks/useDataImport';

export function DataImportModule() {
  const [file, setFile] = useState<File | null>(null);
  const [mappings, setMappings] = useState<Record<string, string>>({});
  const { importData, loading, error } = useDataImport();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleImport = async () => {
    if (file && Object.keys(mappings).length > 0) {
      await importData(file, mappings);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium mb-4">Import Property Data</h2>
        
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="flex flex-col items-center">
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">
                Drag and drop your data file or
              </p>
              <label className="mt-2 cursor-pointer">
                <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                  Browse Files
                </span>
                <input
                  type="file"
                  className="sr-only"
                  accept=".csv,.xlsx,.json"
                  onChange={handleFileChange}
                />
              </label>
              <p className="mt-2 text-xs text-gray-500">
                Supported formats: CSV, Excel, JSON
              </p>
            </div>
          </div>

          {file && (
            <>
              <DataPreview file={file} />
              <DataMappingForm onMappingChange={setMappings} />
              
              <button
                onClick={handleImport}
                disabled={loading}
                className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Database className="h-4 w-4 mr-2" />
                {loading ? 'Importing...' : 'Import Data'}
              </button>
            </>
          )}

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Import Error
                  </h3>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}