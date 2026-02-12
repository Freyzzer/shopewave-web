"use client";

import { useEffect, useState } from "react";
import {
  getProductByPercentageDiscount,
  getRecentProducts,
  getTechProducts,
} from "@/lib/services/productServices";
import { Products } from "@/types/products";
import ProductCarousel from "./carousel-products";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      <Link
        href="/products"
        className="hidden items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:flex"
      >
        See all
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-16" role="status" aria-label="Loading products">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex flex-col gap-4">
          <div className="h-7 w-48 animate-pulse rounded bg-muted" />
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3, 4, 5].map((j) => (
              <div
                key={j}
                className="h-64 w-48 shrink-0 animate-pulse rounded-lg bg-muted"
              />
            ))}
          </div>
        </div>
      ))}
      <span className="sr-only">Loading products...</span>
    </div>
  );
}

export default function SectionProduct() {
  const [discountProducts, setDiscountProducts] = useState<Products[]>([]);
  const [recentProducts, setRecentProducts] = useState<Products[]>([]);
  const [techProducts, setTechProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const [discounts, recents, tech] = await Promise.all([
          getProductByPercentageDiscount(),
          getRecentProducts(),
          getTechProducts(),
        ]);

        setDiscountProducts(discounts);
        setRecentProducts(recents);
        setTechProducts(tech);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="flex flex-col gap-16">
      <section aria-labelledby="flash-heading">
        <SectionHeader
          title="Flash Deals"
          subtitle="Top discounts, limited time"
        />
        <div className="mt-6">
          <ProductCarousel products={discountProducts} />
        </div>
      </section>

      <section aria-labelledby="recent-heading">
        <SectionHeader title="New Arrivals" subtitle="Fresh picks just for you" />
        <div className="mt-6">
          <ProductCarousel products={recentProducts} />
        </div>
      </section>

      <section aria-labelledby="tech-heading">
        <SectionHeader
          title="Tech & Gadgets"
          subtitle="Latest in technology"
        />
        <div className="mt-6">
          <ProductCarousel products={techProducts} />
        </div>
      </section>
    </div>
  );
}
