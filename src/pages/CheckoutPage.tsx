// src/pages/CheckoutPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { orderService } from "../api/orders";
import OrderSummary from "../components/checkout/OrderSummary";
import ShippingForm from "../components/checkout/ShippingForm";
import PaymentForm from "../components/checkout/PaymentForm";
import OrderConfirmation from "../components/checkout/OrderConfirmation";
import CheckoutSteps from "../components/checkout/CheckoutSteps";

export type ShippingInfo = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  deliveryNotes?: string;
};

export type PaymentInfo = {
  method: "mpesa" | "card" | "cash_on_delivery";
  mpesaPhone?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
};

type CheckoutStep = "shipping" | "payment" | "confirmation";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, total, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();

  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping");
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    deliveryNotes: "",
  });
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: "mpesa",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

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
      if (!user?.id) {
        throw new Error("User not authenticated");
      }

      const orderData = {
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          imageUrl: item.imageUrl,
        })),
        shipping: shippingInfo,
        payment: paymentInfo,
        total,
        userId: user.id,
      };

      console.log("Creating order with data:", orderData);

      // Call the order API service
      const order = await orderService.createOrder(orderData);

      console.log("Order created successfully:", order);
      setOrderNumber(order.orderNumber);

      // Clear cart after successful order
      clearCart();

      // Show success toast
      // Note: Toast implementation should be available in context
      console.log("Order placed successfully!");
    } catch (error) {
      console.error("Order failed:", error);

      // Handle different types of errors
      if (error instanceof Error) {
        if (error.message.includes("inventory")) {
          alert(
            "Some items in your cart are no longer available. Please review your cart and try again."
          );
        } else if (error.message.includes("payment")) {
          alert(
            "Payment processing failed. Please check your payment details and try again."
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
                    />
                  )}
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <OrderSummary
                  items={cartItems}
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
