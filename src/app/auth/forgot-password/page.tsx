'use client'

import React, { useState } from 'react'

import Link from 'next/link'

import { useAccount } from '@/contexts/AccountContext'

import { useStep } from '@/hooks/use-step'

import { ChangePasswordForm } from '@/components/auth/change-password-form'
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form'
import { VerifyChangePasswordForm } from '@/components/auth/verify-change-password-form'

export const runtime = 'edge'

export default function Page() {
  // hooks
  const [currentStep, { goToNextStep, goToPrevStep }] = useStep(3)

  // contexts
  const { onForgotPassword, onChangePassword } = useAccount()

  // states
  const [email, set_email] = useState<string>('')
  const [code, set_code] = useState<string>('')

  return (
    <div className='space-y-8'>
      {currentStep === 1 && (
        <>
          <div className='text-center'>
            <h1 className='mb-3 text-3xl font-bold text-neutral-100'>Recuperar senha</h1>
            <p className='text-neutral-400'>Digite seu email para receber um código de recuperação</p>
          </div>

          <ForgotPasswordForm onSubmit={onForgotPassword} onNextStep={goToNextStep} />

          <div className='text-center text-sm'>
            <Link
              href='/auth/sign-in'
              className='font-medium text-neutral-300 underline underline-offset-4 hover:text-white'
            >
              Voltar para o login
            </Link>
          </div>
        </>
      )}

      {currentStep === 2 && (
        <>
          <div className='text-center'>
            <h1 className='text-3xl font-bold text-neutral-100'>Verificar código</h1>
            <p className='text-neutral-400'>Digite o código de 5 dígitos enviado para o seu email</p>
          </div>

          <VerifyChangePasswordForm
            email={email}
            onSubmit={set_code}
            onResendCode={onForgotPassword}
            onNextStep={goToNextStep}
            onPrevStep={goToPrevStep}
          />
        </>
      )}

      {currentStep === 4 && (
        <>
          <div className='text-center'>
            <h1 className='text-3xl font-bold text-neutral-100'>Nova senha</h1>
            <p className='text-neutral-400'>Digite sua nova senha</p>
          </div>

          <ChangePasswordForm email={email} code={code} onSubmit={onChangePassword} onPrevStep={goToPrevStep} />
        </>
      )}
    </div>
  )
}
