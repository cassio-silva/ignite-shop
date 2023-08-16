import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { redirect } from 'next/navigation'
import { stripe } from "@/lib/stripe";

interface CheckoutSuccessPageProps {
  searchParams: {
    session_id: string
  }
}

export const revalidate = 0

export default async function CheckoutSuccess({ searchParams }: CheckoutSuccessPageProps) {
  const { session_id } = searchParams

  if (!session_id) {
    redirect('/')
  }
  const checkoutInfo = await getCheckoutUserInfo(session_id)

  return (
    <section className="flex flex-col gap-8 w-full max-w-[1180px] h-[600px] items-center justify-center">
      <article
        className="flex "
      >
        {checkoutInfo.products?.map((prod) => (
          <div
            key={prod.id}
            className="flex items-center justify-center w-32 bg-gradient-green-to-purple rounded-full first:ml-[unset] -ml-8 shadow-2xl"
          >
            <Image
              //@ts-ignore
              src={prod.price?.product?.images[0]}
              width={130}
              height={136}
              alt=""
              quality={40}
            />
          </div>
        ))}
      </article>
      <h1 className="text-2xl font-bold text-gray-300">Compra efetuada!</h1>
      <p className="w-[590px] text-center text-xl leading-[1.4] font-normal text-gray-400">
        Uhuul <strong>{checkoutInfo.customerName || "Usuário"}</strong>, sua compra de {checkoutInfo.products?.length} camiseta(s) já está a caminho da sua casa.
      </p>
      <Link
        href={'/'}
        className="text-green-400 mt-14 text-lg font-bold hover:text-green-300"
      >
        Voltar ao catálogo
      </Link>
    </section>
  )
}

async function getCheckoutUserInfo(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price', 'line_items.data.price.product']
  })
  const customerName = session.customer_details?.name
  const products = session.line_items?.data

  return {
    customerName,
    products
  }
}
