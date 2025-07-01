// src/components/checkout/PaymentForm.tsx
import { useState } from "react";
import { CreditCard, Smartphone, Banknote, ArrowLeft } from "lucide-react";
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
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shipping
        </button>
        <h2 className="text-2xl font-semibold text-gray-900">
          Payment Information
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Payment Method Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Select Payment Method
          </label>
          <div className="space-y-3">
            {/* M-Pesa */}
            <div
              className={`relative border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                formData.method === "mpesa"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
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
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <div className="ml-3 flex items-center">
                  <Smartphone className="w-5 h-5 text-green-600 mr-2" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      M-Pesa
                    </div>
                    <div className="text-xs text-gray-500">
                      Pay with your mobile money
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Credit/Debit Card */}
            <div
              className={`relative border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                formData.method === "card"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
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
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <div className="ml-3 flex items-center">
                  <CreditCard className="w-5 h-5 text-blue-600 mr-2" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Credit/Debit Card
                    </div>
                    <div className="text-xs text-gray-500">
                      Visa, Mastercard accepted
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cash on Delivery */}
            <div
              className={`relative border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                formData.method === "cod"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
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
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <div className="ml-3 flex items-center">
                  <Banknote className="w-5 h-5 text-green-600 mr-2" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Cash on Delivery
                    </div>
                    <div className="text-xs text-gray-500">
                      Pay when you receive your order
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* M-Pesa Phone Number */}
        {formData.method === "mpesa" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              M-Pesa Phone Number
            </label>
            <div className="relative">
              <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                value={formData.phone || ""}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+254 700 000 000"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
            <p className="mt-2 text-sm text-gray-600">
              You will receive an M-Pesa prompt to complete the payment
            </p>
          </div>
        )}

        {/* Card Information */}
        {formData.method === "card" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Information
            </label>
            <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
              <p className="text-sm text-gray-600 mb-2">
                Card payment integration will be completed when connecting to a
                real payment processor.
              </p>
              <input
                type="text"
                value={formData.cardToken || ""}
                onChange={(e) => handleInputChange("cardToken", e.target.value)}
                placeholder="Card token will be generated by payment processor"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.cardToken ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.cardToken && (
                <p className="mt-1 text-sm text-red-600">{errors.cardToken}</p>
              )}
            </div>
          </div>
        )}

        {/* Cash on Delivery Info */}
        {formData.method === "cod" && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start">
              <Banknote className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
              <div>
                <h4 className="text-sm font-medium text-yellow-800">
                  Cash on Delivery
                </h4>
                <p className="mt-1 text-sm text-yellow-700">
                  You will pay for your order when it is delivered to your
                  address. Please have the exact amount ready.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Continue to Review
          </button>
        </div>
      </form>
    </div>
  );
}
