import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import Toast from "./Toast";
import { formatCurrency } from "../utils/currency";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
    });

    // Show success toast
    setShowToast(true);
  };

  return (
    <>
      <div className="border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition-shadow">
        {product.imageUrl && (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-40 object-cover rounded mb-3"
          />
        )}
        <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-4">
          <p className="font-bold text-lg text-blue-600">
            {formatCurrency(product.price)}
          </p>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>

      <Toast
        message={`${product.name} added to cart!`}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
};

export default ProductCard;
