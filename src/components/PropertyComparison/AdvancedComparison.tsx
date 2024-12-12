import React from 'react';
import { Property } from '../../types/property';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface AdvancedComparisonProps {
  baseProperty: Property;
  compProperties: Property[];
}

export function AdvancedComparison({ baseProperty, compProperties }: AdvancedComparisonProps) {
  const calculateDifference = (value: number, baseValue: number) => {
    const diff = ((value - baseValue) / baseValue) * 100;
    return {
      value: Math.abs(diff).toFixed(1),
      isPositive: diff > 0,
      raw: diff
    };
  };

  const getMetricColor = (diff: number) => {
    const absValue = Math.abs(diff);
    if (absValue <= 5) return 'text-green-600';
    if (absValue <= 10) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium">Detailed Property Comparison</h3>
        <p className="mt-1 text-sm text-gray-500">
          Comparing against {baseProperty.address}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Property
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price Difference
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Size (sq ft)
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price/sq ft
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Year Built
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {compProperties.map((property) => {
              const priceDiff = calculateDifference(property.price, baseProperty.price);
              const pricePerSqFt = property.price / (property.squareFeet || 1);
              const basepricePerSqFt = baseProperty.price / (baseProperty.squareFeet || 1);
              const pricePerSqFtDiff = calculateDifference(pricePerSqFt, basepricePerSqFt);

              return (
                <tr key={property.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{property.address}</div>
                    <div className="text-sm text-gray-500">{property.county}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center ${getMetricColor(priceDiff.raw)}`}>
                      {priceDiff.isPositive ? (
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 mr-1" />
                      )}
                      <span className="text-sm font-medium">{priceDiff.value}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {property.squareFeet?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center ${getMetricColor(pricePerSqFtDiff.raw)}`}>
                      ${pricePerSqFt.toFixed(2)}
                      <span className="ml-2 text-sm">
                        ({pricePerSqFtDiff.isPositive ? '+' : '-'}{pricePerSqFtDiff.value}%)
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {property.yearBuilt}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}