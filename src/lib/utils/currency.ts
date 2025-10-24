// lib/utils/currency.ts
// Utility functions for currency formatting

/**
 * Format currency in Nigerian Naira
 * @param amount - The amount to format
 * @param options - Additional formatting options
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number | string, 
  options?: {
    currency?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }
): string {
  // Convert string to number if needed
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  // Handle invalid numbers
  if (isNaN(numericAmount)) {
    return '₦0.00';
  }
  
  // Default options
  const defaultOptions = {
    currency: 'NGN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options
  };
  
  // Format currency using Intl.NumberFormat for proper localization
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: defaultOptions.currency,
    minimumFractionDigits: defaultOptions.minimumFractionDigits,
    maximumFractionDigits: defaultOptions.maximumFractionDigits,
  }).format(numericAmount);
}

/**
 * Format currency without decimal places for whole numbers
 * @param amount - The amount to format
 * @returns Formatted currency string
 */
export function formatCurrencyCompact(amount: number | string): string {
  // Convert string to number if needed
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  // Handle invalid numbers
  if (isNaN(numericAmount)) {
    return '₦0';
  }
  
  // For whole numbers, don't show decimals
  if (Number.isInteger(numericAmount)) {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numericAmount);
  }
  
  // For numbers with decimals, show 2 decimal places
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericAmount);
}

/**
 * Format currency with thousand separators only (no currency symbol)
 * @param amount - The amount to format
 * @returns Formatted number string with thousand separators
 */
export function formatNumber(amount: number | string): string {
  // Convert string to number if needed
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  // Handle invalid numbers
  if (isNaN(numericAmount)) {
    return '0';
  }
  
  // Format number with thousand separators
  return new Intl.NumberFormat('en-NG').format(numericAmount);
}

/**
 * Parse currency string back to number
 * @param currencyString - Currency string to parse
 * @returns Parsed number
 */
export function parseCurrency(currencyString: string): number {
  // Remove currency symbols and commas
  const cleanString = currencyString.replace(/[₦₦$,]/g, '').trim();
  
  // Parse to float
  const parsed = parseFloat(cleanString);
  
  // Return 0 for invalid numbers
  return isNaN(parsed) ? 0 : parsed;
}

// Export default function for backward compatibility
export default formatCurrency;