// src/components/checkout/OrderSummary.tsx
import { ShoppingBag } from "lucide-react";
import { formatCurrency } from "../../utils/currency";
import {
  getDeliveryFee,
  calculateOrderTotal,
  FREE_DELIVERY_THRESHOLD,
} from "../../utils/pricing";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
};

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
  showTitle?: boolean;
}

export default function OrderSummary({
  items,
  total,
  showTitle = false,
}: OrderSummaryProps) {
  const deliveryFee = getDeliveryFee(total);
  const grandTotal = calculateOrderTotal(total);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sticky top-8">
      {showTitle && (
        <div className="flex items-center mb-6 pb-4 border-b border-gray-100">
          <div className="p-2 bg-blue-100 rounded-lg mr-3">
            <ShoppingBag className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Order Summary</h3>
        </div>
      )}

      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
          >
            {item.imageUrl && (
              <div className="relative">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-xl bg-gray-100 shadow-sm"
                />
                <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  {item.quantity}
                </div>
              </div>
            )}
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
                {item.name}
              </h4>
              <p className="text-sm text-gray-500">
                {formatCurrency(item.price)} × {item.quantity}
              </p>
            </div>
            <p className="text-lg font-bold text-gray-900">
              {formatCurrency(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 mt-8 pt-6 space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between text-base">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold text-gray-900">
              {formatCurrency(total)}
            </span>
          </div>
          <div className="flex justify-between text-base">
            <span className="text-gray-600">Delivery Fee</span>
            <span
              className={`font-semibold ${
                deliveryFee === 0 ? "text-green-600" : "text-gray-900"
              }`}
            >
              {deliveryFee === 0 ? "FREE" : formatCurrency(deliveryFee)}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-gray-900">Total</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              {formatCurrency(grandTotal)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-100">
        <div className="text-sm space-y-2">
          <div className="flex items-center text-green-700">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span>
              Free delivery on orders over{" "}
              {formatCurrency(FREE_DELIVERY_THRESHOLD)}
            </span>
          </div>
          <div className="flex items-center text-blue-700">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            <span>All prices include applicable taxes</span>
          </div>
          <div className="flex items-center text-gray-700">
            <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
            <span>Delivery within 24-48 hours</span>
          </div>
        </div>
      </div>
    </div>
  );
}
