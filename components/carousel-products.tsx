"use client";

import { Products } from "@/types/products";
import ProductCard from "./product-card";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductCarouselProps {
  products: Products[];
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    const slider = scrollRef.current;
    if (!slider) return;

    setCanScrollLeft(slider.scrollLeft > 0);
    setCanScrollRight(
      slider.scrollLeft < slider.scrollWidth - slider.clientWidth - 10
    );
  };

  const scroll = (direction: "left" | "right") => {
    const slider = scrollRef.current;
    if (!slider) return;

    const scrollAmount = slider.clientWidth * 0.8;
    const newScrollLeft =
      direction === "left"
        ? slider.scrollLeft - scrollAmount
        : slider.scrollLeft + scrollAmount;

    slider.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });

    setTimeout(checkScrollButtons, 300);
  };

  return (
    <div className="relative group" role="region" aria-label="Product carousel">
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute -left-3 top-1/3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card shadow-sm transition-all hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring opacity-0 group-hover:opacity-100"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute -right-3 top-1/3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card shadow-sm transition-all hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring opacity-0 group-hover:opacity-100"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      )}

      <ul
        ref={scrollRef}
        onScroll={checkScrollButtons}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-2 scrollbar-hide"
        role="list"
      >
        {products.map((product: Products) => (
          <li key={product.id} className="shrink-0">
            <ProductCard {...product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
