'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className='flex w-full flex-col items-center justify-center gap-4 md:w-auto md:flex-row md:gap-6'>
      <Link
        href='#features'
        className='text-muted-foreground hover:text-foreground text-md font-medium transition-colors duration-200'
      >
        Features
      </Link>
      <Link
        href='#how-it-works'
        className='text-muted-foreground hover:text-foreground text-md font-medium transition-colors duration-200'
      >
        How It Works
      </Link>
      <Link
        href='#pricing'
        className='text-muted-foreground hover:text-foreground text-md font-medium transition-colors duration-200'
      >
        Pricing
      </Link>
    </nav>
  )
}
