import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { cartItems } = await req.json()

  if (!cartItems) {
    return NextResponse.json({
      status: 400,
      error: "No items in cart"
    })
  }

  const prodList = []
  for (const id in cartItems) {
    prodList.push(cartItems[id])
  }

  const success_url = `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancel_url = `${process.env.NEXT_PUBLIC_URL}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: success_url,
    cancel_url: cancel_url,
    mode: 'payment',
    line_items: prodList.map((prod) => {
      return {
        price: prod.price_id,
        quantity: prod.quantity
      }
    }),
  })

  return NextResponse.json({
    status: 201,
    sessionId: checkoutSession.id,
  })
}