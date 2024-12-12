import axios from 'axios';
import { Property, MarketMetric, PropertyEvent } from '../types/property';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const propertyService = {
  async getProperties(filters?: Record<string, any>): Promise<Property[]> {
    const { data } = await api.get('/properties', { params: filters });
    return data;
  },

  async getPropertyDetails(id: string): Promise<Property> {
    const { data } = await api.get(`/properties/${id}`);
    return data;
  },

  async getMarketMetrics(county?: string): Promise<MarketMetric[]> {
    const { data } = await api.get('/market-metrics', { params: { county } });
    return data;
  },

  async getPropertyHistory(id: string): Promise<PropertyEvent[]> {
    const { data } = await api.get(`/properties/${id}/history`);
    return data;
  }
};

export const valuationService = {
  async getValuation(propertyId: string): Promise<{
    estimatedValue: number;
    confidence: number;
    comparables: Property[];
  }> {
    const { data } = await api.get(`/valuations/${propertyId}`);
    return data;
  },

  async generateReport(propertyId: string, sections: string[]): Promise<string> {
    const { data } = await api.post(`/reports/${propertyId}`, { sections });
    return data.reportUrl;
  }
};

export const marketAnalysisService = {
  async getTrends(params: {
    county?: string;
    timeRange: string;
    metric: string;
  }): Promise<Array<{ date: string; value: number }>> {
    const { data } = await api.get('/market-trends', { params });
    return data;
  },

  async getInsights(county?: string): Promise<Array<{
    id: string;
    type: 'positive' | 'negative' | 'neutral';
    title: string;
    description: string;
    change?: number;
  }>> {
    const { data } = await api.get('/market-insights', { params: { county } });
    return data;
  }
};