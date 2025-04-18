'use client'

import React from 'react'

import Link from 'next/link'

import { useAccount } from '@/application/contexts/AccountContext'

import { SignUpForm } from '@/presentation/components/auth/sign-up-form'

export const runtime = 'edge'

export default function Page() {
  // contexts
  const { onSignUp } = useAccount()

  return (
    <div className='space-y-8'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold text-neutral-100'>Criar uma conta</h1>
        <p className='mt-3 text-neutral-400'>Preencha os dados abaixo para começar</p>
      </div>

      <SignUpForm onSubmit={onSignUp} />

      <div className='text-center text-sm text-neutral-400'>
        Já tem uma conta?{' '}
        <Link
          href='/auth/sign-in'
          className='font-medium text-neutral-300 underline underline-offset-4 hover:text-white'
        >
          Entrar
        </Link>
      </div>
    </div>
  )
}
