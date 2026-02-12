"use client";

import Image from "next/image";
import { Products } from "@/types/products";
import { Star, ShoppingBag, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";

export default function ProductCard(product: Products) {
  const { addItem, items } = useCart();
  const [added, setAdded] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isInCart = items.some((item) => item.id === product.id);
    setAdded(isInCart);
  }, [items, product.id]);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    addItem(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const showDiscount = product.discountPercentage > 9;
  const discountedPrice = showDiscount
    ? (
        product.price -
        (product.price * product.discountPercentage) / 100
      ).toFixed(2)
    : null;

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <article
      className="group flex w-44 shrink-0 cursor-pointer flex-col sm:w-48 md:w-52"
      aria-label={`${product.title} - $${showDiscount ? discountedPrice : product.price}`}
    >
      {/* Image */}
      <div
        className="relative aspect-square overflow-hidden rounded-lg bg-muted"
        onClick={handleCardClick}
        role="link"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleCardClick();
          }
        }}
        aria-label={`View ${product.title}`}
      >
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 176px, (max-width: 768px) 192px, 208px"
        />

        {/* Add to cart button */}
        <button
          className={`absolute bottom-2 right-2 flex items-center justify-center rounded-full p-2 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-ring ${
            added
              ? "bg-foreground text-background"
              : "bg-card text-foreground hover:bg-foreground hover:text-background"
          } ${justAdded ? "scale-110" : "scale-100"}`}
          onClick={handleAddToCart}
          aria-label={added ? `${product.title} is in cart` : `Add ${product.title} to cart`}
        >
          {added ? (
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
          )}
        </button>

        {/* Discount badge */}
        {showDiscount && (
          <span className="absolute left-2 top-2 rounded-full bg-foreground px-2 py-0.5 text-[10px] font-semibold text-background">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className="mt-3 flex flex-col gap-1">
        <h3 className="line-clamp-1 text-sm font-medium text-foreground">
          {product.title}
        </h3>

        <div className="flex items-center gap-1">
          <Star
            className="h-3 w-3 fill-foreground text-foreground"
            aria-hidden="true"
          />
          <span className="text-xs text-muted-foreground">
            {product.rating}
          </span>
        </div>

        {/* Price */}
        {showDiscount ? (
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-semibold text-foreground">
              ${discountedPrice}
            </span>
            <span className="text-xs text-muted-foreground line-through">
              ${product.price}
            </span>
          </div>
        ) : (
          <span className="text-sm font-semibold text-foreground">
            ${product.price}
          </span>
        )}
      </div>
    </article>
  );
}
