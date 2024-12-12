import { useState, useEffect } from 'react';
import { Property } from '../types/property';
import { calculatePropertyScore } from '../utils/propertyAnalysis';

interface PropertyAnalysis {
  score: {
    overall: number;
    location: number;
    condition: number;
    investment: number;
  };
  trends: Array<{
    period: string;
    value: number;
    change: number;
  }>;
  investmentMetrics: {
    roi: number;
    capRate: number;
    cashFlow: number;
    appreciation: number;
  };
}

export function usePropertyAnalysis(property: Property): PropertyAnalysis {
  const [analysis, setAnalysis] = useState<PropertyAnalysis>({
    score: {
      overall: 0,
      location: 0,
      condition: 0,
      investment: 0
    },
    trends: [],
    investmentMetrics: {
      roi: 0,
      capRate: 0,
      cashFlow: 0,
      appreciation: 0
    }
  });

  useEffect(() => {
    // In a real application, this would fetch data from an API
    // For now, we'll use mock data
    const mockAnalysis: PropertyAnalysis = {
      score: calculatePropertyScore(property),
      trends: [
        { period: '1M', value: property.price * 0.98, change: -2 },
        { period: '3M', value: property.price * 0.95, change: -5 },
        { period: '6M', value: property.price * 1.02, change: 2 },
        { period: '1Y', value: property.price * 1.08, change: 8 }
      ],
      investmentMetrics: {
        roi: 12.5,
        capRate: 5.8,
        cashFlow: 1500,
        appreciation: 4.2
      }
    };

    setAnalysis(mockAnalysis);
  }, [property]);

  return analysis;
}