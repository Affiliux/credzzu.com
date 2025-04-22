'use client'

import React from 'react'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function CTA() {
  return (
    <section className='relative w-full overflow-hidden bg-black py-16 md:py-24 lg:py-32'>
      {/* Background Elements */}
      <div className='absolute top-0 left-0 h-full w-full overflow-hidden'>
        <div className='absolute -top-40 -left-40 h-80 w-80 rounded-full bg-emerald-500/5 blur-3xl'></div>
        <div className='absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-emerald-500/5 blur-3xl'></div>

        {/* Estrelas cintilantes */}
        <div className='absolute top-1/4 left-1/3 h-0.5 w-0.5 rounded-full bg-emerald-300 shadow-[0_0_10px_5px_rgba(16,185,129,0.3)]'></div>
        <div className='absolute top-1/3 right-1/4 h-0.5 w-0.5 rounded-full bg-emerald-300 shadow-[0_0_10px_5px_rgba(16,185,129,0.3)]'></div>
        <div className='absolute bottom-1/3 left-1/4 h-0.5 w-0.5 rounded-full bg-emerald-300 shadow-[0_0_10px_5px_rgba(16,185,129,0.3)]'></div>
        <div className='absolute top-10 right-20 h-0.5 w-0.5 rounded-full bg-emerald-300 shadow-[0_0_10px_5px_rgba(16,185,129,0.3)]'></div>
        <div className='absolute right-1/3 bottom-20 h-0.5 w-0.5 rounded-full bg-emerald-300 shadow-[0_0_10px_5px_rgba(16,185,129,0.3)]'></div>
        <div className='absolute top-1/2 left-10 h-0.5 w-0.5 rounded-full bg-emerald-300 shadow-[0_0_10px_5px_rgba(16,185,129,0.3)]'></div>
        <div className='absolute top-3/4 right-10 h-0.5 w-0.5 rounded-full bg-emerald-300 shadow-[0_0_8px_4px_rgba(16,185,129,0.2)]'></div>
      </div>

      {/* Gradiente superior para transição suave */}
      <div className='absolute top-0 left-0 h-24 w-full bg-gradient-to-b from-black to-transparent'></div>

      <div className='relative container mx-auto px-3 sm:px-6'>
        <div className='mx-auto flex max-w-4xl flex-col items-center text-center'>
          <h2 className='mt-5 text-3xl font-light tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl'>
            Pronto para receber
            <span className='block font-bold'>o que é seu?</span>
          </h2>

          <p className='mt-4 max-w-2xl text-base text-white/60 md:text-lg'>
            Junte-se a centenas de usuários que não esqueceram de receber o que era deles.
          </p>

          <div className='relative mt-8 inline-flex md:mt-12'>
            <div className='absolute -inset-0.5 rounded-lg bg-gradient-to-r from-emerald-500/80 to-emerald-500/30 opacity-75 blur-md transition-all duration-500 group-hover:opacity-100'></div>
            <Button
              asChild
              size='lg'
              className='group relative bg-black px-6 py-5 text-sm font-light text-white hover:bg-black/90 md:px-8 md:py-7 md:text-base'
            >
              <Link href='/auth/sign-up' className='flex items-center gap-4 pr-2 md:gap-8 md:pr-4'>
                <span>Comece sua jornada hoje</span>
                <span className='flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-black transition-all duration-300 group-hover:bg-white md:h-8 md:w-8'>
                  <ArrowRight className='h-3 w-3 md:h-4 md:w-4' />
                </span>
              </Link>
            </Button>
          </div>

          {/* <p className='mt-8 text-xs text-white/40 md:mt-12 md:text-sm'>
            Sem cartão de crédito necessário • Cancelamento a qualquer momento
          </p> */}
        </div>
      </div>
    </section>
  )
}
