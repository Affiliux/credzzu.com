'use client'

import React from 'react'

import { CheckCircle2, XCircle } from 'lucide-react'

export function PasswordStrength({ password }: { password: string }) {
  // variables
  const hasMinLength = password.length >= 6
  const hasNumber = /[0-9]/.test(password)
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
  const strength = [hasMinLength, hasNumber, hasSpecialChar].filter(Boolean).length

  // Define color as progress bar
  const getProgressColor = () => {
    if (strength === 0) return 'bg-neutral-600'
    if (strength === 1) return 'bg-red-500'
    if (strength === 2) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  // Define width as progress bar
  const getProgressWidth = () => `${(strength / 3) * 100}%`

  return (
    <div className='mt-3 space-y-2'>
      <div className='h-1.5 w-full rounded-full bg-neutral-700'>
        <div
          className={`h-full rounded-full transition-all duration-300 ${getProgressColor()}`}
          style={{ width: getProgressWidth() }}
        />
      </div>

      <div className='space-y-1 pt-1 text-xs'>
        <div className='flex items-center gap-1.5'>
          {hasMinLength ? (
            <CheckCircle2 className='h-3.5 w-3.5 text-green-500' />
          ) : (
            <XCircle className='h-3.5 w-3.5 text-neutral-500' />
          )}
          <span className={hasMinLength ? 'text-neutral-300' : 'text-neutral-500'}>Pelo menos 6 caracteres</span>
        </div>

        <div className='flex items-center gap-1.5'>
          {hasNumber ? (
            <CheckCircle2 className='h-3.5 w-3.5 text-green-500' />
          ) : (
            <XCircle className='h-3.5 w-3.5 text-neutral-500' />
          )}
          <span className={hasNumber ? 'text-neutral-300' : 'text-neutral-500'}>Pelo menos um número</span>
        </div>

        <div className='flex items-center gap-1.5'>
          {hasSpecialChar ? (
            <CheckCircle2 className='h-3.5 w-3.5 text-green-500' />
          ) : (
            <XCircle className='h-3.5 w-3.5 text-neutral-500' />
          )}
          <span className={hasSpecialChar ? 'text-neutral-300' : 'text-neutral-500'}>
            Pelo menos um caractere especial
          </span>
        </div>
      </div>
    </div>
  )
}
