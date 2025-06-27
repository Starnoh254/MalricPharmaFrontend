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
import type { ShippingInfo, PaymentInfo } from "../../pages/CheckoutPage";

interface OrderConfirmationProps {
  shippingInfo: ShippingInfo;
  paymentInfo: PaymentInfo;
  onConfirm: () => void;
  onBack: () => void;
  isLoading: boolean;
  orderNumber: string | null;
}

export default function OrderConfirmation({
  shippingInfo,
  paymentInfo,
  onConfirm,
  onBack,
  isLoading,
  orderNumber,
}: OrderConfirmationProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const getPaymentMethodDisplay = () => {
    switch (paymentInfo.method) {
      case "mpesa":
        return `M-Pesa (${paymentInfo.mpesaPhone})`;
      case "card":
        return `Card ending in ${paymentInfo.cardNumber?.slice(-4)}`;
      case "cash_on_delivery":
        return "Cash on Delivery";
      default:
        return paymentInfo.method;
    }
  };

  // Show success state if order was placed
  if (orderNumber) {
    return (
      <div className="text-center py-8">
        <div className="mx-auto flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Order Placed Successfully!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-center mb-4">
            <Package className="w-6 h-6 text-green-600 mr-2" />
            <span className="font-semibold text-green-800">
              Order Number: {orderNumber}
            </span>
          </div>

          <div className="text-sm text-green-700 space-y-2">
            <div className="flex items-center justify-center">
              <Truck className="w-4 h-4 mr-2" />
              <span>Estimated delivery: 24-48 hours</span>
            </div>
            <p>We'll send you email updates about your order status.</p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => (window.location.href = "/orders")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200"
          >
            View My Orders
          </button>

          <button
            onClick={() => (window.location.href = "/products")}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-md font-medium transition-colors duration-200"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <Package className="w-5 h-5 mr-2 text-blue-600" />
        Review & Confirm Order
      </h2>

      <div className="space-y-6">
        {/* Shipping Information Review */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3 flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-gray-600" />
            Shipping Address
          </h3>
          <div className="text-sm text-gray-700 space-y-1">
            <p className="font-medium">{shippingInfo.fullName}</p>
            <p>{shippingInfo.address}</p>
            <p>
              {shippingInfo.city}, {shippingInfo.postalCode}
            </p>
            <p>{shippingInfo.phone}</p>
            <p>{shippingInfo.email}</p>
            {shippingInfo.deliveryNotes && (
              <div className="mt-2 pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-600">Delivery Notes:</p>
                <p className="text-sm">{shippingInfo.deliveryNotes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Payment Method Review */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3 flex items-center">
            <CreditCard className="w-4 h-4 mr-2 text-gray-600" />
            Payment Method
          </h3>
          <p className="text-sm text-gray-700">{getPaymentMethodDisplay()}</p>
        </div>

        {/* Important Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">
            Important Information
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Your order will be processed within 24 hours</li>
            <li>• Delivery typically takes 24-48 hours within Nairobi</li>
            <li>
              • You will receive email confirmation and tracking information
            </li>
            <li>
              • For prescription drugs, you may need to provide additional
              documentation
            </li>
          </ul>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-gray-50 rounded-lg p-4">
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">
              I agree to the{" "}
              <a
                href="/terms"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Privacy Policy
              </a>
              . I understand that prescription medications require valid
              prescriptions and may be subject to additional verification.
            </span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            disabled={isLoading}
            className="flex items-center text-gray-600 hover:text-gray-800 font-medium disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Payment
          </button>

          <button
            onClick={onConfirm}
            disabled={!agreedToTerms || isLoading}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-md font-medium transition-colors duration-200 flex items-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing Order...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Place Order
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
