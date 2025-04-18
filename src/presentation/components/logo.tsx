import React from 'react'

import Image from 'next/image'

import Link from 'next/link'

export function Logo() {
  return (
    <Link href='/'>
      <Image
        src='/logo.svg'
        alt='Credzzu'
        width={120}
        height={40}
        className='w-[120px] md:w-[140px] lg:w-[160px]'
        priority
      />
    </Link>
  )
}
