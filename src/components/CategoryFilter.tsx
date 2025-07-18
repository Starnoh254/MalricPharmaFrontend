import React from "react";
import {
  Pill,
  Heart,
  Shield,
  Baby,
  Leaf,
  Zap,
  Package,
  Filter,
} from "lucide-react";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

// Category configuration with icons and descriptions
const categoryConfig = {
  All: {
    icon: Package,
    description: "All Products",
    color: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    activeColor: "bg-gray-700 text-white",
  },
  Antibiotics: {
    icon: Shield,
    description: "Antibiotics",
    color: "bg-blue-100 text-blue-700 hover:bg-blue-200",
    activeColor: "bg-blue-600 text-white",
  },
  Painkillers: {
    icon: Zap,
    description: "Pain Relief",
    color: "bg-red-100 text-red-700 hover:bg-red-200",
    activeColor: "bg-red-600 text-white",
  },
  Vitamins: {
    icon: Leaf,
    description: "Vitamins & Supplements",
    color: "bg-green-100 text-green-700 hover:bg-green-200",
    activeColor: "bg-green-600 text-white",
  },
  Supplements: {
    icon: Heart,
    description: "Health Supplements",
    color: "bg-purple-100 text-purple-700 hover:bg-purple-200",
    activeColor: "bg-purple-600 text-white",
  },
  "Baby Care": {
    icon: Baby,
    description: "Baby & Child Care",
    color: "bg-pink-100 text-pink-700 hover:bg-pink-200",
    activeColor: "bg-pink-600 text-white",
  },
  "First Aid": {
    icon: Pill,
    description: "First Aid & Emergency",
    color: "bg-orange-100 text-orange-700 hover:bg-orange-200",
    activeColor: "bg-orange-600 text-white",
  },
};

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  // Add 'All' to the beginning of categories if not present
  const allCategories = ["All", ...categories.filter((cat) => cat !== "All")];

  return (
    <div className="space-y-4">
      {/* Desktop View - Horizontal Pills */}
      <div className="hidden md:block">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-800">
            Shop by Category
          </h3>
        </div>

        <div className="flex flex-wrap gap-3">
          {allCategories.map((category) => {
            const config =
              categoryConfig[category as keyof typeof categoryConfig];
            const IconComponent = config?.icon || Package;
            const isActive =
              selectedCategory === category ||
              (selectedCategory === "" && category === "All");

            return (
              <button
                key={category}
                onClick={() =>
                  onCategoryChange(category === "All" ? "" : category)
                }
                className={`flex items-center gap-2 px-4 py-3 rounded-full font-medium transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md ${
                  isActive
                    ? config?.activeColor || "bg-primary text-white"
                    : config?.color ||
                      "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {config?.description || category}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile View - Dropdown */}
      <div className="md:hidden">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
          <Filter className="w-4 h-4" />
          Filter by Category:
        </label>

        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full p-3 pr-10 border border-gray-300 rounded-xl bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
          >
            <option value="">All Products</option>
            {categories.map((cat) => {
              const config = categoryConfig[cat as keyof typeof categoryConfig];
              return (
                <option key={cat} value={cat}>
                  {config?.description || cat}
                </option>
              );
            })}
          </select>

          {/* Custom dropdown arrow */}
          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Active Category Info */}
      {selectedCategory && selectedCategory !== "All" && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center gap-2">
            {(() => {
              const config =
                categoryConfig[selectedCategory as keyof typeof categoryConfig];
              const IconComponent = config?.icon || Package;
              return <IconComponent className="w-5 h-5 text-blue-600" />;
            })()}
            <span className="text-sm font-medium text-blue-800">
              Showing products in:{" "}
              {categoryConfig[selectedCategory as keyof typeof categoryConfig]
                ?.description || selectedCategory}
            </span>
            <button
              onClick={() => onCategoryChange("")}
              className="ml-auto text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              Clear Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
