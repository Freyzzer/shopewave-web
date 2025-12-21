"use client";

import { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

// DummyJSON endpoint
const API_URL = "https://dummyjson.com/products/search";

export default function AutocompleteSearch() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setProducts([]);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      const res = await fetch(`${API_URL}?q=${query}&limit=20`);
      const data = await res.json();

      let filtered = data.products;

      if (categoryFilters.length) {
        filtered = filtered.filter((p: any) =>
          categoryFilters.includes(p.category)
        );
      }

      setProducts(filtered);
      setLoading(false);
    }, 400);
  }, [query, categoryFilters]);

  const toggleCategory = (cat: string) => {
    setCategoryFilters((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const categories = [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
  ];

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <Input
        placeholder="Buscar productos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="text-base md:w-xs lg:w-ms rounded-full flex items-center bg-white focus:shadow-none"
      />

      <AnimatePresence>
        {query && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 mt-2 w-full rounded-2xl shadow-xl bg-background"
          >
            <Card>
              <CardContent className="p-4 space-y-4">
                {/* Filtros */}
                <div className="space-y-3">
                  <p className="text-sm font-semibold">Categorías</p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <Badge
                        key={cat}
                        variant={categoryFilters.includes(cat) ? "default" : "outline"}
                        onClick={() => toggleCategory(cat)}
                        className="cursor-pointer"
                      >
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Resultados */}
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {loading && (
                    <p className="text-sm text-muted-foreground">Buscando...</p>
                  )}

                  {!loading && products.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      No se encontraron productos
                    </p>
                  )}

                  {products.map((product) => (
                    <motion.div
                      key={product.id}
                      whileHover={{ scale: 1.02 }}
                      className="flex gap-3 p-2 rounded-xl hover:bg-muted cursor-pointer"
                    >
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {product.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ${product.price} · {product.category}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
