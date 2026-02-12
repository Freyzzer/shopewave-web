"use client";

import { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Products } from "@/types/products";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const API_URL = "https://dummyjson.com/products/search";

export default function AutocompleteSearch() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query.trim()) {
      setProducts([]);
      setIsOpen(false);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}?q=${query}&limit=8`);
        const data = await res.json();
        setProducts(data.products);
        setIsOpen(true);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    }, 400);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-xs" ref={containerRef} role="search">
      <label htmlFor="search-input" className="sr-only">
        Search products
      </label>
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          id="search-input"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (products.length > 0) setIsOpen(true);
          }}
          className="h-9 rounded-full border-border bg-muted pl-9 text-sm placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring"
          autoComplete="off"
          aria-expanded={isOpen}
          aria-controls="search-results"
          aria-autocomplete="list"
        />
      </div>

      {isOpen && (
        <div
          id="search-results"
          className="absolute top-full mt-2 w-full overflow-hidden rounded-lg border border-border bg-card shadow-lg"
          role="listbox"
          aria-label="Search results"
        >
          <div className="max-h-80 overflow-y-auto p-2">
            {loading && (
              <p className="px-3 py-4 text-center text-sm text-muted-foreground" role="status">
                Searching...
              </p>
            )}

            {!loading && products.length === 0 && query.trim() && (
              <p className="px-3 py-4 text-center text-sm text-muted-foreground">
                No products found
              </p>
            )}

            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                onClick={() => {
                  setIsOpen(false);
                  setQuery("");
                }}
                className="flex items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-muted"
                role="option"
                aria-selected={false}
              >
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={40}
                  height={40}
                  className="rounded-md object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {product.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ${product.price}
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="shrink-0 text-[10px]"
                >
                  {product.category}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
