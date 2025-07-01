// src/api/orders.ts
// Order API service using the configured axios instance

import { api } from "../utils/axios";
import type { ServerResponse } from "../types/api";
import { handleServerResponse } from "../types/api";

// Types based on API documentation
export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface ShippingInfo {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  email?: string;
  notes?: string;
}

export interface PaymentInfo {
  method: "mpesa" | "card" | "cod";
  phone?: string; // Required for M-Pesa
  cardToken?: string; // Required for card payments
}

export interface CreateOrderRequest {
  items: OrderItem[];
  shipping: ShippingInfo;
  payment: PaymentInfo;
  total: number; // Products total only (no delivery fees) - backend validates this
}

export interface OrderResponse {
  id: string;
  orderNumber: string;
  status:
    | "PENDING"
    | "CONFIRMED"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED";
  total: number;
  createdAt: string;
  estimatedDelivery: string;
  itemCount?: number;
  items?: Array<{
    id: string;
    productId: number;
    productName: string;
    productDescription?: string;
    quantity: number;
    price: number;
    subtotal: number;
    imageUrl?: string;
  }>;
  shipping?: ShippingInfo;
  payment?: PaymentInfo & { status?: string };
  statusHistory?: Array<{
    status: string;
    timestamp: string;
  }>;
  updatedAt?: string;
}

export interface OrdersListResponse {
  orders: OrderResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Order API service
export const orderService = {
  // Create a new order
  async createOrder(orderData: CreateOrderRequest): Promise<OrderResponse> {
    console.log("Order API: Sending request with data:", orderData);

    const response = await api.post<ServerResponse<OrderResponse>>(
      "/orders",
      orderData
    );

    console.log("Order API: Raw server response:", response.data);

    const result = handleServerResponse(response.data);
    console.log("Order API: Parsed result:", result);

    return result;
  },

  // Get user's orders with pagination
  async getUserOrders(
    page: number = 1,
    limit: number = 10,
    status?: string
  ): Promise<OrdersListResponse> {
    let url = `/orders?page=${page}&limit=${limit}`;
    if (status) {
      url += `&status=${status}`;
    }

    const response = await api.get<ServerResponse<OrdersListResponse>>(url);
    return handleServerResponse(response.data);
  },

  // Get specific order by ID
  async getOrder(orderId: string): Promise<OrderResponse> {
    const response = await api.get<ServerResponse<{ order: OrderResponse }>>(
      `/orders/${orderId}`
    );
    const result = handleServerResponse(response.data);
    return result.order;
  },

  // Cancel an order
  async cancelOrder(orderId: string): Promise<OrderResponse> {
    const response = await api.delete<ServerResponse<{ order: OrderResponse }>>(
      `/orders/${orderId}`
    );
    const result = handleServerResponse(response.data);
    return result.order;
  },

  // Track order by order number (alternative method)
  async trackOrder(orderNumber: string): Promise<OrderResponse> {
    const response = await api.get<ServerResponse<{ order: OrderResponse }>>(
      `/orders/track/${orderNumber}`
    );
    const result = handleServerResponse(response.data);
    return result.order;
  },
};
