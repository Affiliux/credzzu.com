'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/presentation/components/ui/button'
import { FlipWords } from '@/presentation/components/ui/flip-words'
import { WavyBackground } from '@/presentation/components/ui/wavy-background'

export default function Hero() {
  return (
    <WavyBackground
      containerClassName='w-full py-8 md:py-20 lg:py-32 xl:py-48'
      className='mx-auto w-full max-w-7xl'
      colors={['rgba(16, 185, 129, 0.4)', 'rgba(16, 185, 129, 0.2)', 'rgba(16, 185, 129, 0.1)']}
      waveWidth={100}
      backgroundFill='black'
      blur={10}
      speed='slow'
      waveOpacity={0.5}
    >
      <div className='container mx-auto px-3 sm:px-6 lg:px-8'>
        <div className='grid items-center gap-8 lg:grid-cols-2'>
          <div className='flex flex-col justify-center space-y-6 md:space-y-8'>
            <div className='space-y-4 md:space-y-6'>
              <h1 className='text-3xl leading-tight font-light tracking-tight text-white sm:text-4xl md:text-5xl lg:text-7xl'>
                <span className='font-medium'>Receba de quem</span>{' '}
                <FlipWords
                  words={['te deve dinheiro', 'você emprestou', 'precisa te pagar', 'está em dívida com você']}
                  className='font-medium text-emerald-400'
                  duration={2500}
                />
                {/* <span className='mt-2 block'>receba com facilidade</span> */}
              </h1>
              <p className='max-w-xl text-base text-white/80 sm:text-lg md:text-xl lg:text-2xl'>
                Credzzu ajuda você a rastrear dinheiro devido por amigos e torna a cobrança simples e sem estresse.
              </p>
            </div>
            <div className='flex flex-col gap-3 sm:flex-row'>
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
          <div className='mt-6 flex justify-center lg:mt-0'>
            <div className='relative'>
              <div className='absolute inset-0 -m-10 rounded-full bg-gradient-to-br from-emerald-500/20 to-transparent opacity-30 blur-3xl'></div>
              <Image
                src='/placeholder.svg?height=550&width=550'
                width={550}
                height={550}
                alt='Prévia do Dashboard'
                className='xs:max-w-sm relative z-10 aspect-square w-full max-w-[280px] rounded-xl object-cover shadow-xl sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl'
              />
            </div>
          </div>
        </div>
      </div>
    </WavyBackground>
  )
}
