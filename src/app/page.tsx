import { stripe } from "@/lib/stripe"
import { KeenSliderComponent } from "../components/home/KeenSliderComponent"
import Stripe from "stripe"

export const revalidate = 300

export default async function Home() {
  const productsData = await getStaticProducts()
  const products = productsData.data.map((product) => {
    const price = product?.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price?.unit_amount!,
      priceId: price?.id
    }
  })

  return (
    <KeenSliderComponent products={products} />
  )
}

async function getStaticProducts() {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })
  return response
}
