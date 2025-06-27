// src/api/orders.ts
// Example API service using the configured axios instance

import { api } from "../utils/axios";
import type { ServerResponse } from "../types/api";
import { handleServerResponse } from "../types/api";
import type { ShippingInfo, PaymentInfo } from "../pages/CheckoutPage";

// Types for order API
export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface CreateOrderRequest {
  items: OrderItem[];
  shipping: ShippingInfo;
  payment: PaymentInfo;
  total: number;
  userId: number;
}

export interface OrderResponse {
  id: string;
  orderNumber: string;
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered";
  total: number;
  createdAt: string;
  estimatedDelivery: string;
}

// Order API service
export const orderService = {
  // Create a new order
  async createOrder(orderData: CreateOrderRequest): Promise<OrderResponse> {
    const response = await api.post<ServerResponse<OrderResponse>>(
      "/orders",
      orderData
    );
    return handleServerResponse(response.data);
  },

  // Get user's orders
  async getUserOrders(userId: number): Promise<OrderResponse[]> {
    const response = await api.get<ServerResponse<OrderResponse[]>>(
      `/orders/user/${userId}`
    );
    return handleServerResponse(response.data);
  },

  // Get specific order by ID
  async getOrder(orderId: string): Promise<OrderResponse> {
    const response = await api.get<ServerResponse<OrderResponse>>(
      `/orders/${orderId}`
    );
    return handleServerResponse(response.data);
  },

  // Cancel an order
  async cancelOrder(orderId: string): Promise<void> {
    const response = await api.patch<ServerResponse<{ message: string }>>(
      `/orders/${orderId}/cancel`
    );
    handleServerResponse(response.data); // Validate response but don't return anything
  },

  // Track order status
  async trackOrder(orderNumber: string): Promise<OrderResponse> {
    const response = await api.get<ServerResponse<OrderResponse>>(
      `/orders/track/${orderNumber}`
    );
    return handleServerResponse(response.data);
  },
};
