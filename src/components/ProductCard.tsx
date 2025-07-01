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
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all duration-300 overflow-hidden group">
        {product.imageUrl && (
          <div className="relative overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}

        <div className="p-5">
          <h3 className="text-lg font-semibold text-secondary mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-grayText mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-grayText uppercase tracking-wide font-medium">
                Price
              </span>
              <span className="text-xl font-bold text-secondary">
                {formatCurrency(product.price)}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Add to Cart</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
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
