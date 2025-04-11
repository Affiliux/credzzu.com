'use client'

import React from 'react'

import { format } from 'date-fns'

export const runtime = 'edge'

export default function Page() {
  return (
    <div className='w-full space-y-6'>
      <div className='flex flex-col justify-between space-y-2 md:flex-row md:items-center md:space-y-0'>
        <h1 className='text-2xl font-bold text-neutral-100'>Dívidas</h1>
        <p className='text-sm text-neutral-400'>
          Última atualização: <span className='font-medium text-neutral-300'>Hoje, {format(new Date(), 'hh:mm')}</span>
        </p>
      </div>

      {/* */}
    </div>
  )
}
