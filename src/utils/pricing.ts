// src/utils/pricing.ts
// Pricing utilities and constants

export const DELIVERY_FEE = 200; // KSh 200 standard delivery fee
export const FREE_DELIVERY_THRESHOLD = 2000; // Free delivery on orders over KSh 2000

/**
 * Calculate the total order amount including delivery fee
 * NOTE: This is for FRONTEND DISPLAY ONLY. Backend only validates products total.
 * @param subtotal - The cart subtotal (items only)
 * @returns The grand total including delivery fee (for display)
 */
export const calculateOrderTotal = (subtotal: number): number => {
  // Apply free delivery if subtotal meets threshold
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  return subtotal + deliveryFee;
};

/**
 * Get the delivery fee for a given subtotal
 * @param subtotal - The cart subtotal (items only)
 * @returns The delivery fee amount
 */
export const getDeliveryFee = (subtotal: number): number => {
  return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
};
