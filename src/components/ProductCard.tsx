import React, { useState } from "react";
import {
  ShoppingCart,
  Clock,
  Star,
  Plus,
  Minus,
  Eye,
  Heart,
  Users,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import Toast from "./Toast";
import SavingsBadge from "./SavingsBadge";
// import RelatedProducts from "./RelatedProducts";
// import SecurityBadges from "./SecurityBadges";
import { formatCurrency } from "../utils/currency";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  originalPrice?: number;
  discount?: number;
  isPopular?: boolean;
  stockCount?: number;
  rating?: number;
  reviewCount?: number;
  viewingCount?: number;
  lastPurchased?: string;
  freeShippingEligible?: boolean;
  isWishlisted?: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(
    product.isWishlisted || false
  );
  // const [showRelatedProducts, setShowRelatedProducts] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      imageUrl: product.imageUrl,
    });

    // Show success toast
    setShowToast(true);
    // Reset quantity to 1 after adding to cart
    setQuantity(1);
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (
      newQuantity >= 1 &&
      (!product.stockCount || newQuantity <= product.stockCount)
    ) {
      setQuantity(newQuantity);
    }
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    // In real app, this would save to backend/localStorage
  };

  // Calculate discount percentage
  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : product.discount || 0;

  // Check if stock is low (less than 10)
  const isLowStock = product.stockCount && product.stockCount < 10;

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all duration-300 overflow-hidden group relative">
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <SavingsBadge percentage={discountPercentage} />
        )}

        {/* Popular Badge - positioned to avoid overlap with savings badge */}
        {product.isPopular && (
          <div
            className={`absolute ${
              discountPercentage > 0 ? "top-12" : "top-2"
            } left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 z-10`}
          >
            <Star className="w-3 h-3" />
            POPULAR
          </div>
        )}

        {/* Wishlist Button - positioned to avoid overlap */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute ${discountPercentage > 0 ? "top-12" : "top-2"} ${
            product.isPopular && !discountPercentage ? "right-12" : "right-2"
          } w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all z-10 group`}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted
                ? "text-red-500 fill-current"
                : "text-gray-400 group-hover:text-red-400"
            }`}
          />
        </button>

        {/* Viewing Activity */}
        {product.viewingCount && product.viewingCount > 0 && (
          <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span>{product.viewingCount} viewing</span>
          </div>
        )}

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
          <p className="text-sm text-grayText mb-3 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < product.rating!
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm text-grayText ml-1">
                ({product.rating?.toFixed(1)})
              </span>
              {product.reviewCount && (
                <span className="text-xs text-gray-500 ml-1">
                  • {product.reviewCount} reviews
                </span>
              )}
            </div>
          )}

          {/* Stock Status */}
          {isLowStock && (
            <div className="flex items-center gap-1 mb-3 text-red-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">
                Only {product.stockCount} left!
              </span>
            </div>
          )}

          {/* Social Proof */}
          {product.lastPurchased && (
            <div className="flex items-center gap-1 mb-3 text-green-600">
              <Users className="w-4 h-4" />
              <span className="text-sm">
                Last purchased {product.lastPurchased}
              </span>
            </div>
          )}

          {/* Free Shipping Badge */}
          {product.freeShippingEligible && (
            <div className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full inline-flex items-center gap-1 mb-3">
              🚚 Free shipping eligible
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-secondary">
                  {formatCurrency(product.price)}
                </span>
                {discountPercentage > 0 && (
                  <span className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                    -{discountPercentage}%
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                >
                  <Minus className="w-4 h-4 text-gray-600" />
                </button>
                <span className="w-8 text-center font-semibold text-secondary">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={
                    product.stockCount ? quantity >= product.stockCount : false
                  }
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                >
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0 text-sm"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Add to Cart</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
          </div>

          {/* Security Badges */}
          {/* <div className="mt-4 pt-4 border-t border-gray-100">
            <SecurityBadges layout="horizontal" />
          </div> */}

          {/* Toggle Related Products */}
          {/* <div className="mt-3">
            <button
              onClick={() => setShowRelatedProducts(!showRelatedProducts)}
              className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
            >
              {showRelatedProducts ? "▼" : "▶"} Customers also bought
            </button>
          </div> */}

          {/* Related Products */}
          {/* {showRelatedProducts && (
            <div className="mt-3">
              <RelatedProducts currentProductId={product.id} />
            </div>
          )} */}
        </div>
      </div>

      <Toast
        message={`${quantity} x ${product.name} added to cart!`}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
};

export default ProductCard;
