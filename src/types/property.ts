// Update property.ts with new types
export interface PropertyEvent {
  id: string;
  type: 'sale' | 'listing' | 'assessment' | 'other';
  date: string;
  description: string;
  value?: number;
  change?: number | null;
}

export interface Property {
  id: string;
  address: string;
  county: string;
  type: string;
  price: number;
  imageUrl: string;
  history?: PropertyEvent[];
  squareFeet?: number;
  yearBuilt?: number;
  bedrooms?: number;
  bathrooms?: number;
  marketMetrics?: MarketMetric[];
}

export interface MarketMetric {
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  description?: string;
}