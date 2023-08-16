'use client'
import { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { priceFormatter } from "@/helpers/formatter";

interface ProductProps {
  product: {
    id: string;
    name: string;
    description: string | null;
    imageUrl: string;
    price: number;
    priceId: string;
  }
}

export function CheckoutSection({ product }: ProductProps) {
  const { addItem } = useShoppingCart()

  function handleAddProductToCart() {
    addItem({
      name: product.name,
      price: product.price,
      price_id: product.priceId,
      id: product.id,
      image: product.imageUrl,
      currency: 'BRL',
      price_data: {
        id: product.priceId
      }
    })
  }

  return (
    <aside className="flex flex-col">
      <h1 className="text-2xl text-gray-300">{product.name}</h1>
      <span className="block mt-4 text-2xl text-green-300">{priceFormatter.format(product.price / 100)}</span>

      <p className="mt-10 text-md leading-[1.6] text-gray-400">
        {product.description}
      </p>
      <button
        onClick={handleAddProductToCart}
        className={`flex items-center justify-center px-8 py-5 border-0 cursor-pointer rounded-lg bg-green-400 text-md text-white mt-auto hover:transition hover:duration-200 disabled:opacity-75 disabled:cursor-not-allowed hover:bg-green-300`}
      >
        Colocar na sacola
      </button>
    </aside>
  )
}