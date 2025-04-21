'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { FlipWords } from '@/components/ui/flip-words'
import { WavyBackground } from '@/components/ui/wavy-background'

export default function Hero() {
  return (
    <div className='lg:mt-44'>
      <WavyBackground
        containerClassName='w-full'
        className='mx-auto w-full max-w-7xl'
        colors={['rgba(16, 185, 129, 0.4)', 'rgba(16, 185, 129, 0.2)', 'rgba(16, 185, 129, 0.1)']}
        waveWidth={100}
        backgroundFill='black'
        blur={15}
        speed='slow'
        waveOpacity={0.5}
      >
        <div className='container mx-auto px-3 sm:px-6 lg:px-8'>
          <div className='flex flex-col items-center gap-12'>
            <div className='flex w-full flex-col items-start text-left md:items-center md:text-center'>
              <h1 className='max-w-3xl text-left text-4xl leading-tight font-bold tracking-tight text-white md:text-center md:text-6xl'>
                <span className='font-light'>Receba de quem</span>{' '}
                <FlipWords
                  words={['te deve dinheiro', 'você emprestou', 'precisa te pagar']}
                  className='-mt-2 font-bold text-emerald-400'
                  duration={2500}
                />
              </h1>

              <p className='mt-4 max-w-2xl text-left text-lg text-white/80 md:text-center md:text-xl'>
                Credzzu ajuda você a rastrear dinheiro devido por amigos, parentes, conhecidos e torna a cobrança
                simples e sem estresse.
              </p>

              <div className='mt-8 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center'>
                <Button
                  asChild
                  size='lg'
                  className='group relative overflow-hidden border-0 bg-emerald-500 px-6 py-5 text-sm text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:bg-emerald-600 hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] md:px-8 md:py-6 md:text-base'
                >
                  <Link href='/signup' className='flex items-center gap-3'>
                    <span>Começar Agora</span>
                    <ArrowRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
                  </Link>
                </Button>
                <Button
                  variant='outline'
                  size='lg'
                  className='border border-white/20 bg-black/50 px-6 py-5 text-sm text-white backdrop-blur-sm hover:border-white/30 hover:bg-white/5 md:px-8 md:py-6 md:text-base'
                >
                  <Link href='#how-it-works'>Saiba Mais</Link>
                </Button>
              </div>
            </div>

            <div className='relative w-full'>
              <div className='absolute inset-0 -m-10 rounded-full bg-gradient-to-br from-emerald-500/20 to-transparent opacity-30 blur-3xl'></div>
              <Image
                src='/hero.png'
                width={1200}
                height={800}
                alt='Prévia do Dashboard'
                className='relative z-10 w-full rounded-xl object-cover shadow-xl'
              />
            </div>
          </div>
        </div>
      </WavyBackground>
    </div>
  )
}
