// pages/CartPage.tsx
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { formatCurrency } from "../utils/currency";

export default function CartPage() {
  const navigate = useNavigate();
  const { cartItems, total, clearCart } = useCart();

  return (
    <MainLayout>
      <div className="p-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
            <div className="mt-6 text-right">
              <h3 className="text-xl font-bold">
                Total: {formatCurrency(total)}
              </h3>
              <div className="mt-4 space-x-3">
                <button
                  onClick={clearCart}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
                >
                  Clear Cart
                </button>
                <button
                  onClick={() => navigate("/checkout")}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}
