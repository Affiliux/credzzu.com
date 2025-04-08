'use client'

import React, { useState } from 'react'

import { Eye, EyeOff, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import type { SignInPayloadProps } from '@/application/interfaces/account'

import { toast } from '@/application/hooks/use-toast'

import { Button } from '@/presentation/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/presentation/components/ui/form'
import { Input } from '@/presentation/components/ui/input'

export function SignInForm({ onSubmit }: { onSubmit: (payload: SignInPayloadProps) => Promise<void> }) {
  // hooks
  const router = useRouter()

  const formSchema = z.object({
    email: z.string().email({
      message: 'Email inválido.',
    }),
    password: z.string().min(6, {
      message: 'A senha deve ter pelo menos 6 caracteres.',
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // states
  const [is_loading, set_loading] = useState<boolean>(false)
  const [show_password, set_show_password] = useState<boolean>(false)

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    set_loading(true)

    try {
      await onSubmit({
        email: values.email,
        password: values.password,
      })

      toast({
        title: 'Login realizado com sucesso!',
        description: 'Redirecionando para o dashboard...',
      })

      router.push('/dashboard')
    } catch (error: any) {
      if (error.message === 403) {
        toast({
          variant: 'destructive',
          title: 'Erro ao fazer login',
          description: 'Conta não está verificada',
        })

        router.push(`/auth/verify?email=${values.email}`)
      } else if (error.message === 406) {
        toast({
          variant: 'destructive',
          title: 'Erro ao fazer login',
          description: 'Verifique suas credenciais e tente novamente.',
        })
      } else if (error.message === 404) {
        toast({
          variant: 'destructive',
          title: 'Erro ao fazer login',
          description: 'Não existe nenhuma conta com esse e-mail',
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-neutral-300'>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder='seu@email.com'
                  {...field}
                  className='h-11 border-neutral-700 bg-neutral-800 text-neutral-100 placeholder:text-neutral-500 focus-visible:ring-neutral-600'
                />
              </FormControl>
              <FormMessage className='text-red-400' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center justify-between'>
                <FormLabel className='text-neutral-300'>Senha</FormLabel>
                <Link href='/auth/forgot-password' className='text-xs text-neutral-500 hover:text-neutral-300'>
                  Esqueceu sua senha?
                </Link>
              </div>
              <FormControl>
                <div className='relative'>
                  <Input
                    type={show_password ? 'text' : 'password'}
                    placeholder='••••••'
                    {...field}
                    className='h-11 border-neutral-700 bg-neutral-800 pr-10 text-neutral-100 placeholder:text-neutral-500 focus-visible:ring-neutral-600'
                  />
                  <button
                    type='button'
                    onClick={() => set_show_password(rest => !rest)}
                    className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-neutral-500 hover:text-neutral-300'
                  >
                    {show_password ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage className='text-red-400' />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          className='mt-4 h-11 w-full bg-neutral-100 text-neutral-900 hover:bg-neutral-200 disabled:opacity-70'
          disabled={is_loading || !form.formState.isDirty || !form.formState.isValid}
        >
          {is_loading ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Entrando...
            </>
          ) : (
            'Entrar'
          )}
        </Button>
      </form>
    </Form>
  )
}
