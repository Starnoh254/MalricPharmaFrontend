// src/utils/productFilters.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: string;
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

export interface FilterOptions {
  search: string;
  category: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "name" | "price" | "rating" | "popular";
  sortOrder?: "asc" | "desc";
}

export class ProductFilterService {
  static filterProducts(
    products: Product[],
    options: FilterOptions
  ): Product[] {
    let filtered = products;

    // Search filter
    if (options.search) {
      const searchTerm = options.search.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm)
      );
    }

    // Category filter
    if (
      options.category &&
      options.category !== "All" &&
      options.category !== ""
    ) {
      filtered = filtered.filter(
        (product) => product.category === options.category
      );
    }

    // Price range filter
    if (options.minPrice !== undefined) {
      filtered = filtered.filter(
        (product) => product.price >= options.minPrice!
      );
    }

    if (options.maxPrice !== undefined) {
      filtered = filtered.filter(
        (product) => product.price <= options.maxPrice!
      );
    }

    // Sorting
    if (options.sortBy) {
      filtered = filtered.sort((a, b) => {
        let aValue: number | string;
        let bValue: number | string;

        switch (options.sortBy) {
          case "name":
            aValue = a.name.toLowerCase();
            bValue = b.name.toLowerCase();
            break;
          case "price":
            aValue = a.price;
            bValue = b.price;
            break;
          case "rating":
            aValue = a.rating || 0;
            bValue = b.rating || 0;
            break;
          case "popular":
            aValue = a.isPopular ? 1 : 0;
            bValue = b.isPopular ? 1 : 0;
            break;
          default:
            return 0;
        }

        if (typeof aValue === "string" && typeof bValue === "string") {
          return options.sortOrder === "desc"
            ? bValue.localeCompare(aValue)
            : aValue.localeCompare(bValue);
        }

        return options.sortOrder === "desc"
          ? (bValue as number) - (aValue as number)
          : (aValue as number) - (bValue as number);
      });
    }

    return filtered;
  }

  static getFilterStats(products: Product[]): Record<string, number> {
    const stats: Record<string, number> = {};

    // Count products by category
    products.forEach((product) => {
      stats[product.category] = (stats[product.category] || 0) + 1;
    });

    // Add total count
    stats["Total"] = products.length;

    return stats;
  }

  static getAvailableCategories(products: Product[]): string[] {
    const categories = new Set<string>();
    products.forEach((product) => categories.add(product.category));
    return Array.from(categories).sort();
  }

  static getPriceRange(products: Product[]): { min: number; max: number } {
    if (products.length === 0) {
      return { min: 0, max: 0 };
    }

    const prices = products.map((p) => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }
}

// Helper function for component use
export const useProductFilter = (
  products: Product[],
  options: FilterOptions
) => {
  const filteredProducts = ProductFilterService.filterProducts(
    products,
    options
  );
  const stats = ProductFilterService.getFilterStats(products);
  const categories = ProductFilterService.getAvailableCategories(products);
  const priceRange = ProductFilterService.getPriceRange(products);

  return {
    filteredProducts,
    stats,
    categories,
    priceRange,
    totalCount: products.length,
    filteredCount: filteredProducts.length,
  };
};
