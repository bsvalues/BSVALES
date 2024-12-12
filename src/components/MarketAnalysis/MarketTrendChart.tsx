import React, { useState } from 'react';
import { Calendar, ArrowUpRight } from 'lucide-react';

interface TrendData {
  date: string;
  value: number;
}

interface MarketTrendChartProps {
  data: TrendData[];
  title: string;
  timeRanges: string[];
}

export function MarketTrendChart({ data, title, timeRanges }: MarketTrendChartProps) {
  const [selectedRange, setSelectedRange] = useState(timeRanges[0]);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <ArrowUpRight className="h-5 w-5 text-indigo-600 mr-2" />
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
        <select
          value={selectedRange}
          onChange={(e) => setSelectedRange(e.target.value)}
          className="text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          {timeRanges.map((range) => (
            <option key={range} value={range}>{range}</option>
          ))}
        </select>
      </div>

      <div className="relative h-64">
        {/* Chart visualization would go here */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          <Calendar className="h-5 w-5 mr-2" />
          <span>Chart visualization coming soon</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Highest Value</p>
          <p className="text-lg font-semibold text-indigo-600">
            ${Math.max(...data.map(d => d.value)).toLocaleString()}
          </p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Average Value</p>
          <p className="text-lg font-semibold text-indigo-600">
            ${(data.reduce((acc, curr) => acc + curr.value, 0) / data.length).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}