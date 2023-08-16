import Image from "next/image";
import Link from "next/link";
import { CartButton } from "./CartButton";
// Assets
import LogoImg from '@/assets/logo.svg'

export function Header() {
  return (
    <header className='flex items-center justify-between w-full max-xl:max-w-[90%] max-w-[1180px] mt-10 mb-8 mx-auto object-contain'>
      <Link href={'/'}>
        <Image
          src={LogoImg}
          alt=''
        />
      </Link>
      <CartButton />
    </header>
  )
}