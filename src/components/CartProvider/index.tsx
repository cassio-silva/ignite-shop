'use client'
import { ReactNode } from "react";
import { CartProvider } from "use-shopping-cart";

interface ShoppingCartProviderProps {
  children: ReactNode

}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!

  return (
    <CartProvider
      cartMode='checkout-session'
      stripe={stripeKey}
      currency='BRL'
      shouldPersist
    >
      {children}
    </CartProvider>
  )
}