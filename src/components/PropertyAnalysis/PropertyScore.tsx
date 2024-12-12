import React from 'react';
import { Award, TrendingUp, MapPin } from 'lucide-react';

interface PropertyScoreProps {
  score: {
    overall: number;
    location: number;
    condition: number;
    investment: number;
  };
}

export function PropertyScore({ score }: PropertyScoreProps) {
  const getScoreColor = (value: number) => {
    if (value >= 80) return 'text-green-600';
    if (value >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-4">
        <Award className="h-5 w-5 text-indigo-600 mr-2" />
        <h3 className="text-lg font-medium">Property Score</h3>
      </div>

      <div className="space-y-4">
        <div className="text-center">
          <div className={`text-4xl font-bold ${getScoreColor(score.overall)}`}>
            {score.overall}
          </div>
          <div className="text-sm text-gray-500 mt-1">Overall Score</div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <MapPin className="h-4 w-4 mx-auto text-gray-400 mb-1" />
            <div className={`font-semibold ${getScoreColor(score.location)}`}>
              {score.location}
            </div>
            <div className="text-xs text-gray-500">Location</div>
          </div>
          <div className="text-center">
            <Award className="h-4 w-4 mx-auto text-gray-400 mb-1" />
            <div className={`font-semibold ${getScoreColor(score.condition)}`}>
              {score.condition}
            </div>
            <div className="text-xs text-gray-500">Condition</div>
          </div>
          <div className="text-center">
            <TrendingUp className="h-4 w-4 mx-auto text-gray-400 mb-1" />
            <div className={`font-semibold ${getScoreColor(score.investment)}`}>
              {score.investment}
            </div>
            <div className="text-xs text-gray-500">Investment</div>
          </div>
        </div>
      </div>
    </div>
  );
}