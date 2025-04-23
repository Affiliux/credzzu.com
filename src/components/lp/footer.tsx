'use client'

import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className='w-full border-t border-white/10 bg-black py-6'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='flex flex-col items-center space-y-6 md:flex-row md:items-center md:justify-between md:space-y-0'>
          <div className='flex flex-col items-center md:flex-row md:items-start md:gap-2'>
            <Image src='/logo.png' alt='Credzzu Logo' width={120} height={120} className='mb-2 h-6 w-auto md:mb-0' />
            <p className='text-center text-sm font-light text-white/80 md:text-left'>
              © {new Date().getFullYear()} Credzzu. Todos os direitos reservados.
            </p>
          </div>

          <div className='flex flex-col items-center space-y-4 md:flex-row md:items-center md:space-y-0 md:gap-x-8'>
            <nav className='flex flex-wrap justify-center gap-4 text-xs font-light md:gap-6'>
              <Link href='/terms' className='text-white/60 transition-colors hover:text-white'>
                Termos de Uso
              </Link>
              <Link href='/privacy' className='text-white/60 transition-colors hover:text-white'>
                Política de Privacidade
              </Link>
              <Link href='#' className='text-white/60 transition-colors hover:text-white'>
                Contato
              </Link>
            </nav>

            {/* <div className='flex space-x-5'>
              {['Twitter', 'Instagram'].map(social => (
                <a
                  key={social}
                  href='#'
                  className='text-xs text-white/50 transition-colors duration-300 hover:text-emerald-400'
                >
                  {social}
                </a>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  )
}
