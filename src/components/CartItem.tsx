// components/CartItem.tsx
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/currency";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CartItem = ({ id, name, price, quantity, imageUrl }: any) => {
  const { removeFromCart } = useCart();

  return (
    <div className="flex items-center justify-between border-b py-2">
      <div className="flex items-center gap-4">
        {imageUrl && (
          <img src={imageUrl} alt={name} className="w-16 h-16 object-cover" />
        )}
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p>
            {formatCurrency(price)} x {quantity}
          </p>
        </div>
      </div>
      <button onClick={() => removeFromCart(id)} className="text-red-500">
        Remove
      </button>
    </div>
  );
};

export default CartItem;
