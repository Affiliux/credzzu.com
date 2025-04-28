'use client'

import React, { useState } from 'react'

import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import type { SignUpPayloadProps } from '@/interfaces/account'

import { validateName } from '@/lib/validators/name'
import { removeNonLetters } from '@/lib/formatters/non-letters'
import { phoneMask } from '@/lib/masks/phone'

import { toast } from '@/hooks/use-toast'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { PasswordStrength } from '../password-strength'

export function SignUpForm({ onSubmit }: { onSubmit: (payload: SignUpPayloadProps) => Promise<void> }) {
  // hooks
  const router = useRouter()

  const formSchema = z.object({
    name: z
      .string()
      .min(2, {
        message: 'O nome deve ter pelo menos 2 caracteres.',
      })
      .transform(value => removeNonLetters(value).trim())
      .refine(value => validateName(value), 'Insira o nome completo como está no cartão'),
    email: z.string().email({
      message: 'Email inválido.',
    }),
    phone: z.string().min(10, {
      message: 'Telefone inválido.',
    }),
    password: z
      .string()
      .min(6, {
        message: 'A senha deve ter pelo menos 6 caracteres.',
      })
      .regex(/[0-9]/, {
        message: 'A senha deve conter pelo menos um número.',
      })
      .regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, {
        message: 'A senha deve conter pelo menos um caractere especial.',
      }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
    },
    mode: 'onChange',
  })

  // states
  const [is_loading, set_loading] = useState<boolean>(false)
  const [show_password, set_show_password] = useState<boolean>(false)

  // variables
  const watchPassword = form.watch('password')

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    set_loading(true)

    try {
      const phoneRaw = values.phone.replace(/\D/g, '')

      await onSubmit({
        email: values.email,
        password: values.password,
        name: values.name,
        phone: `+55${phoneRaw}`,
      })

      toast({
        title: 'Conta criada com sucesso!',
        description: 'Verifique seu email para confirmar sua conta.',
      })

      router.push(`/auth/verify?email=${values.email}`)
    } catch (error: any) {
      if (error.message === 400) {
        toast({
          variant: 'destructive',
          title: 'Erro ao criar conta',
          description: 'Dados inválidos ou já existe alguma conta com esse e-mail ou telefone.',
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'Erro ao criar conta',
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
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-neutral-300'>Nome completo</FormLabel>
              <FormControl>
                <Input
                  placeholder='João Silva'
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
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-neutral-300'>Telefone</FormLabel>
              <FormControl>
                <Input
                  placeholder='(00) 00000-0000'
                  value={field.value}
                  maxLength={15}
                  onChange={e => {
                    const masked = phoneMask(e.target.value)
                    field.onChange(masked)
                  }}
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
              <FormLabel className='text-neutral-300'>Senha</FormLabel>
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
              <PasswordStrength password={watchPassword} />
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
              <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Criando conta...
            </>
          ) : (
            'Criar conta'
          )}
        </Button>
      </form>
    </Form>
  )
}
