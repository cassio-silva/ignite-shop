'use client'
import { useState } from "react";
import { useShoppingCart } from "use-shopping-cart"
import IconClose from "@/assets/close.svg"
import Image from "next/image"

interface CartDrawerProps {

}

export function CartDrawer({ }: CartDrawerProps) {
  const [isCreatingCheckout, setisCreatingCheckout] = useState(false);
  const {
    shouldDisplayCart,
    cartDetails,
    cartCount,
    formattedTotalPrice,
    redirectToCheckout,
    handleCloseCart,
    removeItem,
    clearCart
  } = useShoppingCart()

  async function handleBuyProducts() {
    console.log(cartDetails)
    try {
      setisCreatingCheckout(true)
      const response = await fetch('/api/checkout', {
        method: 'POST',
        body: JSON.stringify({ cartItems: cartDetails }),
      })
        .then(res => res.json())
      const checkoutSessionId = response.sessionId
      clearCart()
      redirectToCheckout(checkoutSessionId)      
      // const response = await fetch('/api/checkout', {
      //   method: 'POST',
      //   body: JSON.stringify({ priceId: product.priceId }),
      // })
      // const { checkoutUrl } = await response.json()
      // window.location.href = checkoutUrl
    } catch (err) {
      setisCreatingCheckout(false)
      console.error('Falha ao redirecionar!')
    }
  }

  const cartList = []
  for (const id in cartDetails) {
    const cartItem = cartDetails[id]
    cartList.push(
      <article key={id} className="flex gap-5">
        <div className="rounded-lg bg-gradient-green-to-purple box-border min-w-max">
          <Image
            className=""
            src={cartItem.image!}
            width={102}
            height={94}
            style={{
              objectFit: 'contain'
            }}
            alt=""
          />
        </div>
        <div className="flex flex-col">
          <span className="text-md leading-[1.6] text-gray-400">
            {cartItem.quantity > 1
              ? `${cartItem.quantity} x ${cartItem.name}`
              : cartItem.name
            }
          </span>
          <strong className="text-md leading-[1.6] text-gray-300 font-bold">{cartItem.formattedPrice}</strong>
          <button
            onClick={() => removeItem(cartItem.id)}
            className="text-green-400 hover:text-green-300 text-[1rem] leading-[1.6] w-fit mt-auto"
          >
            Remover
          </button>
        </div>
      </article>
    )
  }

  return (
    <aside
      className={`flex flex-col fixed right-0 top-0 py-6 px-12 max-xl:w-full w-[520px] h-screen bg-gray-500 animate-slideIn shadow-[-4px_0px_30px_0px_rgba(0,0,0,0.80)]
      ${!shouldDisplayCart ? 'animate-slideOut' : ''}`}
    >
      <button
        className="text-right ml-auto absolute right-4 top-4 p-2 filter hover:brightness-125"
        onClick={() => handleCloseCart()}
      >
        <Image
          src={IconClose}
          style={{
            objectFit: 'contain'
          }}
          alt=""
        />
      </button>
      <header className="mt-8">
        <strong className="text-lg">Sacola de compras</strong>
      </header>
      <section
        className="my-8 flex flex-col max-9/12 overflow-y-auto gap-6"
      >
        {!!cartCount && cartCount > 0
          ? cartList
          : <p className="text-md">Você ainda não adicionou nenhum produto no seu carrinho.</p>
        }
      </section>

      {!!cartCount && cartCount > 0 && (
        <footer className="mt-auto mb-12">
          <div className="w-full flex justify-between items-center">
            <span>Quantidade</span>
            <span className="text-md">{cartCount} itens</span>
          </div>
          <div className="w-full flex justify-between items-center">
            <strong className="text-md">Valor Total</strong>
            <strong className="text-xl">{formattedTotalPrice}</strong>
          </div>
          <button
            className="flex w-full px-8 py-5 mt-14 items-center justify-center rounded-lg bg-green-400 hover:bg-green-300 disabled:opacity-75 disabled:cursor-not-allowed text-white text-md font-bold"
            onClick={handleBuyProducts}
            disabled={isCreatingCheckout}
          >
            Finalizar Compra
          </button>
        </footer>
      )}
    </aside >
  )
}