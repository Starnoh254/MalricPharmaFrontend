// src/components/checkout/PaymentForm.tsx
import { useState } from "react";
import {
  CreditCard,
  Smartphone,
  Banknote,
  ArrowLeft,
  Shield,
  Lock,
} from "lucide-react";
import type { PaymentInfo } from "../../api/orders";

interface PaymentFormProps {
  initialData: PaymentInfo;
  onSubmit: (data: PaymentInfo) => void;
  onBack: () => void;
}

export default function PaymentForm({
  initialData,
  onSubmit,
  onBack,
}: PaymentFormProps) {
  const [formData, setFormData] = useState<PaymentInfo>(initialData);
  const [errors, setErrors] = useState<Partial<PaymentInfo>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<PaymentInfo> = {};

    if (formData.method === "mpesa" && !formData.phone?.trim()) {
      newErrors.phone = "M-Pesa phone number is required";
    } else if (
      formData.method === "mpesa" &&
      formData.phone &&
      !/^[0-9+\-\s()]+$/.test(formData.phone)
    ) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (formData.method === "card" && !formData.cardToken?.trim()) {
      newErrors.cardToken = "Card information is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof PaymentInfo, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Shipping</span>
        </button>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
          Payment Information
        </h2>
        <p className="text-gray-600">Choose your preferred payment method</p>
      </div>

      {/* Security Badge */}
      <div className="flex items-center justify-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl">
        <Shield className="w-5 h-5 text-green-600" />
        <Lock className="w-4 h-4 text-green-600" />
        <span className="text-sm font-medium text-green-800">
          Your payment information is secure and encrypted
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Payment Method Selection */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-600" />
            Select Payment Method
          </h3>

          <div className="space-y-4">
            {/* M-Pesa */}
            <div
              className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-md ${
                formData.method === "mpesa"
                  ? "border-green-500 bg-green-50 shadow-lg ring-2 ring-green-200"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
              onClick={() => handleInputChange("method", "mpesa")}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="mpesa"
                  checked={formData.method === "mpesa"}
                  onChange={() => handleInputChange("method", "mpesa")}
                  className="w-5 h-5 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <div className="ml-4 flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                    <Smartphone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-base font-semibold text-gray-900">
                      M-Pesa
                    </div>
                    <div className="text-sm text-gray-500">
                      Pay with your mobile money - Fast & Secure
                    </div>
                  </div>
                </div>
                {formData.method === "mpesa" && (
                  <div className="ml-auto">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Credit/Debit Card */}
            <div
              className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-md ${
                formData.method === "card"
                  ? "border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-200"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
              onClick={() => handleInputChange("method", "card")}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.method === "card"}
                  onChange={() => handleInputChange("method", "card")}
                  className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <div className="ml-4 flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-base font-semibold text-gray-900">
                      Credit/Debit Card
                    </div>
                    <div className="text-sm text-gray-500">
                      Visa, Mastercard, and other major cards
                    </div>
                  </div>
                </div>
                {formData.method === "card" && (
                  <div className="ml-auto">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Cash on Delivery */}
            <div
              className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-md ${
                formData.method === "cod"
                  ? "border-amber-500 bg-amber-50 shadow-lg ring-2 ring-amber-200"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
              onClick={() => handleInputChange("method", "cod")}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.method === "cod"}
                  onChange={() => handleInputChange("method", "cod")}
                  className="w-5 h-5 text-amber-600 border-gray-300 focus:ring-amber-500"
                />
                <div className="ml-4 flex items-center">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mr-4">
                    <Banknote className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-base font-semibold text-gray-900">
                      Cash on Delivery
                    </div>
                    <div className="text-sm text-gray-500">
                      Pay when you receive your order
                    </div>
                  </div>
                </div>
                {formData.method === "cod" && (
                  <div className="ml-auto">
                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* M-Pesa Phone Number */}
        {formData.method === "mpesa" && (
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-green-600" />
              M-Pesa Details
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  M-Pesa Phone Number *
                </label>
                <div className="relative">
                  <Smartphone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone || ""}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+254 700 000 000"
                    className={`w-full pl-12 pr-4 py-4 border rounded-xl text-base focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                      errors.phone
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 bg-white"
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                    {errors.phone}
                  </p>
                )}
                <div className="mt-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800 font-medium">
                    📱 You will receive an M-Pesa prompt to complete the payment
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Card Information */}
        {formData.method === "card" && (
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              Card Details
            </h4>
            <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
              <div className="text-center">
                <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-base font-medium text-gray-600 mb-2">
                  Card payment integration
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Will be completed when connecting to a real payment processor
                </p>
                <input
                  type="text"
                  value={formData.cardToken || ""}
                  onChange={(e) =>
                    handleInputChange("cardToken", e.target.value)
                  }
                  placeholder="Card token will be generated by payment processor"
                  className={`w-full px-4 py-4 border rounded-xl text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.cardToken
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-white"
                  }`}
                />
                {errors.cardToken && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                    {errors.cardToken}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Cash on Delivery Info */}
        {formData.method === "cod" && (
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="p-6 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Banknote className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-amber-800 mb-2">
                    Cash on Delivery
                  </h4>
                  <p className="text-amber-700 leading-relaxed">
                    You will pay for your order when it is delivered to your
                    address. Please have the exact amount ready for a smooth
                    delivery experience.
                  </p>
                  <div className="mt-3 text-sm text-amber-600 font-medium">
                    💰 No additional charges for cash payments
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end pt-6">
          <button
            type="submit"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-green-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Continue to Review Order
          </button>
        </div>
      </form>
    </div>
  );
}
