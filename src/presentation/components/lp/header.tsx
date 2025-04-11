'use client'

import { useState } from 'react'

import { X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import Navbar from '@/presentation/components/lp/navbar'
import { Button } from '@/presentation/components/ui/button'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className='bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur'>
      <div className='container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-2'>
          <Image
            src='/images/Credzzu.png'
            alt='Credzzu Logo'
            width={160}
            height={160}
            priority
            className='h-10 w-auto'
          />
        </Link>

        {/* Desktop Navbar */}
        <nav className='hidden items-center gap-6 md:flex'>
          <Navbar />
        </nav>

        {/* Right-side actions (desktop) */}
        <div className='hidden items-center gap-4 md:flex'>
          <Link
            href='/login'
            className='text-muted-foreground hover:text-foreground text-sm font-medium transition-colors'
          >
            Log in
          </Link>
          <Button asChild>
            <Link href='/signup'>Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className='flex items-center md:hidden'>
          <button
            className='text-foreground focus:outline-none'
            aria-label='Open menu'
            onClick={() => setIsMenuOpen(true)}
          >
            <svg
              className='h-6 w-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16' />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className='bg-background/95 fixed inset-0 z-40 p-6 backdrop-blur-sm md:hidden'>
          <div className='mb-6 flex items-center justify-between'>
            <Link href='/' className='flex items-center gap-2' onClick={() => setIsMenuOpen(false)}>
              <Image src='/images/Credzzu.png' alt='Credzzu Logo' width={160} height={160} className='h-10 w-auto' />
            </Link>
            <button onClick={() => setIsMenuOpen(false)} aria-label='Close menu'>
              <X className='text-foreground h-6 w-6' />
            </button>
          </div>

          {/* Mobile nav links */}
          <div className='flex flex-col space-y-4'>
            <Navbar />
            <Link
              href='/login'
              className='text-muted-foreground hover:text-foreground text-md font-medium transition-colors'
              onClick={() => setIsMenuOpen(false)}
            >
              Log in
            </Link>
            <Button onClick={() => setIsMenuOpen(false)} asChild>
              <Link href='/signup'>Get Started</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
