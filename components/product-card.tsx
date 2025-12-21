"use client";

import Image from "next/image";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { Products } from "@/types/products";
import { Star, ShoppingCart, Check } from "lucide-react";
import React, { useState, useEffect } from "react";
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
    e.stopPropagation()
    addItem(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const showDiscount = product.discountPercentage > 9;
  const discountedPrice = showDiscount
    ? (product.price - (product.price * product.discountPercentage) / 100).toFixed(2)
    : null;


    const handleCardClick = () => {
    router.push(`/products/${product.id}`);
    }
  return (
    <Card
      className="
      w-full 
      max-w-[200px] 
      sm:max-w-[240px]
      md:max-w-[260px]
      lg:w-48  
      rounded-lg 
      border-0 shadow-none
      pb-3 
      pt-0
      duration-300 
      cursor-pointer
      gap-1
    "
    >
      {/* Imagen */}
      <div className="bg-[#F8F8F8] rounded-t-lg relative p-2 md:p-3" onClick={handleCardClick}>
        <button
          className={`
          absolute 
          top-2 right-2 
          sm:top-3 sm:right-3
          rounded-full 
          ${added ? 'bg-green-100' : 'bg-white'}
          p-2
          shadow-md 
          z-10
          transition-all
          ${justAdded ? 'scale-110' : 'scale-100'}
        `}
          onClick={handleAddToCart}
        >
          {added ? (
            <Check className="text-green-500" width={16} height={16} />
          ) : (
            <ShoppingCart className="text-gray-500" width={16} height={16} />
          )}
        </button>

        <Image
          src={product.images[0]}
          alt={product.title}
          width={300}
          height={300}
          className="
            w-full 
            h-32 
            sm:h-40 
            md:h-48 
            lg:h-40 
            object-contain
          "
        />
      </div>

      {/* Contenido */}
      <div className="flex flex-col items-start">
        <CardTitle
          className="
          text-sm 
          sm:text-base 
          font-semibold 
          line-clamp-1 
          mt-1
        "
        >
          {product.title}
        </CardTitle>

        <div className="flex gap-1 items-center">
          <Star
            className="fill-yellow-400 text-yellow-400"
            width={14}
            height={14}
          />
          <span className="text-xs sm:text-sm font-semibold">{product.rating}</span>
        </div>

        <div className="w-full h-px bg-gray-200 my-2"></div>

        {/* Precio */}
        {showDiscount ? (
          <div className="flex items-center gap-2">
            <span className="text-md sm:text-md font-semibold text-[red-500]">
              ${discountedPrice}
            </span>
            <span className="text-xs sm:text-sm text-gray-400 line-through">
              ${product.price}
            </span>
          </div>
        ) : (
          <CardDescription
            className="
              text-md 
              sm:text-lg 
              font-semibold 
              text-black
            "
          >
            ${product.price}
          </CardDescription>
        )}
      </div>
    </Card>
  );
}