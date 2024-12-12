import { Property } from '../types/property';

export function transformPropertyData(
  rawData: any,
  mappings: Record<string, string>
): Partial<Property> {
  const transformed: Partial<Property> = {};

  Object.entries(mappings).forEach(([targetField, sourceField]) => {
    if (sourceField in rawData) {
      let value = rawData[sourceField];

      // Type conversions
      switch (targetField) {
        case 'price':
        case 'squareFeet':
          value = parseFloat(value);
          break;
        case 'yearBuilt':
        case 'bedrooms':
        case 'bathrooms':
          value = parseInt(value, 10);
          break;
      }

      transformed[targetField as keyof Property] = value;
    }
  });

  return transformed;
}

export function validatePropertyData(data: Partial<Property>): string[] {
  const errors: string[] = [];

  // Required fields
  if (!data.address) errors.push('Property address is required');
  if (!data.county) errors.push('County is required');
  if (!data.price) errors.push('Price is required');
  if (!data.type) errors.push('Property type is required');

  // Numeric validations
  if (data.price && data.price <= 0) errors.push('Price must be greater than 0');
  if (data.squareFeet && data.squareFeet <= 0) errors.push('Square footage must be greater than 0');
  if (data.yearBuilt && (data.yearBuilt < 1800 || data.yearBuilt > new Date().getFullYear())) {
    errors.push('Invalid year built');
  }

  return errors;
}