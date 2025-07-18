// src/components/CategoryGrid.tsx
import React from "react";
import {
  Pill,
  Heart,
  Shield,
  Baby,
  Leaf,
  Zap,
  Package,
  ArrowRight,
} from "lucide-react";

interface CategoryGridProps {
  onCategorySelect: (category: string) => void;
  className?: string;
}

const categories = [
  {
    id: "antibiotics",
    name: "Antibiotics",
    description: "Prescription antibiotics for infections",
    icon: Shield,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    count: "25+ Products",
    popular: true,
  },
  {
    id: "painkillers",
    name: "Painkillers",
    description: "Pain relief & anti-inflammatory",
    icon: Zap,
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    textColor: "text-red-700",
    count: "18+ Products",
    popular: true,
  },
  {
    id: "vitamins",
    name: "Vitamins",
    description: "Essential vitamins & minerals",
    icon: Leaf,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    count: "30+ Products",
    popular: true,
  },
  {
    id: "supplements",
    name: "Supplements",
    description: "Health & wellness supplements",
    icon: Heart,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
    count: "22+ Products",
    popular: false,
  },
  {
    id: "baby-care",
    name: "Baby Care",
    description: "Baby & child healthcare products",
    icon: Baby,
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50",
    textColor: "text-pink-700",
    count: "15+ Products",
    popular: false,
  },
  {
    id: "first-aid",
    name: "First Aid",
    description: "Emergency & first aid supplies",
    icon: Pill,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
    count: "12+ Products",
    popular: false,
  },
];

const CategoryGrid: React.FC<CategoryGridProps> = ({
  onCategorySelect,
  className = "",
}) => {
  const handleCategoryClick = (category: (typeof categories)[0]) => {
    // For quick filter on same page
    onCategorySelect(category.name);

    // For navigation to dedicated category page
    // navigate(`/category/${category.id}`);
  };

  return (
    <div className={`${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-secondary mb-3">
          🏥 Shop by Category
        </h2>
        <p className="text-lg text-grayText max-w-2xl mx-auto">
          Find exactly what you need faster by browsing our organized medicine
          categories
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const IconComponent = category.icon;

          return (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className="group relative bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            >
              {/* Popular Badge */}
              {category.popular && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  POPULAR
                </div>
              )}

              {/* Category Icon */}
              <div
                className={`w-16 h-16 rounded-2xl ${category.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
              >
                <IconComponent className={`w-8 h-8 ${category.textColor}`} />
              </div>

              {/* Category Info */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-secondary group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-grayText text-sm leading-relaxed">
                  {category.description}
                </p>

                {/* Product Count */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-sm font-medium text-gray-600">
                    {category.count}
                  </span>
                  <div className="flex items-center gap-1 text-primary group-hover:text-primary/80 transition-colors">
                    <span className="text-sm font-medium">Browse</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl border border-gray-100">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Package className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-bold text-secondary">
            Can't find what you're looking for?
          </h3>
        </div>
        <p className="text-grayText mb-4">
          Browse all our products or use our search feature to find specific
          medicines
        </p>
        <button
          onClick={() => onCategorySelect("")}
          className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          View All Products
        </button>
      </div>
    </div>
  );
};

export default CategoryGrid;
