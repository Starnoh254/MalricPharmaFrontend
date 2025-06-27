// src/utils/currency.ts
// Utility functions for currency formatting and calculations

/**
 * Formats a number as Kenyan Shilling currency
 * @param amount - The amount to format
 * @param includeSymbol - Whether to include "Ksh" symbol (default: true)
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number,
  includeSymbol: boolean = true
): string => {
  const formattedAmount = Number(amount).toFixed(2);
  const withCommas = Number(formattedAmount).toLocaleString("en-KE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return includeSymbol ? `Ksh ${withCommas}` : withCommas;
};

/**
 * Safely adds two monetary amounts avoiding floating point precision issues
 * @param a - First amount
 * @param b - Second amount
 * @returns Precisely calculated sum
 */
export const addCurrency = (a: number, b: number): number => {
  return Number((a + b).toFixed(2));
};

/**
 * Safely multiplies monetary amounts avoiding floating point precision issues
 * @param amount - The base amount
 * @param multiplier - The multiplier (e.g., quantity)
 * @returns Precisely calculated product
 */
export const multiplyCurrency = (
  amount: number,
  multiplier: number
): number => {
  return Number((amount * multiplier).toFixed(2));
};

/**
 * Calculates cart total with precision
 * @param items - Array of cart items with price and quantity
 * @returns Precisely calculated total
 */
export const calculateCartTotal = (
  items: { price: number; quantity: number }[]
): number => {
  const total = items.reduce((acc, item) => {
    return addCurrency(acc, multiplyCurrency(item.price, item.quantity));
  }, 0);

  return Number(total.toFixed(2));
};

/**
 * Parses a currency string to number
 * @param currencyString - String like "Ksh 1,234.56" or "1,234.56"
 * @returns Parsed number
 */
export const parseCurrency = (currencyString: string): number => {
  const cleaned = currencyString.replace(/[^\d.]/g, "");
  return Number(cleaned) || 0;
};

/**
 * Validates if an amount is a valid monetary value
 * @param amount - The amount to validate
 * @returns True if valid, false otherwise
 */
export const isValidCurrencyAmount = (amount: number): boolean => {
  return !isNaN(amount) && isFinite(amount) && amount >= 0;
};
