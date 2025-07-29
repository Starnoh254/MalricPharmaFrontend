import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";
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
  // const { user, isAuthenticated } = useAuth();

  // Delivery fee calculation (frontend only - not sent to backend)
  const deliveryFee = getDeliveryFee(total);
  const grandTotal = calculateOrderTotal(total); // For display purposes only

  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping");
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    email: "",
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
  // if (!isAuthenticated) {
  //   navigate("/login");
  //   return null;
  // }

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-4 md:py-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Header with enhanced styling */}
            <div className="text-center mb-6 md:mb-8">
              <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
                Secure Checkout
              </h1>
              <p className="text-gray-600 text-base md:text-lg px-4">
                Complete your order in just a few simple steps
              </p>
            </div>

            {/* Progress Steps */}
            <CheckoutSteps currentStep={currentStep} />

            {/* Mobile Order Summary (shown at top on mobile) */}
            <div className="block xl:hidden mt-8 mb-6">
              <OrderSummary
                items={orderNumber ? orderItems : cartItems}
                total={total}
                showTitle={true}
              />
            </div>

            <div className="mt-8 md:mt-12 grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
              {/* Main Content */}
              <div className="xl:col-span-2">
                <div className="bg-white rounded-2xl shadow-xl border-0 p-4 md:p-8 relative overflow-hidden">
                  {/* Decorative background elements - hidden on mobile for cleaner look */}
                  <div className="hidden md:block absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-green-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
                  <div className="hidden md:block absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-100 to-blue-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>

                  <div className="relative z-10">
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
              </div>

              {/* Order Summary Sidebar - Desktop only */}
              <div className="hidden xl:block xl:col-span-1">
                <div className="sticky top-8">
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
      </div>
    </MainLayout>
  );
}
