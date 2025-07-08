// components/CartItem.tsx
import { Minus, Plus, Trash2, Package } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/currency";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CartItem = ({ id, name, price, quantity, imageUrl }: any) => {
  const { removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6 shadow-sm hover:shadow-lg transition-all duration-200">
      {/* Mobile Layout (Stacked) */}
      <div className="block sm:hidden">
        <div className="flex items-start gap-4 mb-4">
          {/* Product Image */}
          <div className="flex-shrink-0">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={name}
                className="w-16 h-16 object-cover rounded-xl border border-gray-200 shadow-sm"
              />
            ) : (
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-green-100 rounded-xl border border-gray-200 flex items-center justify-center">
                <Package className="w-6 h-6 text-gray-400" />
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-grow min-w-0">
            <h4 className="text-base font-semibold text-gray-900 mb-1 line-clamp-2">
              {name}
            </h4>
            <p className="text-sm text-gray-500">
              {formatCurrency(price)} each
            </p>
          </div>

          {/* Remove Button - Top Right */}
          <button
            onClick={() => removeFromCart(id)}
            className="flex items-center justify-center w-8 h-8 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
            aria-label="Remove item from cart"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Quantity Controls and Total - Mobile */}
        <div className="flex items-center justify-between">
          <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="p-3 hover:bg-gray-100 rounded-l-xl transition-colors touch-manipulation"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4 text-gray-600" />
            </button>
            <span className="px-4 py-3 font-medium text-gray-900 min-w-[3rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="p-3 hover:bg-gray-100 rounded-r-xl transition-colors touch-manipulation"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          <div className="text-right">
            <div className="text-lg font-bold text-gray-900">
              {formatCurrency(price * quantity)}
            </div>
            <div className="text-xs text-gray-500">Total</div>
          </div>
        </div>
      </div>

      {/* Tablet Layout (Horizontal with some stacking) */}
      <div className="hidden sm:block md:hidden">
        <div className="flex items-start gap-4">
          {/* Product Image */}
          <div className="flex-shrink-0">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={name}
                className="w-18 h-18 object-cover rounded-xl border border-gray-200 shadow-sm"
              />
            ) : (
              <div className="w-18 h-18 bg-gradient-to-br from-blue-100 to-green-100 rounded-xl border border-gray-200 flex items-center justify-center">
                <Package className="w-7 h-7 text-gray-400" />
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex-grow min-w-0">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-lg font-semibold text-gray-900 line-clamp-2 pr-2">
                {name}
              </h4>
              <button
                onClick={() => removeFromCart(id)}
                className="flex items-center gap-1 px-2 py-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 text-sm font-medium"
                aria-label="Remove item from cart"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Remove</span>
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-3">
              Unit price: {formatCurrency(price)}
            </p>

            <div className="flex items-center justify-between">
              {/* Quantity Controls */}
              <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="p-2 hover:bg-gray-100 rounded-l-xl transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4 text-gray-600" />
                </button>
                <span className="px-4 py-2 font-medium text-gray-900 min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="p-2 hover:bg-gray-100 rounded-r-xl transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* Price */}
              <div className="text-right">
                <div className="text-xl font-bold text-gray-900">
                  {formatCurrency(price * quantity)}
                </div>
                <div className="text-sm text-gray-500">Total</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout (Original Horizontal) */}
      <div className="hidden md:block">
        <div className="flex items-center gap-6">
          {/* Product Image */}
          <div className="flex-shrink-0">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={name}
                className="w-20 h-20 object-cover rounded-xl border border-gray-200 shadow-sm"
              />
            ) : (
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-green-100 rounded-xl border border-gray-200 flex items-center justify-center">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex-grow">
            <h4 className="text-lg font-semibold text-gray-900 mb-1">{name}</h4>
            <p className="text-sm text-gray-500 mb-3">
              Unit price: {formatCurrency(price)}
            </p>

            {/* Quantity Controls */}
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="p-2 hover:bg-gray-100 rounded-l-xl transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4 text-gray-600" />
                </button>
                <span className="px-4 py-2 font-medium text-gray-900 min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="p-2 hover:bg-gray-100 rounded-r-xl transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              <span className="text-sm text-gray-500">
                × {quantity} = {formatCurrency(price * quantity)}
              </span>
            </div>
          </div>

          {/* Price and Remove */}
          <div className="flex flex-col items-end gap-3">
            <div className="text-right">
              <div className="text-xl font-bold text-gray-900">
                {formatCurrency(price * quantity)}
              </div>
              <div className="text-sm text-gray-500">Total for this item</div>
            </div>

            <button
              onClick={() => removeFromCart(id)}
              className="flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 text-sm font-medium"
              aria-label="Remove item from cart"
            >
              <Trash2 className="w-4 h-4" />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
