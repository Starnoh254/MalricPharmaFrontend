// src/components/RelatedProducts.tsx
import React from "react";
import { ArrowRight, Star } from "lucide-react";
import { formatCurrency } from "../utils/currency";

interface RelatedProduct {
  id: string;
  name: string;
  price: number;
  rating: number;
  imageUrl?: string;
}

interface RelatedProductsProps {
  currentProductId: string;
  className?: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  currentProductId,
  className = "",
}) => {
  // In a real app, this would be fetched based on purchase history and ML recommendations
  const relatedProducts: RelatedProduct[] = [
    {
      id: "r1",
      name: "Vitamin C 1000mg",
      price: 1200,
      rating: 4.7,
      imageUrl: "/api/placeholder/100/100",
    },
    {
      id: "r2",
      name: "Zinc Tablets",
      price: 800,
      rating: 4.5,
      imageUrl: "/api/placeholder/100/100",
    },
    {
      id: "r3",
      name: "Multivitamin",
      price: 1500,
      rating: 4.8,
      imageUrl: "/api/placeholder/100/100",
    },
    {
      id: "r4",
      name: "Omega-3 Fish Oil",
      price: 2200,
      rating: 4.6,
      imageUrl: "/api/placeholder/100/100",
    },
  ];

  // Filter out current product
  const filteredProducts = relatedProducts.filter(
    (p) => p.id !== currentProductId
  );

  return (
    <div
      className={`bg-gray-50 border border-gray-200 rounded-xl p-4 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-secondary">
          Customers Also Bought
        </h3>
        <ArrowRight className="w-5 h-5 text-primary" />
      </div>

      <div className="space-y-3">
        {filteredProducts.slice(0, 3).map((product) => (
          <div
            key={product.id}
            className="flex items-center gap-3 p-2 bg-white rounded-lg hover:shadow-sm transition-shadow cursor-pointer"
          >
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-12 h-12 object-cover rounded-lg"
              />
            )}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-secondary truncate">
                {product.name}
              </h4>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-600">
                    {product.rating}
                  </span>
                </div>
                <span className="text-sm font-bold text-primary">
                  {formatCurrency(product.price)}
                </span>
              </div>
            </div>
            <button className="text-xs bg-primary text-white px-2 py-1 rounded hover:bg-primary/90 transition-colors">
              Add
            </button>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-600 text-center">
          💡 <span className="font-medium">Pro tip:</span> Save on shipping by
          adding more items
        </p>
      </div>
    </div>
  );
};

export default RelatedProducts;
