import React from 'react';
import { Property } from '../../types/property';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface AdjustedComparable extends Property {
  adjustments: {
    location: number;
    size: number;
    age: number;
    condition: number;
    quality: number;
    bedrooms: number;
    bathrooms: number;
    garageSpaces: number;
    lotSize: number;
    view: number;
  };
  adjustedPrice: number;
}

interface ComparableAdjustmentGridProps {
  subject: Property;
  comparables: AdjustedComparable[];
}

export function ComparableAdjustmentGrid({
  subject,
  comparables
}: ComparableAdjustmentGridProps) {
  const calculateTotalAdjustment = (comparable: AdjustedComparable) => {
    return Object.values(comparable.adjustments).reduce((sum, value) => sum + value, 0);
  };

  const getPercentageDiff = (value: number, baseValue: number) => {
    return ((value - baseValue) / baseValue) * 100;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium">Comparable Analysis Grid</h3>
        <p className="mt-1 text-sm text-gray-500">
          Subject Property: {subject.address}
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
                Original Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Net Adjustments
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Adjusted Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                % Diff from Subject
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {comparables.map((comp) => {
              const totalAdjustment = calculateTotalAdjustment(comp);
              const percentDiff = getPercentageDiff(comp.adjustedPrice, subject.price);
              
              return (
                <tr key={comp.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{comp.address}</div>
                    <div className="text-sm text-gray-500">{comp.county}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${comp.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      totalAdjustment >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {totalAdjustment >= 0 ? '+' : ''}${totalAdjustment.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                    ${comp.adjustedPrice.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center text-sm font-medium ${
                      Math.abs(percentDiff) <= 5 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {percentDiff >= 0 ? (
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 mr-1" />
                      )}
                      {Math.abs(percentDiff).toFixed(1)}%
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-6 bg-gray-50 border-t">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-500">Average Adjusted Price</p>
            <p className="text-lg font-semibold text-indigo-600">
              ${(comparables.reduce((sum, comp) => sum + comp.adjustedPrice, 0) / comparables.length).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Median Adjusted Price</p>
            <p className="text-lg font-semibold text-indigo-600">
              ${comparables.map(c => c.adjustedPrice).sort((a, b) => a - b)[Math.floor(comparables.length / 2)].toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Average Net Adjustment</p>
            <p className="text-lg font-semibold text-gray-900">
              {(comparables.reduce((sum, comp) => sum + Math.abs(calculateTotalAdjustment(comp)), 0) / comparables.length / comparables[0].price * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}