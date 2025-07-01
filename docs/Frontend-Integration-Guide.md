# Frontend Integration Guide - Order Creation API

## 🎯 ORDER CREATION ENDPOINT

**Endpoint:** `POST /api/v1/orders`  
**Authentication:** Required (Bearer Token)

---

## 📋 REQUEST BODY STRUCTURE

### ✅ **CORRECT Data Structure**

```javascript
{
  "items": [
    {
      "productId": 1,           // Product ID from database
      "quantity": 2             // Quantity to order
    }
  ],
  "shipping": {
    "fullName": "John Doe",
    "address": "123 Main St",
    "city": "Nairobi",
    "state": "Nairobi",
    "zipCode": "00100",
    "country": "Kenya",
    "phone": "+254700000000"
  },
  "payment": {
    "method": "mpesa",          // "mpesa" | "cash" | "cod"
    "phone": "+254700000000"    // Required for M-Pesa only
  },
  "total": 1500.00             // ⚠️ PRODUCTS TOTAL ONLY (no delivery fees)
}
```

---

## 🚨 CRITICAL: TOTAL CALCULATION

### ❌ **WRONG - Don't Include Delivery Fees**

```javascript
// Frontend calculation (WRONG)
const productsTotal = 1200.00;
const deliveryFee = 300.00;
const totalWithDelivery = productsTotal + deliveryFee; // 1500.00

// Sending to backend (WRONG)
{
  "total": 1500.00  // ❌ Includes delivery fee
}
```

### ✅ **CORRECT - Products Total Only**

```javascript
// Frontend calculation (CORRECT)
const productsTotal = calculateProductsTotal(items);
// Don't add delivery fee to the total sent to backend

// Sending to backend (CORRECT)
{
  "total": 1200.00  // ✅ Products only, no delivery fee
}
```

---

## 📊 HOW TO CALCULATE PRODUCTS TOTAL

### Step 1: Fetch Current Product Prices

```javascript
// Get fresh prices from backend before calculating
const productIds = items.map((item) => item.productId);
const products = await fetch("/api/v1/products/batch", {
  method: "POST",
  body: JSON.stringify({ ids: productIds }),
});
```

### Step 2: Calculate Total Correctly

```javascript
function calculateProductsTotal(items, products) {
  let total = 0;

  items.forEach((item) => {
    const product = products.find((p) => p.id === item.productId);
    if (product) {
      total += product.price * item.quantity;
    }
  });

  return total;
}

// Example:
const items = [
  { productId: 1, quantity: 2 }, // Product price: 600.00
  { productId: 2, quantity: 1 }, // Product price: 300.00
];

// Calculation:
// Product 1: 600.00 × 2 = 1200.00
// Product 2: 300.00 × 1 = 300.00
// Total: 1200.00 + 300.00 = 1500.00

const total = 1500.0; // Send this to backend
```

---

## 🚚 DELIVERY FEE HANDLING

The **backend does NOT handle delivery fees** in the order total validation. Handle delivery fees separately on the frontend:

### Frontend Calculation Flow:

```javascript
// 1. Calculate products total (for backend)
const productsTotal = calculateProductsTotal(items, products);

// 2. Calculate delivery fee (frontend only)
const deliveryFee = calculateDeliveryFee(shippingAddress);

// 3. Calculate final total (frontend display only)
const finalTotal = productsTotal + deliveryFee;

// 4. Send ONLY products total to backend
const orderData = {
  items: items,
  shipping: shippingData,
  payment: paymentData,
  total: productsTotal, // ✅ Products only
};
```

### Display to User:

```html
<div class="order-summary">
  <div>Products Total: $1,500.00</div>
  <div>Delivery Fee: $300.00</div>
  <div class="total">Final Total: $1,800.00</div>
</div>
```

---

## 📝 COMPLETE FRONTEND EXAMPLE

```javascript
// Order Creation Function
async function createOrder(cartItems, shippingInfo, paymentInfo) {
  try {
    // 1. Get fresh product prices
    const productIds = cartItems.map((item) => item.productId);
    const products = await fetchProductPrices(productIds);

    // 2. Calculate products total (backend validation)
    const productsTotal = calculateProductsTotal(cartItems, products);

    // 3. Calculate delivery fee (frontend only)
    const deliveryFee = calculateDeliveryFee(shippingInfo);

    // 4. Show user the breakdown
    displayOrderSummary({
      productsTotal,
      deliveryFee,
      finalTotal: productsTotal + deliveryFee,
    });

    // 5. Create order (send products total only)
    const orderData = {
      items: cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      shipping: shippingInfo,
      payment: paymentInfo,
      total: productsTotal, // ✅ Products only
    };

    const response = await fetch("/api/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("Order creation failed");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Order creation error:", error);
    throw error;
  }
}
```

---

## 🔧 VALIDATION RULES

### Backend Validates:

- ✅ **Products exist** in database
- ✅ **Products total** matches calculation
- ✅ **Required fields** are present
- ✅ **Data types** are correct

### Frontend Should Validate:

- ✅ **Cart not empty**
- ✅ **Shipping info complete**
- ✅ **Payment method selected**
- ✅ **Fresh product prices** fetched
- ✅ **Total calculated correctly**

---

## 🚨 COMMON ERRORS & SOLUTIONS

### Error: "Order total mismatch"

**Cause:** Frontend including delivery fees in total  
**Solution:** Send products total only

### Error: "Some products no longer exist"

**Cause:** Product was deleted or discontinued  
**Solution:** Refresh cart and remove unavailable items

### Error: "Prices have changed"

**Cause:** Product prices updated since cart was loaded  
**Solution:** Fetch fresh prices and recalculate

### Error: "Invalid order total"

**Cause:** Total is 0, negative, or not a number  
**Solution:** Ensure total is a positive number

---

## 📊 DATA TYPES REFERENCE

```javascript
{
  "items": [                    // Array (required)
    {
      "productId": 1,           // Number (required)
      "quantity": 2             // Number > 0 (required)
    }
  ],
  "shipping": {                 // Object (required)
    "fullName": "string",       // String (required)
    "address": "string",        // String (required)
    "city": "string",           // String (required)
    "state": "string",          // String (optional)
    "zipCode": "string",        // String (optional)
    "country": "string",        // String (required)
    "phone": "string"           // String (required)
  },
  "payment": {                  // Object (required)
    "method": "string",         // "mpesa" | "cash" | "cod" (required)
    "phone": "string"           // String (required for mpesa only)
  },
  "total": 1500.00             // Number > 0 (required) - PRODUCTS ONLY
}
```

---

## 🧪 TESTING CHECKLIST

### Before Integration:

- [ ] Fetch fresh product prices
- [ ] Calculate products total correctly
- [ ] Handle delivery fees separately
- [ ] Validate all required fields
- [ ] Ensure correct data types

### Test Cases:

- [ ] Single item order
- [ ] Multiple items order
- [ ] M-Pesa payment
- [ ] Cash on delivery
- [ ] Price changes during checkout
- [ ] Product unavailable during checkout

---

## 📞 BACKEND RESPONSE

### Success Response:

```javascript
{
  "status": "success",
  "data": {
    "id": "order_id",
    "orderNumber": "MP1751318339649",
    "status": "PENDING",
    "total": 1500.00,
    "createdAt": "2025-07-01T10:30:00Z",
    "estimatedDelivery": "2025-07-03T10:30:00Z",
    "items": [...]
  },
  "message": "Order created successfully"
}
```

### Error Response:

```javascript
{
  "status": "error",
  "error": {
    "code": "PRICE_MISMATCH",
    "message": "Prices have changed. Please refresh your cart and try again."
  }
}
```

---

## 💡 BEST PRACTICES

1. **Always fetch fresh prices** before order creation
2. **Send products total only** - handle delivery fees on frontend
3. **Use proper data types** - numbers for IDs and amounts
4. **Validate on both sides** - frontend UX + backend security
5. **Handle errors gracefully** - show clear messages to users
6. **Test edge cases** - price changes, unavailable products

---

**Remember: The backend only validates PRODUCTS total. All additional fees (delivery, taxes, etc.) should be handled separately on the frontend!** 🎯
