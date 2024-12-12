import { useState } from 'react';

interface ParseResult {
  headers: string[];
  data: any[];
}

export function useFileParser() {
  const [parsing, setParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parseFile = async (file: File): Promise<ParseResult> => {
    setParsing(true);
    setError(null);

    try {
      const content = await readFileContent(file);
      const result = parseContent(file.type, content);
      setParsing(false);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error parsing file';
      setError(message);
      setParsing(false);
      throw new Error(message);
    }
  };

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  };

  const parseContent = (fileType: string, content: string): ParseResult => {
    switch (fileType) {
      case 'application/json':
        return parseJSON(content);
      case 'text/csv':
        return parseCSV(content);
      default:
        throw new Error('Unsupported file format');
    }
  };

  return { parseFile, parsing, error };
}

function parseJSON(content: string): ParseResult {
  const data = JSON.parse(content);
  const headers = Array.isArray(data) && data.length > 0 
    ? Object.keys(data[0])
    : [];
  return { headers, data: Array.isArray(data) ? data : [data] };
}

function parseCSV(content: string): ParseResult {
  const lines = content.split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const data = lines.slice(1)
    .filter(line => line.trim())
    .map(line => {
      const values = line.split(',');
      return headers.reduce((obj, header, i) => ({
        ...obj,
        [header]: values[i]?.trim()
      }), {});
    });
  return { headers, data };
}