import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingState() {
  return (
    <div className="flex items-center justify-center p-8">
      <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      <span className="ml-2 text-gray-600">Loading...</span>
    </div>
  );
}