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

    const categoriesFilters = filters.categories.map(str => str.toLocaleLowerCase())
    
    if (filters.categories.length) {
      result = result.filter((p) => categoriesFilters.includes(p.category));
    }
    
    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
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
    <div className="min-h-screen bg-white max-lg:flex max-lg:flex-col">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-1 lg:grid-cols-4">
        <ProductFilters
          categories={categories}
          value={filters}
          onChange={setFilters}
        />

        <div className="md:col-span-2 lg:col-span-3">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-20 text-center">
              <div className="text-6xl">🔍</div>
              <p className="mt-2 text-gray-600">No products found</p>
            </div>
          ) : (
            <>
              <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 ">
                {filteredProducts.map((product) => (
                  <li key={product.id}>
                    <ProductCard {...product} />
                  </li>
                ))}
              </ul>

              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="rounded-lg border p-2 disabled:opacity-50"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <span className="text-sm">Page {currentPage} of {totalPages}</span>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="rounded-lg border p-2 disabled:opacity-50"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
