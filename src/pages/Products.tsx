import MainLayout from "../components/MainLayout";
import SearchBar from "../components/SearchBar";
import ProductList from "../components/ProductList";
import CategoryFilter from "../components/CategoryFilter";
import CategoryGrid from "../components/CategoryGrid";
import Pagination from "../components/Pagination";
import PromoBanner from "../components/PromoBanner";
// import UrgencyTimer from "../components/UrgencyTimer";
import TrustBadges from "../components/TrustBadges";
import RecentPurchaseNotification from "../components/RecentPurchaseNotification";
import HeroCarousel from "../components/HeroCarousel";
import SEOHelmet from "../components/SEOHelmet";
import { useEffect, useState } from "react";
import { api } from "../utils/axios";
import { Star, Users, Zap } from "lucide-react";
import { useProductFilter } from "../utils/productFilters";

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

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showCategoryGrid, setShowCategoryGrid] = useState(false);
  const limit = 10;

  // Flash sale end time (24 hours from now for demo)
  // const flashSaleEndTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const queryParams = new URLSearchParams();
        queryParams.append("page", currentPage.toString());
        queryParams.append("limit", limit.toString());
        if (category !== "All") {
          queryParams.append("category", category);
        }

        const res = await api.get(`/products?${queryParams.toString()}`);

        // Enhance products with sales data for demo
        const enhancedProducts = res.data.products.map(
          (product: Product, index: number) => ({
            ...product,
            originalPrice: index % 3 === 0 ? product.price * 1.3 : undefined,
            discount:
              index % 3 === 0 ? Math.floor(Math.random() * 25) + 15 : undefined,
            isPopular: index % 4 === 0,
            stockCount: Math.floor(Math.random() * 50) + 5,
            rating: 3.5 + Math.random() * 1.5,
          })
        );

        setProducts(enhancedProducts);
        setTotalPages(Math.ceil(res.data.total / limit));
      } catch (err: unknown) {
        console.error("Failed to fetch products", err);

        // Enhanced demo data with sales features
        const demoProducts: Product[] = [
          {
            id: "1",
            name: "Paracetamol 500mg",
            description:
              "Fast-acting pain relief and fever reducer. Trusted by millions worldwide.",
            price: 850,
            originalPrice: 1200,
            discount: 30,
            isPopular: true,
            stockCount: 8,
            rating: 4.8,
            reviewCount: 156,
            viewingCount: 12,
            lastPurchased: "2 hours ago",
            freeShippingEligible: true,
            category: "Painkillers",
            imageUrl: "/api/placeholder/300/200",
          },
          {
            id: "2",
            name: "Amoxicillin 250mg",
            description:
              "Broad-spectrum antibiotic for bacterial infections. Doctor recommended.",
            price: 1500,
            originalPrice: 1800,
            discount: 17,
            stockCount: 15,
            rating: 4.6,
            reviewCount: 89,
            viewingCount: 6,
            lastPurchased: "1 hour ago",
            freeShippingEligible: true,
            category: "Antibiotics",
            imageUrl: "/api/placeholder/300/200",
          },
          {
            id: "3",
            name: "Vitamin D3 Tablets",
            description:
              "Essential vitamin for bone health and immune system support.",
            price: 1200,
            isPopular: true,
            stockCount: 25,
            rating: 4.7,
            reviewCount: 203,
            viewingCount: 8,
            lastPurchased: "30 minutes ago",
            freeShippingEligible: false,
            category: "Vitamins",
            imageUrl: "/api/placeholder/300/200",
          },
          {
            id: "4",
            name: "Ibuprofen 400mg",
            description:
              "Anti-inflammatory pain relief. Effective for headaches and muscle pain.",
            price: 950,
            originalPrice: 1300,
            discount: 25,
            stockCount: 5,
            rating: 4.5,
            reviewCount: 127,
            viewingCount: 15,
            lastPurchased: "45 minutes ago",
            freeShippingEligible: true,
            category: "Painkillers",
            imageUrl: "/api/placeholder/300/200",
          },
          {
            id: "5",
            name: "Multivitamin Complex",
            description:
              "Complete daily nutrition with 20+ essential vitamins and minerals.",
            price: 1800,
            originalPrice: 2200,
            discount: 18,
            isPopular: true,
            stockCount: 12,
            rating: 4.9,
            reviewCount: 245,
            viewingCount: 9,
            lastPurchased: "15 minutes ago",
            freeShippingEligible: true,
            category: "Vitamins",
            imageUrl: "/api/placeholder/300/200",
          },
          {
            id: "6",
            name: "Omega-3 Fish Oil",
            description:
              "High-quality fish oil for heart health and brain function.",
            price: 2200,
            stockCount: 18,
            rating: 4.4,
            reviewCount: 78,
            viewingCount: 4,
            lastPurchased: "3 hours ago",
            freeShippingEligible: true,
            category: "Supplements",
            imageUrl: "/api/placeholder/300/200",
          },
          {
            id: "7",
            name: "Azithromycin 500mg",
            description:
              "Antibiotic for respiratory tract infections. Effective against bacteria.",
            price: 1800,
            originalPrice: 2100,
            discount: 14,
            stockCount: 10,
            rating: 4.7,
            reviewCount: 145,
            viewingCount: 7,
            lastPurchased: "1 hour ago",
            freeShippingEligible: true,
            category: "Antibiotics",
            imageUrl: "/api/placeholder/300/200",
          },
          {
            id: "8",
            name: "Baby Paracetamol Syrup",
            description:
              "Safe and effective fever reducer for infants and children.",
            price: 650,
            stockCount: 20,
            rating: 4.8,
            reviewCount: 89,
            viewingCount: 3,
            lastPurchased: "2 hours ago",
            freeShippingEligible: false,
            category: "Baby Care",
            imageUrl: "/api/placeholder/300/200",
          },
          {
            id: "9",
            name: "First Aid Bandages",
            description:
              "Sterile adhesive bandages for cuts and wounds. Pack of 50.",
            price: 450,
            stockCount: 35,
            rating: 4.3,
            reviewCount: 67,
            viewingCount: 2,
            lastPurchased: "4 hours ago",
            freeShippingEligible: false,
            category: "First Aid",
            imageUrl: "/api/placeholder/300/200",
          },
          {
            id: "10",
            name: "Vitamin C 1000mg",
            description:
              "Immune system booster. High-potency vitamin C tablets.",
            price: 1100,
            originalPrice: 1400,
            discount: 21,
            isPopular: true,
            stockCount: 30,
            rating: 4.6,
            reviewCount: 234,
            viewingCount: 11,
            lastPurchased: "1 hour ago",
            freeShippingEligible: true,
            category: "Vitamins",
            imageUrl: "/api/placeholder/300/200",
          },
          {
            id: "11",
            name: "Protein Powder",
            description:
              "Whey protein supplement for muscle building and recovery.",
            price: 3200,
            stockCount: 8,
            rating: 4.5,
            reviewCount: 156,
            viewingCount: 5,
            lastPurchased: "3 hours ago",
            freeShippingEligible: true,
            category: "Supplements",
            imageUrl: "/api/placeholder/300/200",
          },
          {
            id: "12",
            name: "Diclofenac 50mg",
            description:
              "Anti-inflammatory medication for joint pain and arthritis.",
            price: 750,
            stockCount: 15,
            rating: 4.4,
            reviewCount: 98,
            viewingCount: 6,
            lastPurchased: "2 hours ago",
            freeShippingEligible: false,
            category: "Painkillers",
            imageUrl: "/api/placeholder/300/200",
          },
        ];

        setProducts(demoProducts);
        setTotalPages(1);
      }
    };

    fetchProducts();
  }, [currentPage, category]);

  // Use the product filter service
  const { filteredProducts, stats, filteredCount } = useProductFilter(
    products,
    {
      search,
      category,
      sortBy: "popular",
      sortOrder: "desc",
    }
  );

  // Debug logging
  console.log("Current category:", category);
  console.log("Total products:", products.length);
  console.log("Filtered products:", filteredCount);
  console.log("Products by category:", stats);

  return (
    <>
      <SEOHelmet
        title="Online Pharmacies Kenya - Malric Pharma | Buy Medicines Online"
        description="Leading online pharmacy in Kenya. Buy prescription drugs, over-the-counter medicines & health products online. Licensed pharmacy with free same-day delivery in Nairobi."
        keywords="online pharmacies Kenya, online pharmacy Kenya, buy medicines online Kenya, prescription drugs Kenya, pharmacy Kenya, medical supplies Kenya, online chemist Kenya"
        url="https://malricpharma.co.ke/products"
        schema={{
          "@context": "https://schema.org",
          "@type": "Pharmacy",
          name: "Malric Pharma",
          description:
            "Kenya's leading online pharmacy offering quality medicines and health products",
          url: "https://malricpharma.co.ke",
          address: {
            "@type": "PostalAddress",
            streetAddress: "123 Kimathi Street",
            addressLocality: "Nairobi",
            addressCountry: "Kenya",
          },
          telephone: "+254-700-000-000",
          openingHours: "Mo-Su 00:00-24:00",
          priceRange: "$$",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            reviewCount: "256",
          },
        }}
      />
      <MainLayout>
        <div className="min-h-screen bg-gray-50">
          {/* Hero Carousel */}
          <HeroCarousel className="mb-0" />

          {/* Flash Sale Timer - Prominent Placement */}
          {/* <div className="bg-red-600 text-white py-4">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center">
                <UrgencyTimer
                  endTime={flashSaleEndTime}
                  className="max-w-md mx-auto"
                />
              </div>
            </div>
          </div> */}

          {/* Main SEO Heading */}
          <div className="bg-white py-8">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <h1 className="text-4xl font-bold text-secondary mb-4">
                Online Pharmacies Kenya - Licensed & Trusted
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Malric Pharma is among the leading online pharmacies in Kenya,
                offering quality medicines, prescription drugs, and health
                products with free same-day delivery in Nairobi.
              </p>
            </div>
          </div>

          {/* Promotional Banners */}
          <div className="bg-gray-100 py-6">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <PromoBanner type="flash-sale" />
                <PromoBanner type="free-shipping" />
                <PromoBanner type="first-time" />
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="bg-white py-6 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
              <TrustBadges />
            </div>
          </div>

          {/* Social Proof */}
          <div className="bg-green-50 py-4 border-b border-green-100">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center justify-center gap-8 text-center">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    10,000+ Happy Customers
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-green-800">
                    4.8/5 Average Rating
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    Same Day Delivery
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-secondary mb-2">
                🔥 Hot Deals & Best Sellers
              </h2>
              <p className="text-grayText">
                Discover our most popular medications with exclusive discounts
              </p>
            </div>

            {/* Category Grid Toggle */}
            <div className="text-center mb-8">
              <button
                onClick={() => setShowCategoryGrid(!showCategoryGrid)}
                className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {showCategoryGrid ? "Hide Categories" : "Shop by Category"}
              </button>
            </div>

            {/* Category Grid */}
            {showCategoryGrid && (
              <div className="mb-12">
                <CategoryGrid
                  onCategorySelect={(cat) => {
                    setCategory(cat);
                    setShowCategoryGrid(false);
                  }}
                />
              </div>
            )}

            {/* Search and Filter */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SearchBar onSearch={setSearch} />
                <CategoryFilter
                  categories={[
                    "Antibiotics",
                    "Painkillers",
                    "Vitamins",
                    "Supplements",
                    "Baby Care",
                    "First Aid",
                  ]}
                  selectedCategory={category}
                  onCategoryChange={setCategory}
                />
              </div>

              {/* Filter Results Info */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>
                    {category && category !== "All" ? (
                      <>
                        Showing <strong>{filteredCount}</strong> products in{" "}
                        <strong>{category}</strong>
                      </>
                    ) : (
                      <>
                        Showing <strong>{filteredCount}</strong> products
                        {search && (
                          <>
                            {" "}
                            matching "<strong>{search}</strong>"
                          </>
                        )}
                      </>
                    )}
                  </span>
                  {(category || search) && (
                    <button
                      onClick={() => {
                        setCategory("All");
                        setSearch("");
                      }}
                      className="text-primary hover:text-primary/80 font-medium"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="mb-8">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {category && category !== "All"
                      ? `No products available in "${category}" category`
                      : search
                      ? `No products match "${search}"`
                      : "No products available"}
                  </p>
                  <button
                    onClick={() => {
                      setCategory("All");
                      setSearch("");
                    }}
                    className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Clear filters & browse all products
                  </button>
                </div>
              ) : (
                <ProductList products={filteredProducts} />
              )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>

          {/* Bottom CTA Section */}
          <div className="bg-secondary text-white py-12">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h3 className="text-3xl font-bold mb-4">
                Need Help Finding the Right Medication?
              </h3>
              <p className="text-lg text-gray-300 mb-6">
                Our licensed pharmacists are available 24/7 to provide
                professional consultation
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+254708733882"
                  className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  📞 Call Pharmacist Now
                </a>
                <a
                  href="https://wa.me/+254708733882"
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  💬 WhatsApp Consultation
                </a>
              </div>
            </div>
          </div>

          {/* Recent Purchase Notifications */}
          <RecentPurchaseNotification />
        </div>
      </MainLayout>
    </>
  );
}

export default Products;
