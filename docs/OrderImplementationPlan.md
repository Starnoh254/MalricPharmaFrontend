# Order Implementation Plan: Frontend & Backend Flow

## Overview

This document outlines the complete order flow implementation for MalricPharma, covering both frontend user experience and backend processing after checkout completion.

## Current Implementation Status

### ✅ Completed Frontend Features

- **Checkout Page** with multi-step flow (Shipping → Payment → Confirmation)
- **Order API Service** with TypeScript interfaces
- **Order Confirmation Component** with success states
- **Cart Integration** with order placement
- **User Authentication** checks before checkout
- **Form Validation** for shipping and payment

### 🚧 To Be Implemented

- **Backend Order Processing** (API endpoints)
- **Order History/Management** (frontend pages)
- **Email Notifications** (backend service)
- **Admin Order Management** (admin dashboard)
- **Payment Gateway Integration** (M-Pesa, Card processing)

## Frontend Order Flow

### 1. Pre-Checkout Validation

```typescript
// Location: src/pages/CheckoutPage.tsx
// Validates before allowing checkout process

if (cartItems.length === 0 && !orderNumber) {
  navigate("/cart"); // Redirect if cart is empty
}

if (!isAuthenticated) {
  navigate("/login"); // Require authentication
}
```

### 2. Multi-Step Checkout Process

```
Step 1: Shipping Information
├── Full name, address, city, postal code
├── Phone, email
└── Optional delivery notes

Step 2: Payment Method
├── M-Pesa (phone number)
├── Credit/Debit Card (card details)
└── Cash on Delivery

Step 3: Order Confirmation
├── Review shipping & payment info
├── Accept terms and conditions
└── Place order
```

### 3. Order Placement (Frontend)

```typescript
// Location: src/pages/CheckoutPage.tsx - handleOrderConfirm()

const handleOrderConfirm = async () => {
  setIsLoading(true);
  try {
    const orderData: CreateOrderRequest = {
      items: cartItems,
      shipping: shippingInfo,
      payment: paymentInfo,
      total,
      userId: user?.id,
    };

    // API call to create order
    const order = await orderService.createOrder(orderData);

    setOrderNumber(order.orderNumber);
    clearCart(); // Clear cart after successful order
  } catch (error) {
    // Handle order failure
    showErrorToast("Order failed. Please try again.");
  } finally {
    setIsLoading(false);
  }
};
```

### 4. Order Success State

- **Order Number Display**: Unique identifier (e.g., MP1704067200000)
- **Success Message**: Confirmation of order placement
- **Next Actions**: View orders, continue shopping
- **Delivery Information**: Estimated 24-48 hours

## Backend Order Flow (To Be Implemented)

### 1. Order Creation Endpoint

```typescript
// POST /api/orders
// Processes incoming order from frontend

interface CreateOrderRequest {
  items: OrderItem[];
  shipping: ShippingInfo;
  payment: PaymentInfo;
  total: number;
  userId: number;
}

interface OrderResponse {
  id: string;
  orderNumber: string; // Format: MP{timestamp}
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered";
  total: number;
  createdAt: string;
  estimatedDelivery: string;
}
```

### 2. Order Processing Workflow

```
1. Order Validation
   ├── Verify user authentication
   ├── Validate cart items (availability, pricing)
   ├── Check inventory levels
   └── Validate payment method

2. Order Storage
   ├── Generate unique order number
   ├── Save order to database
   ├── Store order items with snapshot pricing
   ├── Record shipping & payment details
   └── Set initial status as "pending"

3. Payment Processing
   ├── M-Pesa: Initiate STK push
   ├── Card: Process through payment gateway
   ├── Cash on Delivery: Mark as confirmed
   └── Update order status based on payment result

4. Post-Payment Actions
   ├── Update inventory levels
   ├── Generate order confirmation
   ├── Send customer email notification
   ├── Notify admin/pharmacy staff
   └── Update order status to "confirmed"
```

### 3. Database Schema (Recommended)

```sql
-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(20) UNIQUE NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id),
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  total_amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  estimated_delivery DATE,

  -- Shipping information (JSON or separate table)
  shipping_info JSONB NOT NULL,

  -- Payment information (store safely)
  payment_method VARCHAR(20) NOT NULL,
  payment_status VARCHAR(20) DEFAULT 'pending',
  payment_reference VARCHAR(100),

  -- Additional fields
  notes TEXT,
  admin_notes TEXT
);

-- Order items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id VARCHAR(50) NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  quantity INTEGER NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  product_snapshot JSONB -- Store product details at time of order
);

-- Order status history
CREATE TABLE order_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL,
  changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  changed_by INTEGER REFERENCES users(id),
  notes TEXT
);
```

## API Endpoints (To Be Implemented)

### Customer Endpoints

```typescript
// Order Management
POST   /api/orders                    // Create new order
GET    /api/orders/user/:userId       // Get user's orders
GET    /api/orders/:orderId           // Get specific order
GET    /api/orders/track/:orderNumber // Track order by number
PATCH  /api/orders/:orderId/cancel    // Cancel order (if allowed)

// Order Status
GET    /api/orders/:orderId/status    // Get order status
GET    /api/orders/:orderId/history   // Get status history
```

### Admin Endpoints

```typescript
// Order Management
GET    /api/admin/orders              // Get all orders (paginated)
GET    /api/admin/orders/:orderId     // Get order details
PATCH  /api/admin/orders/:orderId     // Update order
DELETE /api/admin/orders/:orderId     // Delete order

// Status Management
PATCH  /api/admin/orders/:orderId/status     // Update order status
POST   /api/admin/orders/:orderId/notes      // Add admin notes

// Reports
GET    /api/admin/orders/stats        // Order statistics
GET    /api/admin/orders/export       // Export orders
```

## Frontend Features to Implement

### 1. Order History Page

```typescript
// src/pages/OrderHistory.tsx
// Display user's past and current orders

interface OrderHistoryProps {
  orders: OrderResponse[];
  loading: boolean;
  onOrderClick: (orderId: string) => void;
}
```

### 2. Order Details Page

```typescript
// src/pages/OrderDetails.tsx
// Detailed view of specific order

interface OrderDetailsProps {
  orderId: string;
  order: OrderResponse;
  onTrackOrder: () => void;
  onCancelOrder: () => void;
}
```

### 3. Order Tracking Component

```typescript
// src/components/OrderTracking.tsx
// Visual progress indicator for order status

interface OrderTrackingProps {
  status: OrderStatus;
  statusHistory: OrderStatusHistoryItem[];
  estimatedDelivery: string;
}
```

## Email Notification System

### 1. Customer Notifications

```typescript
// Order confirmation email
interface OrderConfirmationEmail {
  to: string;
  orderNumber: string;
  items: OrderItem[];
  total: number;
  shipping: ShippingInfo;
  estimatedDelivery: string;
}

// Status update emails
interface StatusUpdateEmail {
  to: string;
  orderNumber: string;
  newStatus: OrderStatus;
  trackingUrl?: string;
  additionalInfo?: string;
}
```

### 2. Admin Notifications

```typescript
// New order notification to pharmacy staff
interface NewOrderNotification {
  orderNumber: string;
  customerInfo: {
    name: string;
    phone: string;
    email: string;
  };
  items: OrderItem[];
  total: number;
  paymentMethod: string;
  urgency: "normal" | "prescription" | "urgent";
}
```

## Payment Integration

### 1. M-Pesa Integration

```typescript
// M-Pesa STK Push implementation
interface MpesaPayment {
  phone: string;
  amount: number;
  orderNumber: string;
  callbackUrl: string;
}

// Process M-Pesa payment
const processMpesaPayment = async (payment: MpesaPayment) => {
  // Implement M-Pesa Daraja API integration
  // Handle STK push and callback verification
};
```

### 2. Card Payment Integration

```typescript
// Credit/Debit card processing
interface CardPayment {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  amount: number;
  orderNumber: string;
}

// Integration with payment gateway (e.g., Stripe, Flutterwave)
```

## Security Considerations

### 1. Data Protection

- **PII Encryption**: Encrypt sensitive customer data
- **Payment Security**: Never store full card details
- **Secure Transmission**: Use HTTPS for all API calls
- **Data Retention**: Implement data cleanup policies

### 2. Order Validation

- **Authentication**: Verify user identity
- **Authorization**: Ensure users can only access their orders
- **Input Validation**: Sanitize all order inputs
- **Fraud Detection**: Monitor for suspicious patterns

## Error Handling

### 1. Frontend Error States

```typescript
// Order placement errors
interface OrderError {
  type: "validation" | "payment" | "inventory" | "network" | "server";
  message: string;
  retryable: boolean;
  details?: any;
}

// Error handling in CheckoutPage
const handleOrderError = (error: OrderError) => {
  switch (error.type) {
    case "payment":
      showErrorToast("Payment failed. Please try again.");
      break;
    case "inventory":
      showErrorToast("Some items are no longer available.");
      updateCartFromServer(); // Refresh cart
      break;
    case "validation":
      showErrorToast("Please check your information and try again.");
      break;
    default:
      showErrorToast("Order failed. Please try again later.");
  }
};
```

### 2. Backend Error Responses

```typescript
// Standardized error responses
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}

// Common error codes
const ORDER_ERRORS = {
  INVALID_ITEMS: "INVALID_ITEMS",
  INSUFFICIENT_INVENTORY: "INSUFFICIENT_INVENTORY",
  PAYMENT_FAILED: "PAYMENT_FAILED",
  USER_NOT_FOUND: "USER_NOT_FOUND",
  ORDER_NOT_FOUND: "ORDER_NOT_FOUND",
  UNAUTHORIZED: "UNAUTHORIZED",
} as const;
```

## Testing Strategy

### 1. Frontend Testing

```typescript
// Test checkout flow
describe("Checkout Flow", () => {
  test("should complete checkout with valid data", async () => {
    // Mock order service
    // Test multi-step form submission
    // Verify order confirmation display
  });

  test("should handle payment failures gracefully", async () => {
    // Mock payment failure
    // Verify error handling
    // Ensure cart is not cleared on failure
  });
});
```

### 2. Backend Testing

```typescript
// Test order creation
describe("Order API", () => {
  test("should create order with valid data", async () => {
    // Test order creation endpoint
    // Verify database storage
    // Check email notifications
  });

  test("should validate inventory before creating order", async () => {
    // Test inventory validation
    // Verify error responses
  });
});
```

## Performance Considerations

### 1. Frontend Optimizations

- **Lazy Loading**: Load order history on demand
- **Caching**: Cache user order data
- **Pagination**: Implement pagination for order lists
- **Optimistic Updates**: Update UI before API confirmation

### 2. Backend Optimizations

- **Database Indexing**: Index frequently queried fields
- **Caching**: Cache order data for repeat requests
- **Queue Processing**: Use queues for email notifications
- **Database Optimization**: Optimize queries for order retrieval

## Implementation Priority

### Phase 1: Core Backend Implementation

1. **Database Setup**: Create tables and indexes
2. **Order Creation API**: Implement order creation endpoint
3. **Order Retrieval API**: Implement order fetching endpoints
4. **Basic Status Management**: Order status updates

### Phase 2: Payment Integration

1. **M-Pesa Integration**: Implement STK push and callbacks
2. **Card Payment**: Integrate with payment gateway
3. **Payment Validation**: Verify payments before confirming orders

### Phase 3: Frontend Enhancement

1. **Order History Page**: Display user's orders
2. **Order Details Page**: Detailed order view
3. **Order Tracking**: Status progress indicator
4. **Error Handling**: Comprehensive error states

### Phase 4: Advanced Features

1. **Email Notifications**: Automated email system
2. **Admin Dashboard**: Order management interface
3. **Analytics**: Order reporting and insights
4. **Advanced Filtering**: Search and filter orders

## Monitoring and Analytics

### 1. Order Metrics

- **Conversion Rate**: Checkout completion rate
- **Average Order Value**: Revenue per order
- **Payment Success Rate**: Payment completion rate
- **Delivery Performance**: On-time delivery metrics

### 2. Error Monitoring

- **Failed Orders**: Track and analyze order failures
- **Payment Failures**: Monitor payment issues
- **API Performance**: Track response times and errors
- **User Experience**: Monitor checkout abandonment

## Conclusion

This implementation plan provides a comprehensive roadmap for completing the order flow in MalricPharma. The phased approach ensures core functionality is prioritized while building toward a full-featured order management system.

Key next steps:

1. Implement backend order creation API
2. Integrate payment processing
3. Build order history frontend
4. Set up email notification system
5. Implement comprehensive testing

The current frontend foundation provides a solid base for these backend implementations and additional features.
