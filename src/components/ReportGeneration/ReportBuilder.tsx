import React, { useState } from 'react';
import { FileText, Settings, Download, Image, Table, ChartBar } from 'lucide-react';
import { Property } from '../../types/property';
import { ReportSection } from './ReportSection';
import { ReportPreview } from './ReportPreview';

interface ReportBuilderProps {
  property: Property;
  comparables: Property[];
  marketMetrics: any;
}

export function ReportBuilder({ property, comparables, marketMetrics }: ReportBuilderProps) {
  const [selectedSections, setSelectedSections] = useState([
    'property_details',
    'valuation_summary',
    'comparables',
    'market_analysis',
    'photos'
  ]);

  const sections = [
    { id: 'property_details', label: 'Property Details', icon: FileText },
    { id: 'valuation_summary', label: 'Valuation Summary', icon: ChartBar },
    { id: 'comparables', label: 'Comparable Analysis', icon: Table },
    { id: 'market_analysis', label: 'Market Analysis', icon: Settings },
    { id: 'photos', label: 'Property Photos', icon: Image }
  ];

  const handleSectionToggle = (sectionId: string) => {
    setSelectedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Generate Valuation Report</h2>
        <p className="text-sm text-gray-500 mb-6">
          Select the sections to include in your report
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {sections.map(({ id, label, icon: Icon }) => (
            <label
              key={id}
              className={`flex items-center p-4 rounded-lg border cursor-pointer ${
                selectedSections.includes(id)
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedSections.includes(id)}
                onChange={() => handleSectionToggle(id)}
                className="sr-only"
              />
              <Icon className="h-5 w-5 text-indigo-600 mr-3" />
              <span className="text-sm font-medium">{label}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
          >
            <FileText className="h-4 w-4 mr-2 inline" />
            Preview
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
          >
            <Download className="h-4 w-4 mr-2 inline" />
            Generate Report
          </button>
        </div>
      </div>

      {selectedSections.map(sectionId => (
        <ReportSection
          key={sectionId}
          sectionId={sectionId}
          property={property}
          comparables={comparables}
          marketMetrics={marketMetrics}
        />
      ))}
    </div>
  );
}