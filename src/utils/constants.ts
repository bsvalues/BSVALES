// Market Analysis Constants
export const TIME_RANGES = ['3 Months', '6 Months', '1 Year'] as const;

export const MARKET_METRICS = {
  MEDIAN_PRICE: 'Median Price',
  DAYS_ON_MARKET: 'Days on Market',
  ACTIVE_LISTINGS: 'Active Listings',
  PRICE_PER_SQFT: 'Price per Sq Ft'
} as const;

// Property Types
export const PROPERTY_TYPES = {
  RESIDENTIAL: 'residential',
  COMMERCIAL: 'commercial',
  LAND: 'land'
} as const;

// Counties
export const COUNTIES = {
  BENTON: 'benton',
  FRANKLIN: 'franklin',
  WALLA_WALLA: 'walla-walla',
  YAKIMA: 'yakima'
} as const;