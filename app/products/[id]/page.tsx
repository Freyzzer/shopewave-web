"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Star, ShoppingCart, Heart, Truck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Products } from "@/types/products";
import { getProductsById } from "@/lib/services/productServices";
import BackButton from "@/components/back-button";
import ImageGallery from "@/components/image-gallery";
import { useCart } from "@/hooks/use-cart";



export default function ProductDetailPage() {
  const params = useParams();
  const { addItem, items } = useCart();
  const router = useRouter();
  const [product, setProduct] = useState<Products | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
        setLoading(true);
        try {
            const data = await getProductsById(Number(params.id));
            setProduct(data);
        }catch (error) {
            console.error("Error fetching product:", error);
        } finally {
            setLoading(false);
        }
    }

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      if (product) {
        addItem(product);
      }
    };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Product not found</p>
      </div>
    );
  }

  const discountedPrice = product.price - (product.price * product.discountPercentage / 100);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <BackButton title="Back to products" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg p-6">
          {/* Image Gallery */}
          <ImageGallery 
            product={product} 
            selectedImage={selectedImage} 
            setSelectedImage={setSelectedImage} 
          />

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-4">
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
              <p className="text-gray-600 mb-4">{product.brand}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews.length} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-blue-600">
                  ${discountedPrice.toFixed(2)}
                </span>
                {product.discountPercentage > 0 && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <Badge variant="destructive">-{product.discountPercentage}%</Badge>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {product.availabilityStatus} • {product.stock} in stock
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6">{product.description}</p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-6 py-2 border-x border-gray-300">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Truck className="h-5 w-5 text-blue-600" />
                <span>{product.shippingInformation}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="h-5 w-5 text-blue-600" />
                <span>{product.warrantyInformation}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">
                Reviews ({product.reviews.length})
              </TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-4">Specifications</h3>
                  <dl className="space-y-2">
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-gray-600">SKU:</dt>
                      <dd className="font-medium">{product.sku}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-gray-600">Brand:</dt>
                      <dd className="font-medium">{product.brand}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-gray-600">Weight:</dt>
                      <dd className="font-medium">{product.weight} kg</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-gray-600">Dimensions:</dt>
                      <dd className="font-medium">
                        {product.dimensions.width} × {product.dimensions.height} ×{" "}
                        {product.dimensions.depth} cm
                      </dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-4">
                {product.reviews.map((review, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold">{review.reviewerName}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Shipping Information</h3>
                  <p className="text-gray-700">{product.shippingInformation}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Return Policy</h3>
                  <p className="text-gray-700">{product.returnPolicy}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Warranty</h3>
                  <p className="text-gray-700">{product.warrantyInformation}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Minimum Order</h3>
                  <p className="text-gray-700">
                    Minimum order quantity: {product.minimumOrderQuantity}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}