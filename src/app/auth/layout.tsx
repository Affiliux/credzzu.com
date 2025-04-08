import React, { ReactNode } from 'react'

import Image from 'next/image'
import Link from 'next/link'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='flex min-h-screen bg-neutral-900'>
      {/* Coluna da esquerda - Imagem e Logo */}
      <div className='relative hidden w-1/2 flex-col bg-gradient-to-b from-neutral-800 to-black lg:flex'>
        {/* Logo no topo */}
        <div className='absolute top-8 left-8 z-20'>
          <Link href='/' className='flex items-center'>
            <div className='relative h-10 w-10 overflow-hidden rounded-full bg-neutral-200 p-1'>
              <svg
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='h-full w-full text-neutral-900'
              >
                <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' />
              </svg>
            </div>
            <span className='ml-3 text-xl font-bold text-neutral-100'>Credzzu.com</span>
          </Link>
        </div>

        {/* Imagem de fundo */}
        <div className='absolute inset-0 z-10 opacity-10'>
          <Image
            src='/images/background-auth.webp?height=1080&width=1920'
            alt='Background'
            fill
            className='object-cover'
            priority
          />
        </div>

        {/* Conteúdo sobreposto */}
        <div className='relative z-20 flex h-full flex-col items-center justify-center px-12 text-neutral-100'>
          {/* Depoimento */}
          <div className='mt-auto mb-12 w-full max-w-md rounded-xl bg-neutral-800/80 p-6 backdrop-blur-sm'>
            <p className='mb-4 text-lg text-neutral-200 italic'>
              {`"A Credzzu transformou minha vida financeira. Agora tenho total controle sobre meus créditos e consigo
              planejar melhor meu futuro."`}
            </p>
            <div className='flex items-center'>
              <div className='h-10 w-10 rounded-full bg-neutral-600'></div>
              <div className='ml-3'>
                <p className='font-medium text-neutral-100'>Ana Luiza</p>
                <p className='text-sm text-neutral-400'>Cliente desde 2022</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coluna da direita - Formulário */}
      <div className='flex w-full flex-col items-center justify-center bg-neutral-900 px-4 py-12 lg:w-1/2'>
        <main className='w-full max-w-sm space-y-8'>{children}</main>
      </div>
    </div>
  )
}
