'use client'
import { useShoppingCart } from "use-shopping-cart";
import Image from "next/image";
import IconCart from "@/assets/cart-icon.svg"

export function CartButton() {
  const { handleCartClick, cartDetails, cartCount } = useShoppingCart()

  return (
    <button
      className="flex items-center justify-center p-3 bg-gray-500 rounded-lg min-h-[48px] relative group"
      onClick={() => handleCartClick()}
    >
      <Image
        className="group-hover:filter group-hover:brightness-150"
        src={IconCart}
        style={{
          objectFit: 'contain'
        }}
        alt=""
      />
      {!!cartCount && cartCount > 0 && (
        <span
          className="absolute flex items-center justify-center w-6 h-6 bg-green-300 text-gray-300 text-[0.875rem] -right-[50%] -top-[50%] transform -translate-x-[75%] translate-y-[75%] rounded-full shadow-[0_0_1px_3px_rgba(0,0,0,1)]"
        >
          {cartCount}
        </span>
      )}
    </button>
  )
}