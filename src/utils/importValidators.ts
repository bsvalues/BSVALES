import { Property } from '../types/property';

export const validatePropertyData = (data: Partial<Property>): string[] => {
  const errors: string[] = [];

  // Required fields
  if (!data.address?.trim()) errors.push('Property address is required');
  if (!data.county?.trim()) errors.push('County is required');
  if (!data.price || data.price <= 0) errors.push('Valid price is required');
  if (!data.type?.trim()) errors.push('Property type is required');

  // Numeric validations
  if (data.squareFeet && data.squareFeet <= 0) {
    errors.push('Square footage must be greater than 0');
  }
  
  if (data.yearBuilt) {
    const currentYear = new Date().getFullYear();
    if (data.yearBuilt < 1800 || data.yearBuilt > currentYear) {
      errors.push(`Year built must be between 1800 and ${currentYear}`);
    }
  }

  // County validation
  const validCounties = ['benton', 'franklin', 'walla walla', 'yakima'];
  if (data.county && !validCounties.includes(data.county.toLowerCase())) {
    errors.push('Invalid county. Must be one of: Benton, Franklin, Walla Walla, or Yakima');
  }

  return errors;
};

export const validateFileType = (file: File): boolean => {
  const validTypes = ['text/csv', 'application/json', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
  return validTypes.includes(file.type);
};