'use client';
import { useRef, useState } from "react";

const categories = [
  { id: "beauty", name: "Beauty", emoji: "💄" },
  { id: "fragrances", name: "Fragrances", emoji: "🌸" },
  { id: "furniture", name: "Furniture", emoji: "🛋️" },
  { id: "home-decoration", name: "Home", emoji: "🏠" },
  { id: "laptops", name: "Laptops", emoji: "💻" },
  { id: "mens-shirts", name: "Men's Shirts", emoji: "👔" },
  { id: "skin-care", name: "Skin Care", emoji: "🧴" },
  { id: "smartphones", name: "Smartphones", emoji: "📲" },
  { id: "tops", name: "Tops", emoji: "👕" },
  { id: "womens-dresses", name: "Women's Dresses", emoji: "👗" },
  { id: "womens-jewellery", name: "Jewellery", emoji: "💍" },
];

export default function CategoryList() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: { pageX: number; }) => {
    const slider = scrollRef.current;
    if (!slider) return;
    setIsDown(true);
    setStartX(e.pageX - slider.offsetLeft);
    setScrollLeft(slider.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: { preventDefault: () => void; pageX: number; }) => {
    if (!isDown) return;
    e.preventDefault();
    const slider = scrollRef.current;
    if (!slider) return;
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="w-full bg-white py-6">
      <div className="mx-auto px-4 w-full flex justify-center [&_div]:items-center flex-col childre">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Shop by Category
        </h2>   
        
        {/* Scrollable container */}
        <div 
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="overflow-x-auto pb-4 scrollbar-hide cursor-grab active:cursor-grabbing select-none w-full flex justify-center"
        >
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
          <div className="flex gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                className="group flex flex-col items-center gap-2 transition-transform hover:scale-105"
              >
                {/* Circle with emoji */}
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 text-3xl shadow-sm transition-shadow group-hover:shadow-md">
                  {category.emoji}
                </div>
                
                {/* Category name */}
                <span className="text-center text-xs font-medium text-gray-700 group-hover:text-blue-600">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}