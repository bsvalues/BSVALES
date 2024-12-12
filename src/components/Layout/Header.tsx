import React from 'react';
import { Home, Building2 } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">RealEstate Valuator</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <Home className="h-5 w-5 mr-1" />
              <span>Home</span>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}