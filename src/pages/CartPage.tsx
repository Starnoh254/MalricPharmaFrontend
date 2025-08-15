// pages/CartPage.tsx
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Trash2,
  ArrowRight,
  Package,
  Truck,
  ShieldCheck,
} from "lucide-react";
import MainLayout from "../components/MainLayout";
import SEOHelmet from "../components/SEOHelmet";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { formatCurrency } from "../utils/currency";
import { useBrand } from "../hooks/useBrand";
import {
  getDeliveryFee,
  calculateOrderTotal,
  FREE_DELIVERY_THRESHOLD,
} from "../utils/pricing";

export default function CartPage() {
  const { brand } = useBrand();
  const navigate = useNavigate();
  const { cartItems, total, clearCart, itemCount } = useCart();

  const deliveryFee = getDeliveryFee(total);
  const grandTotal = calculateOrderTotal(total);
  const freeDeliveryRemaining = FREE_DELIVERY_THRESHOLD - total;

  const EmptyCartState = () => (
    <div className="text-center py-12 md:py-16">
      <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
        <ShoppingCart className="w-10 h-10 md:w-12 md:h-12 text-gray-400" />
      </div>
      <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
        Your cart is empty
      </h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto px-4 text-sm md:text-base">
        Add some medicines to your cart to get started with your order. Browse
        our wide selection of quality healthcare products.
      </p>
      <button
        onClick={() => navigate("/products")}
        className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm md:text-base"
      >
        Start Shopping
      </button>
    </div>
  );

  const CartSummary = () => (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6 shadow-lg sticky top-4 md:top-8">
      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-2">
        <Package className="w-5 h-5 text-blue-600" />
        Order Summary
      </h3>

      <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm md:text-base text-gray-600">
            Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
          </span>
          <span className="font-semibold text-gray-900 text-sm md:text-base">
            {formatCurrency(total)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm md:text-base text-gray-600">
            Delivery fee
          </span>
          {deliveryFee === 0 ? (
            <span className="font-semibold text-green-600 text-sm md:text-base">
              FREE
            </span>
          ) : (
            <span className="font-semibold text-gray-900 text-sm md:text-base">
              {formatCurrency(deliveryFee)}
            </span>
          )}
        </div>

        <div className="border-t border-gray-200 pt-3 md:pt-4">
          <div className="flex items-center justify-between">
            <span className="text-base md:text-lg font-semibold text-gray-900">
              Total
            </span>
            <span className="text-lg md:text-xl font-bold text-gray-900">
              {formatCurrency(grandTotal)}
            </span>
          </div>
        </div>
      </div>

      {/* Free Delivery Progress */}
      {freeDeliveryRemaining > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 md:p-4 mb-4 md:mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Truck className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span className="text-xs md:text-sm font-medium text-blue-800 leading-tight">
              Add {formatCurrency(freeDeliveryRemaining)} more for FREE
              delivery!
            </span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(
                  (total / FREE_DELIVERY_THRESHOLD) * 100,
                  100
                )}%`,
              }}
            ></div>
          </div>
        </div>
      )}

      {deliveryFee === 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-3 md:p-4 mb-4 md:mb-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0" />
            <span className="text-xs md:text-sm font-medium text-green-800">
              🎉 You qualify for FREE delivery!
            </span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={() => navigate("/checkout")}
          className="w-full px-4 py-3 md:px-6 md:py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 text-sm md:text-base touch-manipulation"
        >
          Proceed to Checkout
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        <button
          onClick={() => navigate("/products")}
          className="w-full px-4 py-2 md:px-6 md:py-3 bg-white text-gray-700 font-medium rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 text-sm md:text-base"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );

  return (
    <>
      <SEOHelmet
        title={`Shopping Cart - ${brand.name} | Review Your Medicine Orders`}
        description="Review your selected medicines and health products. Secure checkout with free delivery on orders over KES 2,000 in Nairobi."
        keywords="shopping cart, medicine orders, secure checkout, pharmacy cart Kenya"
        url={`${brand.seo.siteUrl}/cart`}
      />
      <MainLayout>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-4 md:py-8">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
            {/* Header */}
            <div className="text-center mb-6 md:mb-8">
              <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
                Shopping Cart
              </h1>
              <p className="text-gray-600 text-base md:text-lg px-4">
                Review your items and proceed to checkout
              </p>
            </div>

            {cartItems.length === 0 ? (
              <EmptyCartState />
            ) : (
              <>
                {/* Mobile Summary (shown at top on mobile) */}
                <div className="block lg:hidden mb-6">
                  <CartSummary />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                  {/* Cart Items */}
                  <div className="lg:col-span-2 space-y-4 md:space-y-6">
                    {/* Items Header */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6 shadow-sm">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-900 flex items-center gap-2">
                          <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                          <span className="text-sm md:text-base">
                            Your Items ({itemCount})
                          </span>
                        </h2>
                        {cartItems.length > 0 && (
                          <button
                            onClick={clearCart}
                            className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 text-xs md:text-sm font-medium touch-manipulation"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Clear Cart</span>
                            <span className="sm:hidden">Clear</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Cart Items List */}
                    <div className="space-y-3 md:space-y-4">
                      {cartItems.map((item) => (
                        <CartItem key={item.id} {...item} />
                      ))}
                    </div>
                  </div>

                  {/* Cart Summary Sidebar - Desktop only */}
                  <div className="hidden lg:block lg:col-span-1">
                    <CartSummary />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </MainLayout>
    </>
  );
}
