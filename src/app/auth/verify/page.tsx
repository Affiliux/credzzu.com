'use client'

import React from 'react'

import { useAccount } from '@/contexts/AccountContext'

import { VerifyAccountForm } from '@/components/auth/verify-account-form'

export const runtime = 'edge'

export default function Page() {
  // contexts
  const { onVerifyAccount, onResendVerification } = useAccount()

  return (
    <div className='space-y-8'>
      <div className='text-center'>
        <h1 className='mb-3 text-3xl font-bold text-neutral-100'>Verificar sua conta</h1>
        <p className='text-neutral-400'>Digite o código de 5 dígitos enviado para o seu email</p>
      </div>

      <VerifyAccountForm onSubmit={onVerifyAccount} onResendCode={onResendVerification} />
    </div>
  )
}
