'use client'

import { useEffect, useState } from 'react'

import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import Navbar from '@/presentation/components/lp/navbar'
import { Button } from '@/presentation/components/ui/button'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrolled])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-black/95 shadow-[0_2px_20px_rgba(0,0,0,0.5)] backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className='container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8 xl:max-w-7xl 2xl:max-w-[1400px]'>
        {/* Logo */}
        <Link href='/' className='relative z-50 flex items-center gap-2'>
          <Image
            src='/images/Credzzu.png'
            alt='Logo Credzzu'
            width={160}
            height={160}
            priority
            className='h-10 w-auto'
          />
        </Link>

        {/* Desktop Navbar - Centralized */}
        <div className='hidden flex-1 items-center justify-center md:flex'>
          <Navbar />
        </div>

        {/* Right-side actions (desktop) */}
        <div className='hidden items-center gap-6 md:flex'>
          <Link
            href='/login'
            className='relative text-sm font-medium text-white opacity-80 transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:opacity-100 hover:after:w-full'
          >
            Login
          </Link>
          <Button
            asChild
            className='group border border-emerald-500 bg-transparent px-6 py-6 text-sm text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all duration-300 hover:bg-emerald-500/10 hover:shadow-[0_0_25px_rgba(16,185,129,0.25)]'
          >
            <Link href='/signup' className='flex items-center gap-2'>
              <span>Começar Agora</span>
              <span className='h-[1px] w-5 bg-emerald-400 transition-all duration-300 group-hover:w-8'></span>
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className='relative z-50 text-white focus:outline-none md:hidden'
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-all duration-500 ${isMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        <div className='flex h-full flex-col justify-center overflow-hidden p-8'>
          <div className='flex -translate-y-6 flex-col space-y-12'>
            <nav className='flex flex-col items-center space-y-10'>
              {['Recursos', 'Como Funciona', 'Preços', 'FAQ'].map((item, index) => (
                <Link
                  key={item}
                  href={`#${item === 'Como Funciona' ? 'how-it-works' : item.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`text-2xl font-light text-white transition-all duration-300 hover:text-emerald-400 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                  style={{ transitionDelay: `${index * 100 + 100}ms` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </nav>

            <div className='${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} flex flex-col items-center space-y-6 transition-all delay-500 duration-500'>
              <Link
                href='/login'
                className='text-lg font-light tracking-wide text-white/70 transition-all duration-300 hover:text-white'
                onClick={() => setIsMenuOpen(false)}
              >
                Entrar
              </Link>
              <Button
                onClick={() => setIsMenuOpen(false)}
                asChild
                className='w-full max-w-xs border border-emerald-500 bg-transparent text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all duration-300 hover:bg-emerald-500/10 hover:shadow-[0_0_25px_rgba(16,185,129,0.25)]'
              >
                <Link href='/signup'>Começar Agora</Link>
              </Button>

              {/* <div className='mt-12 flex space-x-6'>
                {['Twitter', 'GitHub', 'Discord'].map(social => (
                  <a key={social} href='#' className='text-white/50 transition-colors duration-300 hover:text-white'>
                    {social}
                  </a>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
