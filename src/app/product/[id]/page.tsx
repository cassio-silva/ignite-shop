import Image from "next/image";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { CheckoutSection } from "./CheckoutSession";

interface ProductDetailProps {
  params: {
    id: string
  }
}

export const revalidate = 300

export default async function ProductDetail({ params: { id } }: ProductDetailProps) {
  const product = await getProductById(id)

  return (
    <section className="grid grid-cols-2 gap-4 w-full max-w-[1180px] items-stretch mx-auto">
      <article
        className="flex items-center justify-center h-[656px] max-w-[576px] bg-gradient-green-to-purple rounded-lg shadow-md py-1"
      >
        <Image
          src={product.imageUrl}
          width={520}
          height={480}
          style={{
            objectFit: 'cover'
          }}
          alt=""
        />
      </article>
      <CheckoutSection product={product} />
    </section>
  )
}

async function getProductById(id: string) {
  const response = await stripe.products.retrieve(id, {
    expand: ['default_price']
  })
  const productPrice = response?.default_price as Stripe.Price
  const product = {
    id: response.id,
    name: response.name,
    description: response.description,
    imageUrl: response.images[0],
    price: productPrice?.unit_amount!,
    priceId: productPrice.id
  }

  return product
}
