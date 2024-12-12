import { useState } from 'react';
import { Property } from '../types/property';

interface ImportResult {
  importData: (file: File, mappings: Record<string, string>) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useDataImport(): ImportResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parseFile = async (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          if (file.type === 'application/json') {
            const data = JSON.parse(e.target?.result as string);
            resolve(Array.isArray(data) ? data : [data]);
          } else if (file.type === 'text/csv') {
            const lines = (e.target?.result as string).split('\n');
            const headers = lines[0].split(',').map(h => h.trim());
            const data = lines.slice(1).map(line => {
              const values = line.split(',');
              return headers.reduce((obj, header, i) => ({
                ...obj,
                [header]: values[i]?.trim()
              }), {});
            });
            resolve(data);
          } else {
            reject(new Error('Unsupported file format'));
          }
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => reject(reader.error);
      
      if (file.type === 'application/json' || file.type === 'text/csv') {
        reader.readAsText(file);
      } else {
        reject(new Error('Unsupported file format'));
      }
    });
  };

  const importData = async (file: File, mappings: Record<string, string>) => {
    setLoading(true);
    setError(null);

    try {
      const rawData = await parseFile(file);
      
      // Transform data according to mappings
      const transformedData = rawData.map(item => {
        const property: Partial<Property> = {};
        
        Object.entries(mappings).forEach(([sourceField, targetField]) => {
          if (targetField in item) {
            property[sourceField as keyof Property] = item[targetField];
          }
        });

        return property as Property;
      });

      // Here you would typically save the data to your storage
      console.log('Imported data:', transformedData);
      
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error importing data');
      setLoading(false);
    }
  };

  return { importData, loading, error };
}