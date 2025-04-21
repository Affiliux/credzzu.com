import React, { ReactNode } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { WavyBackground } from '@/components/ui/wavy-background'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <WavyBackground
      className='min-h-screen'
      containerClassName='min-h-screen'
      colors={['rgba(16, 185, 129, 0.4)', 'rgba(16, 185, 129, 0.2)', 'rgba(16, 185, 129, 0.1)']}
      waveWidth={100}
      backgroundFill='black'
      blur={10}
      speed='slow'
      waveOpacity={0.5}
    >
      <div className='relative flex min-h-screen flex-col items-center justify-center px-4 py-12'>
        {/* Logo no topo */}
        <div className='mb-6'>
          <Link href='/' className='flex items-center'>
            <Image
              src='/logo.png'
              alt='Credzzu Logo'
              width={120}
              height={38}
              className='h-auto w-[100px] drop-shadow-lg sm:w-[120px] md:w-[140px]'
            />
          </Link>
        </div>

        {/* Container principal */}
        <div className='relative z-10 w-full max-w-md space-y-8 px-4 sm:px-6'>
          <main className='rounded-xl bg-black p-6 shadow-2xl ring-1 ring-white/10 sm:p-8'>{children}</main>
        </div>
      </div>
    </WavyBackground>
  )
}
