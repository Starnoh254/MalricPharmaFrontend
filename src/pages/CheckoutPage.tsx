import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { orderService } from "../api/orders";
import type { ShippingInfo, PaymentInfo } from "../api/orders";
import { calculateOrderTotal, getDeliveryFee } from "../utils/pricing";
import OrderSummary from "../components/checkout/OrderSummary";
import ShippingForm from "../components/checkout/ShippingForm";
import PaymentForm from "../components/checkout/PaymentForm";
import OrderConfirmation from "../components/checkout/OrderConfirmation";
import CheckoutSteps from "../components/checkout/CheckoutSteps";

type CheckoutStep = "shipping" | "payment" | "confirmation";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, total, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();

  // Delivery fee calculation (frontend only - not sent to backend)
  const deliveryFee = getDeliveryFee(total);
  const grandTotal = calculateOrderTotal(total); // For display purposes only

  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping");
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: user?.name || "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    email: user?.email || "",
    notes: "",
  });
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: "mpesa",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [orderItems, setOrderItems] = useState<typeof cartItems>([]);

  // Redirect if cart is empty
  if (cartItems.length === 0 && !orderNumber) {
    navigate("/cart");
    return null;
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const handleShippingSubmit = (shipping: ShippingInfo) => {
    setShippingInfo(shipping);
    setCurrentStep("payment");
  };

  const handlePaymentSubmit = (payment: PaymentInfo) => {
    setPaymentInfo(payment);
    setCurrentStep("confirmation");
  };

  const handleOrderConfirm = async () => {
    setIsLoading(true);
    try {
      // Create order data according to API documentation
      const orderData = {
        items: cartItems.map((item) => ({
          productId: parseInt(item.id), // Convert string ID to number
          quantity: item.quantity,
          price: item.price,
        })),
        shipping: shippingInfo,
        payment: paymentInfo,
        total: total, // ✅ Products total only (no delivery fee) - as per backend API spec
      };

      console.log("Creating order with data:", orderData);
      console.log(
        `Products total: ${total}, Delivery fee: ${deliveryFee}, Grand total: ${grandTotal}`
      );
      console.log(
        "ℹ️  Note: Backend only validates products total. Delivery fee handled on frontend."
      );

      // Call the order API service
      const order = await orderService.createOrder(orderData);

      console.log("Order created successfully: ", order);
      setOrderNumber(order.orderNumber);

      // Save order items for confirmation display
      setOrderItems([...cartItems]);

      // Don't clear cart immediately - wait for user to navigate away
      // Cart will be cleared when user goes to order history or home

      // Show success toast
      console.log("Order placed successfully!");
    } catch (error) {
      console.error("Order failed - Full error object:", error);
      console.error(
        "Error message:",
        error instanceof Error ? error.message : "Unknown error"
      );
      console.error(
        "Error stack:",
        error instanceof Error ? error.stack : "No stack trace"
      );

      // Handle different types of errors based on API documentation
      if (error instanceof Error) {
        if (error.message.includes("PRICE_MISMATCH")) {
          alert(
            "Product prices have changed. Please review your cart and try again."
          );
        } else if (error.message.includes("PRODUCT_NOT_FOUND")) {
          alert(
            "Some items in your cart are no longer available. Please review your cart and try again."
          );
        } else if (error.message.includes("INVALID_PAYMENT")) {
          alert(
            "Payment information is invalid. Please check your payment details and try again."
          );
        } else if (error.message.includes("INVALID_SHIPPING")) {
          alert(
            "Shipping information is incomplete. Please check your shipping details."
          );
        } else {
          alert("Order failed. Please try again.");
        }
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackStep = () => {
    if (currentStep === "payment") {
      setCurrentStep("shipping");
    } else if (currentStep === "confirmation") {
      setCurrentStep("payment");
    }
  };

  // Navigation handlers that clear cart after successful order
  const handleGoToOrders = () => {
    clearCart(); // Clear cart when navigating to order history
    navigate("/orders");
  };

  const handleContinueShopping = () => {
    clearCart(); // Clear cart when continuing to shop
    navigate("/products");
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

            {/* Progress Steps */}
            <CheckoutSteps currentStep={currentStep} />

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  {currentStep === "shipping" && (
                    <ShippingForm
                      initialData={shippingInfo}
                      onSubmit={handleShippingSubmit}
                    />
                  )}

                  {currentStep === "payment" && (
                    <PaymentForm
                      initialData={paymentInfo}
                      onSubmit={handlePaymentSubmit}
                      onBack={handleBackStep}
                    />
                  )}

                  {currentStep === "confirmation" && (
                    <OrderConfirmation
                      shippingInfo={shippingInfo}
                      paymentInfo={paymentInfo}
                      onConfirm={handleOrderConfirm}
                      onBack={handleBackStep}
                      isLoading={isLoading}
                      orderNumber={orderNumber}
                      onGoToOrders={handleGoToOrders}
                      onContinueShopping={handleContinueShopping}
                    />
                  )}
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <OrderSummary
                  items={orderNumber ? orderItems : cartItems}
                  total={total}
                  showTitle={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
