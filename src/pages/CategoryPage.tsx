// src/pages/CategoryPage.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Package, Star, Grid, List } from "lucide-react";
import MainLayout from "../components/MainLayout";
import SEOHelmet from "../components/SEOHelmet";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import { api } from "../utils/axios";

interface Product {
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

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Category configuration
  const categoryConfig = {
    antibiotics: {
      title: "Antibiotics",
      description: "Prescription antibiotics for bacterial infections",
      emoji: "🛡️",
      color: "from-blue-600 to-blue-700",
    },
    painkillers: {
      title: "Painkillers",
      description: "Pain relief and anti-inflammatory medicines",
      emoji: "⚡",
      color: "from-red-600 to-red-700",
    },
    vitamins: {
      title: "Vitamins",
      description: "Essential vitamins and mineral supplements",
      emoji: "🌿",
      color: "from-green-600 to-green-700",
    },
    supplements: {
      title: "Supplements",
      description: "Health and wellness supplement products",
      emoji: "💊",
      color: "from-purple-600 to-purple-700",
    },
    "baby-care": {
      title: "Baby Care",
      description: "Baby and child healthcare products",
      emoji: "👶",
      color: "from-pink-600 to-pink-700",
    },
    "first-aid": {
      title: "First Aid",
      description: "Emergency and first aid medical supplies",
      emoji: "🏥",
      color: "from-orange-600 to-orange-700",
    },
  };

  const currentCategory = categoryName
    ? categoryConfig[categoryName.toLowerCase() as keyof typeof categoryConfig]
    : null;

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/products?category=${categoryName}`);
        setProducts(response.data.products || []);
      } catch (error) {
        console.error("Failed to fetch category products:", error);

        // Demo data for different categories
        const demoProducts = getDemoProductsForCategory(categoryName);
        setProducts(demoProducts);
      } finally {
        setLoading(false);
      }
    };

    if (categoryName) {
      fetchCategoryProducts();
    }
  }, [categoryName]);

  const getDemoProductsForCategory = (
    category: string | undefined
  ): Product[] => {
    const baseProducts: Record<string, Product[]> = {
      antibiotics: [
        {
          id: "ab1",
          name: "Amoxicillin 500mg",
          description: "Broad-spectrum antibiotic for bacterial infections",
          price: 1200,
          originalPrice: 1500,
          discount: 20,
          category: "Antibiotics",
          rating: 4.7,
          reviewCount: 156,
          stockCount: 25,
          imageUrl: "/api/placeholder/300/200",
          isPopular: true,
          freeShippingEligible: true,
        },
        {
          id: "ab2",
          name: "Ciprofloxacin 250mg",
          description: "Antibiotic for urinary tract infections",
          price: 800,
          category: "Antibiotics",
          rating: 4.5,
          reviewCount: 89,
          stockCount: 18,
          imageUrl: "/api/placeholder/300/200",
          freeShippingEligible: true,
        },
        {
          id: "ab3",
          name: "Azithromycin 500mg",
          description: "Antibiotic for respiratory infections",
          price: 1500,
          originalPrice: 1800,
          discount: 17,
          category: "Antibiotics",
          rating: 4.8,
          reviewCount: 203,
          stockCount: 12,
          imageUrl: "/api/placeholder/300/200",
          isPopular: true,
          freeShippingEligible: true,
        },
      ],
      painkillers: [
        {
          id: "pk1",
          name: "Paracetamol 500mg",
          description: "Fast-acting pain relief and fever reducer",
          price: 450,
          category: "Painkillers",
          rating: 4.6,
          reviewCount: 324,
          stockCount: 50,
          imageUrl: "/api/placeholder/300/200",
          isPopular: true,
          freeShippingEligible: false,
        },
        {
          id: "pk2",
          name: "Ibuprofen 400mg",
          description: "Anti-inflammatory pain relief",
          price: 650,
          originalPrice: 800,
          discount: 19,
          category: "Painkillers",
          rating: 4.4,
          reviewCount: 198,
          stockCount: 35,
          imageUrl: "/api/placeholder/300/200",
          freeShippingEligible: false,
        },
        {
          id: "pk3",
          name: "Diclofenac 50mg",
          description: "Powerful anti-inflammatory for joint pain",
          price: 750,
          category: "Painkillers",
          rating: 4.7,
          reviewCount: 156,
          stockCount: 20,
          imageUrl: "/api/placeholder/300/200",
          freeShippingEligible: false,
        },
      ],
      vitamins: [
        {
          id: "vt1",
          name: "Vitamin D3 2000 IU",
          description: "Essential vitamin for bone health",
          price: 1200,
          category: "Vitamins",
          rating: 4.8,
          reviewCount: 267,
          stockCount: 30,
          imageUrl: "/api/placeholder/300/200",
          isPopular: true,
          freeShippingEligible: true,
        },
        {
          id: "vt2",
          name: "Vitamin C 1000mg",
          description: "Immune system support vitamin",
          price: 900,
          originalPrice: 1100,
          discount: 18,
          category: "Vitamins",
          rating: 4.6,
          reviewCount: 189,
          stockCount: 45,
          imageUrl: "/api/placeholder/300/200",
          freeShippingEligible: true,
        },
        {
          id: "vt3",
          name: "Multivitamin Complex",
          description: "Complete daily nutrition supplement",
          price: 1800,
          category: "Vitamins",
          rating: 4.9,
          reviewCount: 341,
          stockCount: 22,
          imageUrl: "/api/placeholder/300/200",
          isPopular: true,
          freeShippingEligible: true,
        },
      ],
    };

    return baseProducts[category?.toLowerCase() || ""] || [];
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "name":
        return a.name.localeCompare(b.name);
      default: // 'popular'
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    }
  });

  if (!currentCategory) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Category Not Found
            </h1>
            <button
              onClick={() => navigate("/products")}
              className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              Browse All Products
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <>
      <SEOHelmet
        title={`${currentCategory.title} - Buy Online | Malric Pharma Kenya`}
        description={`${
          currentCategory.description
        }. Quality ${currentCategory.title.toLowerCase()} with fast delivery in Kenya. Licensed online pharmacy.`}
        keywords={`${currentCategory.title.toLowerCase()} Kenya, buy ${currentCategory.title.toLowerCase()} online, pharmacy Kenya`}
        url={`https://malricpharma.co.ke/category/${categoryName}`}
      />

      <MainLayout>
        <div className="min-h-screen bg-gray-50">
          {/* Category Header */}
          <div
            className={`bg-gradient-to-r ${currentCategory.color} text-white py-12`}
          >
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => navigate("/products")}
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-medium">Back to Products</span>
                </button>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{currentCategory.emoji}</span>
                <div>
                  <h1 className="text-4xl font-bold mb-2">
                    {currentCategory.title}
                  </h1>
                  <p className="text-xl text-white/90">
                    {currentCategory.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 mt-6">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  <span className="font-medium">
                    {filteredProducts.length} Products Available
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-300" />
                  <span className="font-medium">Top Quality Products</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                {/* Search */}
                <div className="md:col-span-2">
                  <SearchBar onSearch={setSearch} />
                </div>

                {/* Sort and View Controls */}
                <div className="flex items-center gap-3">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="name">Name A-Z</option>
                  </select>

                  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 ${
                        viewMode === "grid"
                          ? "bg-primary text-white"
                          : "bg-white text-gray-600"
                      } transition-colors`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 ${
                        viewMode === "list"
                          ? "bg-primary text-white"
                          : "bg-white text-gray-600"
                      } transition-colors`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or browse other categories
                </p>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                }`}
              >
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default CategoryPage;
