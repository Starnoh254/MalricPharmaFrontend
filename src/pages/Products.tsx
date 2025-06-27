import MainLayout from "../components/MainLayout";
import SearchBar from "../components/SearchBar";
import ProductList from "../components/ProductList";
import CategoryFilter from "../components/CategoryFilter";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import { api } from "../utils/axios";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: string;
}

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

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
        setProducts(res.data.products);
        setTotalPages(Math.ceil(res.data.total / limit));
      } catch (err: unknown) {
        console.error("Failed to fetch products", err);

        // If it's a 401 error, don't redirect - just handle gracefully
        if (err && typeof err === "object" && "response" in err) {
          const error = err as { response?: { status?: number } };
          if (error.response?.status === 401) {
            console.log(
              "Products require authentication, showing limited view"
            );
            // Could show a message or limited product list
          }
        }
      }
    };

    fetchProducts();
  }, [currentPage, category]);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Available Drugs</h2>
        <SearchBar onSearch={setSearch} />
        <CategoryFilter
          categories={["Antibiotics", "Painkillers"]}
          selectedCategory={category}
          onCategoryChange={setCategory}
        />
        <ProductList products={filteredProducts} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </MainLayout>
  );
}

export default Products;
