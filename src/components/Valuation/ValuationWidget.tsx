import React, { useState } from 'react';
import { Calculator, TrendingUp, Building } from 'lucide-react';
import { Property } from '../../types/property';
import { useValuation } from '../../hooks/useValuation';

interface ValuationWidgetProps {
  property: Property;
}

export function ValuationWidget({ property }: ValuationWidgetProps) {
  const [activeTab, setActiveTab] = useState<'automated'|'comparable'|'income'>('automated');
  const { estimatedValue, confidence, comparables } = useValuation(property);

  const tabs = [
    { id: 'automated', label: 'Automated Valuation', icon: Calculator },
    { id: 'comparable', label: 'Comparable Sales', icon: TrendingUp },
    { id: 'income', label: 'Income Approach', icon: Building },
  ];

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Property Valuation</h2>
      
      <div className="flex space-x-4 mb-6">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as typeof activeTab)}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === id
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Icon className="h-4 w-4 mr-2" />
            {label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        {activeTab === 'automated' && (
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Estimated Value</h3>
              <p className="text-3xl font-bold text-indigo-600">
                ${estimatedValue.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Confidence Level: {confidence}%
              </p>
            </div>
            <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
              <p className="text-sm text-indigo-700">
                This automated valuation is based on recent market data, property characteristics, 
                and local market trends. Results may vary from actual market value.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'comparable' && (
          <div>
            <h3 className="text-lg font-medium mb-4">Comparable Properties</h3>
            <div className="space-y-4">
              {comparables.map((comp) => (
                <div key={comp.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{comp.address}</p>
                    <p className="text-sm text-gray-500">Sold {comp.soldDate}</p>
                  </div>
                  <p className="font-semibold">${comp.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'income' && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              Income approach valuation is available for commercial properties only.
              Please contact our commercial division for detailed analysis.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}