// src/components/checkout/PaymentForm.tsx
import { useState } from "react";
import { CreditCard, Smartphone, Banknote, ArrowLeft } from "lucide-react";
import type { PaymentInfo } from "../../pages/CheckoutPage";

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

    if (formData.method === "mpesa" && !formData.mpesaPhone?.trim()) {
      newErrors.mpesaPhone = "M-Pesa phone number is required";
    } else if (
      formData.method === "mpesa" &&
      formData.mpesaPhone &&
      !/^[0-9+\-\s()]+$/.test(formData.mpesaPhone)
    ) {
      newErrors.mpesaPhone = "Please enter a valid phone number";
    }

    if (formData.method === "card") {
      if (!formData.cardNumber?.trim()) {
        newErrors.cardNumber = "Card number is required";
      } else if (
        formData.cardNumber &&
        !/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))
      ) {
        newErrors.cardNumber = "Please enter a valid 16-digit card number";
      }

      if (!formData.expiryDate?.trim()) {
        newErrors.expiryDate = "Expiry date is required";
      } else if (
        formData.expiryDate &&
        !/^\d{2}\/\d{2}$/.test(formData.expiryDate)
      ) {
        newErrors.expiryDate = "Please enter date in MM/YY format";
      }

      if (!formData.cvv?.trim()) {
        newErrors.cvv = "CVV is required";
      } else if (formData.cvv && !/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = "Please enter a valid CVV";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof PaymentInfo, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "");
    // Add spaces every 4 digits
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatExpiryDate = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "");
    // Add slash after 2 digits
    if (digits.length >= 2) {
      return digits.substring(0, 2) + "/" + digits.substring(2, 4);
    }
    return digits;
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
        Payment Method
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Payment Method Selection */}
        <div className="space-y-4">
          <p className="text-sm font-medium text-gray-700">
            Choose your payment method:
          </p>

          {/* M-Pesa Option */}
          <label
            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
              formData.method === "mpesa"
                ? "border-green-500 bg-green-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="mpesa"
              checked={formData.method === "mpesa"}
              onChange={(e) =>
                handleInputChange(
                  "method",
                  e.target.value as PaymentInfo["method"]
                )
              }
              className="sr-only"
            />
            <Smartphone
              className={`w-6 h-6 mr-3 ${
                formData.method === "mpesa" ? "text-green-600" : "text-gray-400"
              }`}
            />
            <div>
              <p className="font-medium">M-Pesa</p>
              <p className="text-sm text-gray-500">
                Pay with your M-Pesa mobile money
              </p>
            </div>
          </label>

          {/* Card Option */}
          <label
            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
              formData.method === "card"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={formData.method === "card"}
              onChange={(e) =>
                handleInputChange(
                  "method",
                  e.target.value as PaymentInfo["method"]
                )
              }
              className="sr-only"
            />
            <CreditCard
              className={`w-6 h-6 mr-3 ${
                formData.method === "card" ? "text-blue-600" : "text-gray-400"
              }`}
            />
            <div>
              <p className="font-medium">Credit/Debit Card</p>
              <p className="text-sm text-gray-500">Visa, Mastercard accepted</p>
            </div>
          </label>

          {/* Cash on Delivery Option */}
          <label
            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
              formData.method === "cash_on_delivery"
                ? "border-orange-500 bg-orange-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="cash_on_delivery"
              checked={formData.method === "cash_on_delivery"}
              onChange={(e) =>
                handleInputChange(
                  "method",
                  e.target.value as PaymentInfo["method"]
                )
              }
              className="sr-only"
            />
            <Banknote
              className={`w-6 h-6 mr-3 ${
                formData.method === "cash_on_delivery"
                  ? "text-orange-600"
                  : "text-gray-400"
              }`}
            />
            <div>
              <p className="font-medium">Cash on Delivery</p>
              <p className="text-sm text-gray-500">
                Pay when your order is delivered
              </p>
            </div>
          </label>
        </div>

        {/* M-Pesa Details */}
        {formData.method === "mpesa" && (
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-medium text-green-800 mb-3">
              M-Pesa Payment Details
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                M-Pesa Phone Number *
              </label>
              <input
                type="tel"
                value={formData.mpesaPhone || ""}
                onChange={(e) =>
                  handleInputChange("mpesaPhone", e.target.value)
                }
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.mpesaPhone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="+254 700 000 000"
              />
              {errors.mpesaPhone && (
                <p className="mt-1 text-sm text-red-600">{errors.mpesaPhone}</p>
              )}
              <p className="mt-2 text-sm text-green-700">
                You will receive an M-Pesa prompt on this number to complete
                payment.
              </p>
            </div>
          </div>
        )}

        {/* Card Details */}
        {formData.method === "card" && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-3">
              Card Payment Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number *
                </label>
                <input
                  type="text"
                  value={formData.cardNumber || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "cardNumber",
                      formatCardNumber(e.target.value)
                    )
                  }
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.cardNumber ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
                {errors.cardNumber && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.cardNumber}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date *
                  </label>
                  <input
                    type="text"
                    value={formData.expiryDate || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "expiryDate",
                        formatExpiryDate(e.target.value)
                      )
                    }
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.expiryDate ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                  {errors.expiryDate && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.expiryDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV *
                  </label>
                  <input
                    type="text"
                    value={formData.cvv || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "cvv",
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.cvv ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="123"
                    maxLength={4}
                  />
                  {errors.cvv && (
                    <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cash on Delivery Info */}
        {formData.method === "cash_on_delivery" && (
          <div className="bg-orange-50 p-4 rounded-lg">
            <h3 className="font-medium text-orange-800 mb-2">
              Cash on Delivery
            </h3>
            <p className="text-sm text-orange-700">
              Pay with cash when your order is delivered. Please have the exact
              amount ready.
            </p>
            <p className="text-sm text-orange-600 mt-2">
              Note: A small convenience fee may apply for cash on delivery
              orders.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Shipping
          </button>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200"
          >
            Continue to Review
          </button>
        </div>
      </form>
    </div>
  );
}
