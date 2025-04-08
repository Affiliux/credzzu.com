'use client'

import React from 'react'

import Link from 'next/link'

import { useAccount } from '@/application/contexts/AccountContext'

import { SignInForm } from '@/presentation/components/auth/sign-in-form'

export const runtime = 'edge'

export default function Page() {
  // contexts
  const { onSignIn } = useAccount()

  return (
    <div className='space-y-8'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold text-neutral-100'>Bem-vindo de volta</h1>
        <p className='text-neutral-400'>Entre com suas credenciais para acessar sua conta</p>
      </div>

      <SignInForm onSubmit={onSignIn} />

      <div className='text-center text-sm text-neutral-400'>
        Não tem uma conta?{' '}
        <Link
          href='/auth/sign-up'
          className='font-medium text-neutral-300 underline underline-offset-4 hover:text-white'
        >
          Cadastre-se
        </Link>
      </div>
    </div>
  )
}
