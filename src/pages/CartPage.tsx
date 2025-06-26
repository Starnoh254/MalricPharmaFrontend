// pages/CartPage.tsx
import MainLayout from '../components/MainLayout';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

export default function CartPage() {
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
              <h3 className="text-xl font-bold">Total: Ksh {total}</h3>
              <button onClick={clearCart} className="mt-2 px-4 py-2 bg-red-500 text-white rounded">
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}
