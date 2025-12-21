'use client'

import { useEffect, useState } from "react";
import CarouselProduct from "./carousel-products";
import TextLink from "./text-link";
import { getProductByPercentageDiscount, getRecentProducts, getTechProducts } from "@/lib/services/productServices";
import { Products } from "@/types/products";
import ProductCarousel from "./carousel-products";


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
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Cargando productos...</p>
      </div>
    );
  }
  return (
    <article>
        <section className="flex flex-col gap-6 mb-12 bg-white rounded-sm px-6 py-1">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-[#494049]">Flash Products</h1>
                <TextLink tittle="See All Products" />
            </div>
            <div>
                <ProductCarousel products={discountProducts} />
            </div>
        </section>

        <section className="flex flex-col gap-6 mb-12 bg-white rounded-sm px-6 py-1">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-[#494049]">Recent Products</h1>
                <TextLink tittle="See All Products" />
            </div>
            <div>
                <ProductCarousel products={recentProducts} />
            </div>
        </section>

        <section className="flex flex-col gap-6 mb-12 bg-white rounded-sm px-6 py-1">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-[#494049]">Tech Products</h1>
                <TextLink tittle="See All Products" />
            </div>
            <div>
                <ProductCarousel products={techProducts} />
            </div>
        </section>
    </article>
  )
}
