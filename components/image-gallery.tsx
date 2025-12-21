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
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? "border-blue-600" : "border-gray-200"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
  )
}
