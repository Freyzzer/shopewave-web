"use client";

import { Products } from "@/types/products";
import ProductCard from "./product-card";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCarouselProps {
  products: Products[];
  title?: string;
}

export default function ProductCarousel({ products, title }: ProductCarouselProps) {
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
    <div className="w-full">
      {title && (
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
      )}
      
      <div className="relative group">
        {/* Botón Izquierdo */}
        {canScrollLeft && (
          <Button
            onClick={() => scroll("left")}
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full shadow-lg bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}

        {/* Botón Derecho */}
        {canScrollRight && (
          <Button
            onClick={() => scroll("right")}
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full shadow-lg bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}

        {/* Contenedor del Carousel */}
        <ul
          ref={scrollRef}
          onScroll={checkScrollButtons}
          className="flex overflow-x-auto scrollbar-hide gap-10 pb-4 scroll-smooth"
        >

          {products.map((product: Products) => (
            <li key={product.id} className="shrink-0">
              <ProductCard {...product} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
