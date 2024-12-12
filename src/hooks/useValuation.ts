import { useState, useEffect } from 'react';
import { Property } from '../types/property';

interface Comparable {
  id: string;
  address: string;
  price: number;
  soldDate: string;
}

interface ValuationResult {
  estimatedValue: number;
  confidence: number;
  comparables: Comparable[];
}

export function useValuation(property: Property): ValuationResult {
  const [result, setResult] = useState<ValuationResult>({
    estimatedValue: property.price,
    confidence: 85,
    comparables: [
      {
        id: '1',
        address: '456 Nearby St',
        price: property.price * 0.95,
        soldDate: '2 months ago'
      },
      {
        id: '2',
        address: '789 Similar Ave',
        price: property.price * 1.05,
        soldDate: '1 month ago'
      },
      {
        id: '3',
        address: '321 Comparable Ln',
        price: property.price * 0.98,
        soldDate: '3 months ago'
      }
    ]
  });

  useEffect(() => {
    // In a real application, this would make an API call to get the valuation
    // For now, we'll just use mock data based on the property price
    setResult({
      ...result,
      estimatedValue: property.price * (0.95 + Math.random() * 0.1)
    });
  }, [property]);

  return result;
}