import { Property } from '../types/property';

export function calculatePropertyScore(property: Property) {
  // In a real application, this would use more sophisticated calculations
  // based on various property attributes and market data
  return {
    overall: Math.floor(70 + Math.random() * 20),
    location: Math.floor(65 + Math.random() * 25),
    condition: Math.floor(75 + Math.random() * 15),
    investment: Math.floor(60 + Math.random() * 30)
  };
}

export function calculateInvestmentMetrics(property: Property) {
  // Mock calculations - in a real app, these would be based on actual data
  const annualRent = property.price * 0.08; // 8% annual rent
  const expenses = annualRent * 0.4; // 40% expenses
  const netIncome = annualRent - expenses;
  
  return {
    roi: (netIncome / property.price) * 100,
    capRate: (netIncome / property.price) * 100,
    cashFlow: netIncome / 12, // Monthly cash flow
    appreciation: 4.2 // Historical appreciation rate
  };
}