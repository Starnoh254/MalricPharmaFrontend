// src/components/checkout/OrderConfirmation.tsx
import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle,
  Package,
  Truck,
  CreditCard,
  MapPin,
  Clock,
  Shield,
  Star,
  Sparkles,
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
      <div className="text-center py-12">
        {/* Success Animation */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mx-auto flex items-center justify-center shadow-2xl">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        </div>

        <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
          Order Placed Successfully!
        </h2>

        <div className="max-w-md mx-auto bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 mb-8">
          <p className="text-gray-700 mb-2 font-medium">
            Your order number is:
          </p>
          <p className="text-2xl font-bold text-green-600 bg-white px-4 py-2 rounded-lg border border-green-200">
            {orderNumber}
          </p>
        </div>

        <p className="text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed">
          Thank you for your order! You will receive a confirmation email
          shortly with your order details and tracking information. We're
          already working on preparing your medicines.
        </p>

        {/* Order Status Timeline */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              What happens next?
            </h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900">
                    Order Confirmed
                  </div>
                  <div className="text-sm text-gray-500">
                    Your order has been received and is being processed
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900">Order Packed</div>
                  <div className="text-sm text-gray-500">
                    Your medicines are being carefully packed
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Truck className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900">
                    Out for Delivery
                  </div>
                  <div className="text-sm text-gray-500">
                    Expected delivery in 2-3 business days
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {onGoToOrders && (
            <button
              onClick={onGoToOrders}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              View Order History
            </button>
          )}
          {onContinueShopping && (
            <button
              onClick={onContinueShopping}
              className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Continue Shopping
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200 disabled:opacity-50"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Payment</span>
        </button>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
          Review Your Order
        </h2>
        <p className="text-gray-600">
          Please review all details before placing your order
        </p>
      </div>

      <div className="space-y-6">
        {/* Shipping Information */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Shipping Information
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Full Name
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {shippingInfo.fullName}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Email
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {shippingInfo.email}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Phone
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {shippingInfo.phone}
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Address
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {shippingInfo.address}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  City
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {shippingInfo.city}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Postal Code
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {shippingInfo.postalCode}
                </div>
              </div>
            </div>
          </div>
          {shippingInfo.notes && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                Delivery Notes
              </div>
              <div className="text-sm text-gray-700">{shippingInfo.notes}</div>
            </div>
          )}
        </div>

        {/* Payment Information */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Payment Method
            </h3>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="text-base font-semibold text-gray-900 mb-2">
              {getPaymentDisplay()}
            </div>
            {paymentInfo.method === "mpesa" && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <Shield className="w-4 h-4" />
                <span>
                  You will receive an M-Pesa prompt after confirming your order
                </span>
              </div>
            )}
            {paymentInfo.method === "cod" && (
              <div className="flex items-center gap-2 text-sm text-amber-600">
                <Shield className="w-4 h-4" />
                <span>
                  Please have the exact amount ready when your order is
                  delivered
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-start gap-4">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <div>
              <label
                htmlFor="terms"
                className="text-sm text-gray-700 leading-relaxed cursor-pointer"
              >
                I agree to the{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 font-medium underline"
                >
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 font-medium underline"
                >
                  Privacy Policy
                </a>
                . I understand that my order will be processed and shipped
                according to the delivery timeframes provided.
              </label>
              <div className="mt-3 flex items-center gap-2 text-xs text-green-600">
                <Star className="w-4 h-4" />
                <span>Your information is secure and will never be shared</span>
              </div>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="flex justify-end pt-4">
          <button
            onClick={handleConfirm}
            disabled={!agreedToTerms || isLoading}
            className="px-10 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:from-green-700 hover:to-emerald-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing Order...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>Place Order Securely</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
