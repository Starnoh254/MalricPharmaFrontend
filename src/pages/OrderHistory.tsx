// src/pages/OrderHistory.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Package, Eye, Truck, Clock, CheckCircle, XCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { orderService, type OrderResponse } from "../api/orders";
import { formatCurrency } from "../utils/currency";
import MainLayout from "../components/MainLayout";

export default function OrderHistory() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.id) {
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const userOrders = await orderService.getUserOrders(user.id);
        setOrders(userOrders);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Failed to load your orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchOrders();
    }
  }, [user?.id]);

  const refetchOrders = async () => {
    if (!user?.id) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const userOrders = await orderService.getUserOrders(user.id);
      setOrders(userOrders);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError("Failed to load your orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: OrderResponse["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "confirmed":
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case "processing":
        return <Package className="w-4 h-4 text-blue-600" />;
      case "shipped":
        return <Truck className="w-4 h-4 text-green-500" />;
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      default:
        return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusText = (status: OrderResponse["status"]) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "confirmed":
        return "Confirmed";
      case "processing":
        return "Processing";
      case "shipped":
        return "Shipped";
      case "delivered":
        return "Delivered";
      default:
        return "Unknown";
    }
  };

  const getStatusColor = (status: OrderResponse["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-green-100 text-green-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleViewOrder = (orderId: string) => {
    navigate(`/orders/${orderId}`);
  };

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                My Orders
              </h1>
              <p className="text-gray-600">
                Track and manage your pharmaceutical orders
              </p>
            </div>

            {loading ? (
              <div className="bg-white rounded-lg shadow-sm p-8">
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-2 text-gray-600">
                    Loading your orders...
                  </span>
                </div>
              </div>
            ) : error ? (
              <div className="bg-white rounded-lg shadow-sm p-8">
                <div className="text-center">
                  <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Unable to Load Orders
                  </h3>
                  <p className="text-gray-600 mb-4">{error}</p>
                  <button
                    onClick={refetchOrders}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8">
                <div className="text-center">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No Orders Yet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    You haven't placed any orders yet. Start shopping to see
                    your orders here.
                  </p>
                  <button
                    onClick={() => navigate("/products")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200"
                  >
                    Start Shopping
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div className="flex items-center mb-2 sm:mb-0">
                        <Package className="w-5 h-5 text-gray-400 mr-2" />
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            Order #{order.orderNumber}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Placed on {formatDate(order.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          <span className="ml-1">
                            {getStatusText(order.status)}
                          </span>
                        </span>

                        <span className="font-semibold text-gray-900">
                          {formatCurrency(order.total)}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-sm text-gray-600 mb-3 sm:mb-0">
                          {order.estimatedDelivery && (
                            <p>
                              <Truck className="w-4 h-4 inline mr-1" />
                              Estimated delivery:{" "}
                              {formatDate(order.estimatedDelivery)}
                            </p>
                          )}
                        </div>

                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewOrder(order.id)}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </button>

                          {order.status === "shipped" && (
                            <button
                              onClick={() =>
                                navigate(`/orders/track/${order.orderNumber}`)
                              }
                              className="inline-flex items-center px-3 py-2 border border-blue-300 rounded-md text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
                            >
                              <Truck className="w-4 h-4 mr-1" />
                              Track Order
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
