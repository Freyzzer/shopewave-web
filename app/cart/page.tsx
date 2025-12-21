"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/hooks/use-cart"


export default function CarritoPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCart()
  const total = getTotalPrice()

  if (items.length === 0) {
    return (
        <main className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-md mx-auto space-y-6">
                <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground" />
                <h1 className="font-serif text-3xl font-normal tracking-tight">Tu carrito está vacío</h1>
                <p className="text-muted-foreground leading-relaxed">
                Agrega productos a tu carrito para continuar con tu compra
                </p>
                <Link href="/products">
                <button>Explorar productos</button>
                </Link>
            </div>
            </div>
        </main>
    )
  }

  return (
    <>
      <main className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl lg:text-5xl font-normal tracking-tight mb-12 text-balance">
            Carrito de compras
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6 flex gap-6">
                    <div className="flex gap-4">
                        <Image
                          src={Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : "/placeholder.svg"}
                          alt={item.title}
                          className="object-cover"
                          width={100}
                            height={100}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between mb-2">
                          <Link href={`/products/${item.id}`}>
                            <h3 className="font-medium text-base hover:text-primary transition-colors">{item.title}</h3>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            aria-label="Eliminar producto"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4">${item.price}</p>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center border rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-12 text-center text-sm">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="font-medium">${item.price * item.quantity}</p>
                        </div>
                      </div>
                  </CardContent>
                </Card>
              ))}

              <Button variant="outline" onClick={clearCart} className="w-full bg-transparent">
                Vaciar carrito
              </Button>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-20">
                <CardContent className="p-6 space-y-6">
                  <h2 className="font-serif text-2xl font-normal tracking-tight">Resumen del pedido</h2>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Envío</span>
                      <span>{total >= 500 ? "Gratis" : "$50"}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-medium text-base">
                      <span>Total</span>
                      <span className="font-serif text-xl">
  ${(total >= 500 ? total : total + 50).toFixed(2)}
</span>
                    </div>
                  </div>

                  <Button size="lg" className="w-full">
                    Proceder al pago
                  </Button>

                  <Link href="/products">
                    <Button variant="outline" size="lg" className="w-full bg-transparent">
                      Continuar comprando
                    </Button>
                  </Link>

                  <div className="text-xs text-muted-foreground space-y-1 pt-4 border-t">
                    <p>• Envío gratis en compras superiores a $500</p>
                    <p>• Aceptamos todas las tarjetas</p>
                    <p>• Compra 100% segura</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
