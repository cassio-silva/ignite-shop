import './globals.css'
import { ReactNode } from 'react'
import { Roboto } from 'next/font/google'
import type { Metadata } from 'next'
import { CartProvider } from 'use-shopping-cart'
import { Header } from '@/components/Header'
import { ShoppingCartProvider } from '@/components/CartProvider'
import { CartDrawer } from '@/components/CartDrawer'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'Ignite Shop',
  description: 'Loja de camisetas Ignite Shop',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-gray-600 text-gray-300`}>
        <ShoppingCartProvider>
          <Header />

          <main className='flex flex-col items-center w-full mx-auto'>
            {children}
          </main>
          <CartDrawer />
        </ShoppingCartProvider>
      </body>
    </html>
  )
}
