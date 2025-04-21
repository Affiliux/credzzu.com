'use client'

import React, { useEffect, useRef, useState } from 'react'

import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

import type { ResendEmailVerificationPayloadProps, VerifyAccountPayloadProps } from '@/interfaces/account'

import { useQueryParams } from '@/hooks/use-query-params'
import { toast } from '@/hooks/use-toast'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

export function VerifyAccountForm({
  onSubmit,
  onResendCode,
}: {
  onSubmit: (payload: VerifyAccountPayloadProps) => Promise<void>
  onResendCode: (payload: ResendEmailVerificationPayloadProps) => Promise<void>
}) {
  // hooks
  const router = useRouter()
  const { email } = useQueryParams()

  // states
  const [is_loading, set_loading] = useState<boolean>(false)
  const [code, setCode] = useState(['', '', '', '', ''])

  // refs
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  function handleChange(index: number, value: string) {
    if (value.length > 1) {
      value = value[0]
    }

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus next input
    if (value !== '' && index < 4) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    // Handle backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 5)

    if (/^\d+$/.test(pastedData)) {
      const newCode = [...code]

      for (let i = 0; i < pastedData.length; i++) {
        if (i < 5) {
          newCode[i] = pastedData[i]
        }
      }

      setCode(newCode)

      // Focus the appropriate input
      if (pastedData.length < 5) {
        inputRefs.current[pastedData.length]?.focus()
      } else {
        inputRefs.current[4]?.focus()
      }
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const verificationCode = code.join('')

    if (verificationCode.length !== 5) {
      toast({
        variant: 'destructive',
        title: 'Código incompleto',
        description: 'Por favor, digite o código de 5 dígitos completo.',
      })

      return
    } else if (!email) {
      toast({
        variant: 'destructive',
        title: 'Email inválido',
        description: 'Por favor, digite um email válido.',
      })

      router.push('/auth/sign-in')
      return
    }

    set_loading(true)

    try {
      await onSubmit({
        email: email,
        token: verificationCode,
      })

      toast({
        title: 'Conta verificada com sucesso!',
        description: 'Redirecionando para o dashboard...',
      })

      router.push('/dashboard')
    } catch (error) {
      if (error.message === 400) {
        toast({
          variant: 'destructive',
          title: 'Erro ao verificar código',
          description: 'Verifique o código e tente novamente.',
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'Erro ao fazer login',
          description: 'Ocorreu um erro interno, tente novamente mais tarde.',
        })
      }
    } finally {
      set_loading(false)
    }
  }

  async function handleResendCode() {
    if (!email) {
      toast({
        variant: 'destructive',
        title: 'Email inválido',
        description: 'Por favor, digite um email válido.',
      })

      router.push('/auth/sign-in')
      return
    }

    set_loading(true)

    try {
      await onResendCode({ email })

      toast({
        title: 'Código reenviado',
        description: 'Um novo código foi enviado para o seu email.',
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao reenviar código',
        description: 'Verifique suas credenciais e tente novamente.',
      })

      router.push('/auth/sign-in')
    } finally {
      set_loading(false)
    }
  }

  // Pre-populate refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 5)
  }, [])

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div className='flex justify-center space-x-3'>
        {code.map((digit, index) => (
          <Input
            key={index}
            ref={(el: HTMLInputElement | null) => {
              if (el) inputRefs.current[index] = el
            }}
            type='text'
            inputMode='numeric'
            pattern='[0-9]*'
            maxLength={1}
            className='h-14 w-14 border-neutral-700 bg-neutral-800 text-center text-lg text-neutral-100 focus-visible:ring-neutral-600'
            value={digit}
            onChange={e => handleChange(index, e.target.value)}
            onKeyDown={e => handleKeyDown(index, e)}
            onPaste={index === 0 ? handlePaste : undefined}
            autoFocus={index === 0}
          />
        ))}
      </div>

      <Button
        type='submit'
        className='mt-4 h-11 w-full bg-neutral-100 text-neutral-900 hover:bg-neutral-200 disabled:opacity-70'
        disabled={is_loading}
      >
        {is_loading ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Verificando...
          </>
        ) : (
          'Verificar'
        )}
      </Button>
      <div className='text-center'>
        <Button
          variant='link'
          type='button'
          onClick={handleResendCode}
          className='text-sm text-neutral-500 hover:text-neutral-300'
        >
          Não recebeu o código? Reenviar
        </Button>
      </div>
    </form>
  )
}
