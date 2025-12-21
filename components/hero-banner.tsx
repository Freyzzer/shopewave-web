'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      tag: '#Big Fashion Sale',
      title: 'Limited Time Offer!',
      subtitle: 'Up to 50% OFF!',
      description: 'Redefine Your Everyday Style',
      bgColor: 'bg-gray-100',
      image: '👕',
    },
    {
      tag: '#Summer Collection',
      title: 'Nueva Temporada',
      subtitle: 'Hasta 40% OFF!',
      description: 'Descubre las últimas tendencias',
      bgColor: 'bg-blue-50',
      image: '👗',
    },
    {
      tag: '#Sport Collection',
      title: 'Fitness & Active',
      subtitle: '30% de descuento!',
      description: 'Equipamiento deportivo premium',
      bgColor: 'bg-purple-50',
      image: '👟',
    },
  ];

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((p) => (p - 1 + slides.length) % slides.length);

  const goToSlide = (i) => setCurrentSlide(i);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slides Container */}
      <div className="relative h-[300px] sm:h-[350px] md:h-[450px] lg:h-[520px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 translate-x-0'
                : index < currentSlide
                ? 'opacity-0 -translate-x-full'
                : 'opacity-0 translate-x-full'
            }`}
          >
            <div className={`h-full ${slide.bgColor}`}>
              <div className="container mx-auto px-4 h-full">
                <div className="flex flex-col md:flex-row items-center justify-between h-full gap-6 md:gap-0">

                  {/* TEXT SECTION */}
                  <div className="flex-1 text-center md:text-left space-y-3 md:space-y-6 max-w-xl">

                    <span className="inline-block text-gray-600 text-sm md:text-base">
                      {slide.tag}
                    </span>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                      {slide.title}
                      <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                        {slide.subtitle}
                      </span>
                    </h1>

                    <p className="text-gray-600 text-base sm:text-lg md:text-xl">
                      {slide.description}
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 pt-4">
                      <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition duration-300">
                        Comprar Ahora
                      </button>
                      <button className="bg-white text-gray-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold border-2 border-gray-300 hover:border-gray-900 transition duration-300">
                        Ver Colección
                      </button>
                    </div>
                  </div>

                  {/* IMAGE / PRODUCT DISPLAY — hidden on mobile */}
                  <div className="hidden md:flex flex-1 items-center justify-center relative">
                    <div className="text-[140px] lg:text-[200px] opacity-20 absolute">
                      {slide.image}
                    </div>

                    <div className="relative z-10 grid grid-cols-2 gap-3 lg:gap-4 transform rotate-6 hover:rotate-0 transition duration-500">
                      <div className="w-24 h-32 lg:w-32 lg:h-40 bg-white rounded-lg shadow-xl flex items-center justify-center text-5xl lg:text-6xl">
                        👕
                      </div>
                      <div className="w-24 h-32 lg:w-32 lg:h-40 bg-gray-300 rounded-lg shadow-xl flex items-center justify-center text-5xl lg:text-6xl mt-4">
                        👕
                      </div>
                      <div className="w-24 h-32 lg:w-32 lg:h-40 bg-black rounded-lg shadow-xl flex items-center justify-center text-5xl lg:text-6xl -mt-3">
                        👕
                      </div>
                      <div className="w-24 h-32 lg:w-32 lg:h-40 bg-white rounded-lg shadow-xl flex items-center justify-center text-5xl lg:text-6xl mt-3">
                        👟
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ARROWS */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 sm:p-3 rounded-full shadow-lg transition z-10"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 sm:p-3 rounded-full shadow-lg transition z-10"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-7 h-2.5 bg-gradient-to-r from-blue-600 to-purple-600'
                : 'w-2.5 h-2.5 bg-gray-400 hover:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
