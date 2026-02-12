import { Products } from "@/types/products";
import Image from "next/image";

interface ImageGalleryProps {
  product: Products;
  selectedImage: number;
  setSelectedImage: (index: number) => void;
}

export default function ImageGallery({
  product,
  selectedImage,
  setSelectedImage,
}: ImageGalleryProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        <Image
          src={product.images[selectedImage]}
          alt={`${product.title} - Image ${selectedImage + 1}`}
          fill
          className="object-contain p-6"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnails */}
      <div
        className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-4"
        role="radiogroup"
        aria-label="Product image thumbnails"
      >
        {product.images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-square overflow-hidden rounded-md border-2 transition-all hover:opacity-80 ${
              selectedImage === index
                ? "border-foreground"
                : "border-border"
            }`}
            role="radio"
            aria-checked={selectedImage === index}
            aria-label={`View image ${index + 1} of ${product.images.length}`}
          >
            <Image
              src={image}
              alt={`${product.title} thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 20vw, 10vw"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
