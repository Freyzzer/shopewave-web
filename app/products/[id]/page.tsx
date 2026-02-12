"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Star, ShoppingBag, Heart, Truck, Shield, Minus, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Products } from "@/types/products";
import { getProductsById } from "@/lib/services/productServices";
import BackButton from "@/components/back-button";
import ImageGallery from "@/components/image-gallery";
import { useCart } from "@/hooks/use-cart";

export default function ProductDetailPage() {
  const params = useParams();
  const { addItem } = useCart();

  const [product, setProduct] = useState<Products | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showAddedToast, setShowAddedToast] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getProductsById(Number(params.id));
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem(product);
      }
      setShowAddedToast(true);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center" role="status">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-foreground" aria-hidden="true" />
        <span className="sr-only">Cargando producto...</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center">
        <p className="text-lg text-muted-foreground">Producto no encontrado</p>
      </div>
    );
  }

  const discountedPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 lg:px-6 lg:py-10">
      <BackButton title="Volver" />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        <ImageGallery
          product={product}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />

        <div className="flex flex-col">
          <Badge
            variant="secondary"
            className="mb-3 w-fit text-xs font-medium"
          >
            {product.category}
          </Badge>

          <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl text-balance">
            {product.title}
          </h1>

          {product.brand && (
            <p className="mt-1 text-sm text-muted-foreground">
              {product.brand}
            </p>
          )}

          <div className="mt-4 flex items-center gap-2">
            <div className="flex items-center" aria-label={`Rating: ${product.rating} out of 5`}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? "fill-foreground text-foreground"
                      : "text-border"
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviews.length} reviews)
            </span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-semibold text-foreground">
              ${discountedPrice.toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </span>
                <Badge variant="secondary" className="text-xs font-medium">
                  -{Math.round(product.discountPercentage)}%
                </Badge>
              </>
            )}
          </div>

          <p className="mt-2 text-xs text-muted-foreground">
            {product.availabilityStatus} &middot; {product.stock} disponibles
          </p>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-8 flex items-center gap-4">
            <span className="text-sm font-medium text-foreground">
              Cantidad
            </span>
            <div className="flex items-center rounded-md border border-border">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-9 w-9 items-center justify-center transition-colors hover:bg-muted"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <span
                className="flex h-9 w-12 items-center justify-center border-x border-border text-sm font-medium"
                aria-live="polite"
                aria-label={`Quantity: ${quantity}`}
              >
                {quantity}
              </span>
              <button
                onClick={() =>
                  setQuantity(Math.min(product.stock, quantity + 1))
                }
                className="flex h-9 w-9 items-center justify-center transition-colors hover:bg-muted"
                aria-label="Increase quantity"
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Button
              onClick={handleAddToCart}
              className="flex-1 gap-2"
              size="lg"
            >
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              Agregar al Carrito
            </Button>
            <Button
              variant="outline"
              size="lg"
              aria-label="Add to wishlist"
            >
              <Heart className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6">
            <div className="flex items-start gap-2">
              <Truck className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <span className="text-xs leading-relaxed text-muted-foreground">
                {product.shippingInformation}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Shield className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <span className="text-xs leading-relaxed text-muted-foreground">
                {product.warrantyInformation}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 rounded-lg border border-border bg-card p-4 md:p-6">
        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details" className="text-xs sm:text-sm">
              Detalles
            </TabsTrigger>
            <TabsTrigger value="reviews" className="text-xs sm:text-sm">
              Reseñas ({product.reviews.length})
            </TabsTrigger>
            <TabsTrigger value="shipping" className="text-xs sm:text-sm">
              Envío
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <h3 className="mb-4 text-sm font-semibold text-foreground">
                  Specifications
                </h3>
                <dl className="flex flex-col gap-0">
                  {[
                    ["SKU", product.sku],
                    ["Brand", product.brand],
                    ["Weight", `${product.weight} kg`],
                    [
                      "Dimensions",
                      `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} cm`,
                    ],
                  ].map(([label, val]) => (
                    <div
                      key={label}
                      className="flex justify-between border-b border-border py-2.5"
                    >
                      <dt className="text-sm text-muted-foreground">
                        {label}
                      </dt>
                      <dd className="text-sm font-medium text-foreground">
                        {val}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div>
                <h3 className="mb-4 text-sm font-semibold text-foreground">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {product.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="flex flex-col gap-4">
              {product.reviews.map((review, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-border p-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {review.reviewerName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex" aria-label={`${review.rating} out of 5 stars`}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < review.rating
                              ? "fill-foreground text-foreground"
                              : "text-border"
                          }`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shipping" className="mt-6">
            <div className="flex flex-col gap-6">
              {[
                ["Shipping", product.shippingInformation],
                ["Return Policy", product.returnPolicy],
                ["Warranty", product.warrantyInformation],
                [
                  "Minimum Order",
                  `Minimum order quantity: ${product.minimumOrderQuantity}`,
                ],
              ].map(([title, content]) => (
                <div key={title}>
                  <h3 className="mb-1 text-sm font-semibold text-foreground">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {content}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Sheet open={showAddedToast} onOpenChange={setShowAddedToast}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500" />
              Producto añadido
            </SheetTitle>
            <SheetDescription>
              {product?.title} ha sido añadido a tu carrito.
            </SheetDescription>
          </SheetHeader>
          <SheetFooter className="mt-6">
            <Button variant="outline" onClick={() => setShowAddedToast(false)}>
              Continuar comprando
            </Button>
            <Button asChild>
              <Link href="/cart">Ver carrito</Link>
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
