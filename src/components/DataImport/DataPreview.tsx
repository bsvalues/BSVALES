import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';

interface DataPreviewProps {
  file: File;
}

export function DataPreview({ file }: DataPreviewProps) {
  const [preview, setPreview] = useState<any[]>([]);

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        if (file.type === 'application/json') {
          const data = JSON.parse(e.target?.result as string);
          setPreview(Array.isArray(data) ? data.slice(0, 5) : [data]);
        } else if (file.type === 'text/csv') {
          const lines = (e.target?.result as string).split('\n');
          const headers = lines[0].split(',');
          const previewData = lines.slice(1, 6).map(line => {
            const values = line.split(',');
            return headers.reduce((obj, header, i) => ({
              ...obj,
              [header.trim()]: values[i]?.trim()
            }), {});
          });
          setPreview(previewData);
        }
      } catch (error) {
        console.error('Error parsing file:', error);
      }
    };

    if (file.type === 'application/json' || file.type === 'text/csv') {
      reader.readAsText(file);
    }
  }, [file]);

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center mb-4">
        <FileText className="h-5 w-5 text-gray-400 mr-2" />
        <h3 className="text-sm font-medium text-gray-900">Data Preview</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {preview[0] && Object.keys(preview[0]).map(header => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {preview.map((row, i) => (
              <tr key={i}>
                {Object.values(row).map((value: any, j) => (
                  <td
                    key={j}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}