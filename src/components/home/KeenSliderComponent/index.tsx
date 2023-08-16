'use client'
import Image from "next/image"
import { useKeenSlider } from "keen-slider/react"
import 'keen-slider/keen-slider.min.css'
import Link from "next/link"
import IconCart from "@/assets/cart-icon.svg"
import { useShoppingCart } from "use-shopping-cart"
import { priceFormatter } from "@/helpers/formatter"
import { useWindowSize } from "@/hooks/useWindowsSize"

interface KeenSliderComponentProps {
  products: {
    id: string,
    name: string
    imageUrl: string
    price: number
    priceId: string
  }[]
}

export function KeenSliderComponent({ products }: KeenSliderComponentProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 1,
      spacing: 48,
    },
    breakpoints: {
      '(min-width: 1200px)': {
        slides: {
          perView: 3,
          spacing: 48
        },
      }
    }
  })
  const { addItem } = useShoppingCart()

  function handleAddProductToCart(product: {
    id: string,
    name: string
    imageUrl: string
    price: number
    priceId: string
  }) {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.imageUrl,
      currency: 'BRL',
      price_id: product.priceId
    })
  }

  return (
    <section
      ref={sliderRef}
      className={`flex ml-auto w-full max-xl:min-h-[356px] min-h-[656px] max-xl:max-w-[90%] max-w-[calc(100vw_-_((100vw_-_1180px)_/_2))] keen-slider`}
    >
      {products.map((product) => (
        <article
          className="flex max-xl:max-w-xs w-full max-xl:min-w-[240px] min-w-[800px] items-center justify-center bg-gradient-green-to-purple rounded-lg p-1 relative group overflow-hidden keen-slider__slide"
          key={product.id}
        >
          <Link
            href={`/product/${product.id}`}
            className="flex items-center justify-center w-full h-full"
          >
            <Image
              src={product.imageUrl}
              width={520}
              height={480}
              alt=""
            />
          </Link>
          <footer className="absolute bottom-1 left-1 right-1 rounded-md flex items-center justify-between bg-[rgba(0,0,0,0.6)] p-8 transition-[all_ease-in-out] duration-200 transform translate-y-[200%] group-hover:-translate-y-0">
            <div className="flex flex-col">
              <strong className="text-lg text-gray-300">{product.name}</strong>
              <span className="text-xl font-bold text-green-400">{priceFormatter.format(product.price / 100)}</span>
            </div>
            <div>
              <button
                className="p-3 bg-green-400 hover:bg-green-300 transition-all rounded-md"
                onClick={() => handleAddProductToCart(product)}
              >
                <Image
                  className="group-hover:brightness-150 object-contain"
                  src={IconCart}
                  alt=""
                />
              </button>
            </div>
          </footer>
        </article>
      ))}
    </section>
  )
}