// src/components/checkout/OrderConfirmation.tsx
import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle,
  Package,
  Truck,
  CreditCard,
  MapPin,
} from "lucide-react";
import type { ShippingInfo, PaymentInfo } from "../../api/orders";

interface OrderConfirmationProps {
  shippingInfo: ShippingInfo;
  paymentInfo: PaymentInfo;
  onConfirm: () => void;
  onBack: () => void;
  isLoading: boolean;
  orderNumber: string | null;
  onGoToOrders?: () => void;
  onContinueShopping?: () => void;
}

export default function OrderConfirmation({
  shippingInfo,
  paymentInfo,
  onConfirm,
  onBack,
  isLoading,
  orderNumber,
  onGoToOrders,
  onContinueShopping,
}: OrderConfirmationProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const getPaymentDisplay = () => {
    switch (paymentInfo.method) {
      case "mpesa":
        return `M-Pesa (${paymentInfo.phone || "Phone number"})`;
      case "card":
        return `Credit/Debit Card`;
      case "cod":
        return "Cash on Delivery";
      default:
        return paymentInfo.method;
    }
  };

  const handleConfirm = () => {
    if (agreedToTerms) {
      onConfirm();
    }
  };

  // Show success message if order is placed
  if (orderNumber) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Order Placed Successfully!
        </h2>
        <p className="text-gray-600 mb-4">
          Your order number is: <strong>{orderNumber}</strong>
        </p>
        <p className="text-sm text-gray-500 mb-6">
          You will receive a confirmation email shortly with your order details
          and tracking information.
        </p>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center justify-center gap-2">
            <Package className="w-4 h-4" />
            <span>Your order is being processed</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Truck className="w-4 h-4" />
            <span>Expected delivery in 2-3 business days</span>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center">
          {onGoToOrders && (
            <button
              onClick={onGoToOrders}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition-colors"
            >
              View Order History
            </button>
          )}
          {onContinueShopping && (
            <button
              onClick={onContinueShopping}
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Continue Shopping
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Payment
        </button>
        <h2 className="text-2xl font-semibold text-gray-900">
          Review Your Order
        </h2>
      </div>

      <div className="space-y-6">
        {/* Shipping Information */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900">
              Shipping Information
            </h3>
          </div>
          <div className="space-y-2">
            <p className="text-sm">
              <strong>Name:</strong> {shippingInfo.fullName}
            </p>
            <p className="text-sm">
              <strong>Email:</strong> {shippingInfo.email}
            </p>
            <p className="text-sm">
              <strong>Phone:</strong> {shippingInfo.phone}
            </p>
            <p className="text-sm">
              <strong>Address:</strong> {shippingInfo.address}
            </p>
            <p className="text-sm">
              <strong>City:</strong> {shippingInfo.city}
            </p>
            <p className="text-sm">
              <strong>Postal Code:</strong> {shippingInfo.postalCode}
            </p>
            {shippingInfo.notes && (
              <div>
                <strong className="text-sm">Delivery Notes:</strong>
                <p className="text-sm">{shippingInfo.notes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900">
              Payment Method
            </h3>
          </div>
          <p className="text-sm">{getPaymentDisplay()}</p>
          {paymentInfo.method === "mpesa" && (
            <p className="text-xs text-gray-500 mt-2">
              You will receive an M-Pesa prompt after confirming your order
            </p>
          )}
          {paymentInfo.method === "cod" && (
            <p className="text-xs text-gray-500 mt-2">
              Please have the exact amount ready when your order is delivered
            </p>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I agree to the{" "}
              <a href="#" className="text-blue-600 hover:text-blue-800">
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:text-blue-800">
                Privacy Policy
              </a>
              . I understand that my order will be processed and shipped
              according to the delivery timeframes provided.
            </label>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="flex justify-end">
          <button
            onClick={handleConfirm}
            disabled={!agreedToTerms || isLoading}
            className="px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Processing Order...
              </div>
            ) : (
              "Place Order"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
