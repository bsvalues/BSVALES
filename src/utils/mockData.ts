// Update mockData.ts to include property history
export const mockPropertyHistory = [
  {
    id: '1',
    type: 'sale',
    date: '2024-02-15',
    description: 'Property Sold',
    value: 450000,
    change: 5.2
  },
  {
    id: '2',
    type: 'assessment',
    date: '2023-11-01',
    description: 'Annual Tax Assessment',
    value: 428000,
    change: 3.1
  },
  {
    id: '3',
    type: 'listing',
    date: '2023-10-15',
    description: 'Listed for Sale',
    value: 455000
  },
  {
    id: '4',
    type: 'sale',
    date: '2020-06-20',
    description: 'Previous Sale',
    value: 380000,
    change: null
  }
];

// Add more mock properties with detailed information
export const mockProperties = [
  {
    id: '1',
    address: '123 Main St, Kennewick',
    county: 'Benton',
    type: 'Residential',
    price: 450000,
    imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80',
    history: mockPropertyHistory,
    squareFeet: 2400,
    yearBuilt: 2015,
    bedrooms: 4,
    bathrooms: 2.5
  },
  // ... existing properties
];