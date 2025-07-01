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
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
      {showTitle && (
        <div className="flex items-center mb-4">
          <ShoppingBag className="w-5 h-5 mr-2 text-gray-600" />
          <h3 className="text-lg font-semibold">Order Summary</h3>
        </div>
      )}

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-3">
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-12 h-12 object-cover rounded-md bg-gray-100"
              />
            )}
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                {item.name}
              </h4>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">
              {formatCurrency(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 mt-6 pt-6 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900">{formatCurrency(total)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Delivery Fee</span>
          <span className="text-gray-900">{formatCurrency(deliveryFee)}</span>
        </div>
        <div className="border-t border-gray-200 pt-2">
          <div className="flex justify-between">
            <span className="text-base font-semibold text-gray-900">Total</span>
            <span className="text-base font-semibold text-gray-900">
              {formatCurrency(grandTotal)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 text-xs text-gray-500">
        <p>
          • Free delivery on orders over{" "}
          {formatCurrency(FREE_DELIVERY_THRESHOLD)}
        </p>
        <p>• All prices include applicable taxes</p>
        <p>• Delivery within 24-48 hours</p>
      </div>
    </div>
  );
}
