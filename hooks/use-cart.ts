"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Products } from "@/types/products"

interface CartItem extends Products {
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (product: Products) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product: Products) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id)
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
              ),
            }
          }
          return { items: [...state.items, { ...product, quantity: 1 }] }
        }),
      removeItem: (productId: Products["id"]) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),
      updateQuantity: (productId: Products["id"], quantity: number) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item,
          ),
        })),
      clearCart: () => set({ items: [] }),
      getTotalPrice: () => {
        const state = get()
        return Number((state.items.reduce((total, item) => total + item.price * item.quantity, 0)).toFixed(2))
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)
