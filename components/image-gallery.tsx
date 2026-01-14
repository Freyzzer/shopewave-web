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
  setSelectedImage 
}: ImageGalleryProps) {
  return (
<div>
                {/* Main Image */}
                <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square rounded-lg overflow-hidden bg-gray-100 mb-3 sm:mb-4">
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.title}
                    fill
                    className="object-contain p-2 sm:p-4 lg:p-6"
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                
                {/* Thumbnail Grid */}
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 gap-1 sm:gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                        selectedImage === index ? "border-blue-600 ring-2 ring-blue-200" : "border-gray-200 hover:border-gray-300"
                      }`}
                      aria-label={`View image ${index + 1} of ${product.title}`}
                    >
                      <Image
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 20vw, (max-width: 1024px) 15vw, 10vw"
                      />
                    </button>
                  ))}
                </div>
              </div>
  )
}
