"use client";

import { useState, useEffect, useMemo } from "react";
import { Loader2, ChevronRight, ChevronLeft } from "lucide-react";
import ProductCard from "@/components/product-card";
import { CategoryItem, ProductFiltersState, Products } from "@/types/products";
import { getAllCategories } from "@/lib/services/productServices";
import { API_URL, ITEMS_PER_PAGE } from "@/constant/constants";
import { ProductFilters } from "@/components/filter";

export default function ProductsPage() {
  const [products, setProducts] = useState<Products[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [filters, setFilters] = useState<ProductFiltersState>({
    search: "",
    categories: [],
    priceRange: [0, 200000],
    minRating: 0,
    onlyStock: false,
    sortBy: "relevance",
  });

  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  useEffect(() => {
    fetchProducts();
    setCurrentPage(1);
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const skip = (currentPage - 1) * ITEMS_PER_PAGE;
      let endpoint = `${API_URL}?limit=${ITEMS_PER_PAGE}&skip=${skip}`;

      if (filters.categories.length === 1) {
        endpoint = `${API_URL}/category/${filters.categories[0]}?limit=${ITEMS_PER_PAGE}&skip=${skip}`;
      }

      const res = await fetch(endpoint);
      const data = await res.json();

      setProducts(data.products);
      setTotalProducts(data.total ?? data.products.length);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    const categoriesFilters = filters.categories.map((str) =>
      str.toLocaleLowerCase()
    );

    if (filters.categories.length) {
      result = result.filter((p) =>
        categoriesFilters.includes(p.category)
      );
    }

    result = result.filter(
      (p) =>
        p.price >= filters.priceRange[0] &&
        p.price <= filters.priceRange[1]
    );

    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }

    if (filters.onlyStock) {
      result = result.filter((p) => p.stock > 0);
    }

    switch (filters.sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [products, filters]);

  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 lg:px-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          All Products
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Browse our full collection of {totalProducts} products
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr]">
        {/* Filters */}
        <aside aria-label="Product filters">
          <ProductFilters
            categories={categories}
            value={filters}
            onChange={setFilters}
          />
        </aside>

        {/* Products Grid */}
        <div>
          {loading ? (
            <div className="flex justify-center py-20" role="status">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" aria-hidden="true" />
              <span className="sr-only">Loading products...</span>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-lg font-medium text-foreground">
                No products found
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your filters
              </p>
            </div>
          ) : (
            <>
              <ul
                className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
                role="list"
                aria-label="Product list"
              >
                {filteredProducts.map((product) => (
                  <li key={product.id}>
                    <ProductCard {...product} />
                  </li>
                ))}
              </ul>

              {totalPages > 1 && (
                <nav className="mt-10 flex items-center justify-center gap-3" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted disabled:opacity-40"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  </button>

                  <span className="text-sm text-muted-foreground" aria-live="polite">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted disabled:opacity-40"
                    aria-label="Next page"
                  >
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
