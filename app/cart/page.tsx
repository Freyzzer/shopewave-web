"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/hooks/use-cart"


export default function CarritoPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCart()
  const total = getTotalPrice()
  const [openCheckoutDialog, setOpenCheckoutDialog] = useState(false)

  if (items.length === 0) {
    return (
        <div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center px-4 py-16">
        <ShoppingBag
          className="h-12 w-12 text-muted-foreground"
          aria-hidden="true"
        />
        <h1 className="mt-4 text-xl font-semibold text-foreground">
          Tu carrito está vacío
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Agrega productos a tu carrito para continuar con tu compra
        </p>
        <Link href="/products">
          <Button className="mt-6" variant="outline">
            Explorar productos
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 lg:px-6 lg:py-12">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
        Carrito de Compras
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {items.length} {items.length === 1 ? "producto" : "productos"} en tu carrito
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-lg border border-border bg-card p-4"
            >
              <Link href={`/products/${item.id}`} className="shrink-0">
                <Image
                  src={
                    Array.isArray(item.images) && item.images.length > 0
                      ? item.images[0]
                      : "/placeholder.svg"
                  }
                  alt={item.title}
                  width={80}
                  height={80}
                  className="h-20 w-20 rounded-md bg-muted object-contain p-2"
                />
              </Link>

              <div className="flex flex-1 flex-col justify-between gap-2 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <Link href={`/products/${item.id}`}>
                    <h3 className="text-sm font-medium text-foreground transition-colors hover:text-muted-foreground line-clamp-1">
                      {item.title}
                    </h3>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.title} from cart`}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground">
                  ${item.price} c/u
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-md border border-border">
                    <button
                      className="flex h-7 w-7 items-center justify-center transition-colors hover:bg-muted"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3 w-3" aria-hidden="true" />
                    </button>
                    <span className="flex h-7 w-8 items-center justify-center border-x border-border text-xs font-medium">
                      {item.quantity}
                    </span>
                    <button
                      className="flex h-7 w-7 items-center justify-center transition-colors hover:bg-muted"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3 w-3" aria-hidden="true" />
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <Button
            variant="ghost"
            onClick={clearCart}
            className="text-sm text-muted-foreground hover:text-destructive"
            >
              Vaciar carrito
            </Button>
        </div>

        {/* Order Summary */}
        <div>
          <div className="sticky top-20 rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground">
              Resumen del Pedido
            </h2>

            <div className="mt-6 flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Envío</span>
                <span className="text-foreground">
                  {total >= 500 ? "Gratis" : "$50.00"}
                </span>
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex justify-between">
                  <span className="font-medium text-foreground">Total</span>
                  <span className="text-lg font-semibold text-foreground">
                    ${(total >= 500 ? total : total + 50).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <Button size="lg" className="mt-6 w-full" onClick={() => setOpenCheckoutDialog(true)}>
              Proceder al Pago
            </Button>

            <Link href="/products" className="block mt-3">
              <Button variant="outline" size="lg" className="w-full">
                Continuar Comprando
              </Button>
            </Link>

            <div className="mt-6 border-t border-border pt-4">
              <ul className="flex flex-col gap-1 text-xs text-muted-foreground">
                <li>Envío gratis en pedidos mayores a $500</li>
                <li>Aceptamos todas las tarjetas principales</li>
                <li>Pago 100% seguro</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Sheet open={openCheckoutDialog} onOpenChange={setOpenCheckoutDialog}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Checkout</SheetTitle>
            <SheetDescription>
              Este es un proyecto de demostración, por lo que no hay una pasarela de pago implementada.
            </SheetDescription>
          </SheetHeader>
          <SheetFooter className="mt-6">
            <Button variant="outline" onClick={() => setOpenCheckoutDialog(false)}>
              Cerrar
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
