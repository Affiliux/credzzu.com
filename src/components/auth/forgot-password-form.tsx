'use client'

import React, { useState } from 'react'

import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import type { ForgotPasswordPayloadProps } from '@/interfaces/account'

import { toast } from '@/hooks/use-toast'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export function ForgotPasswordForm({
  onSubmit,
  onNextStep,
}: {
  onSubmit: (payload: ForgotPasswordPayloadProps) => Promise<void>
  onNextStep: () => void
}) {
  // hooks
  const router = useRouter()

  const formSchema = z.object({
    email: z.string().email({
      message: 'Email inválido.',
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  // states
  const [is_loading, set_loading] = useState<boolean>(false)

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    set_loading(true)

    try {
      await onSubmit({
        email: values.email,
      })

      onNextStep()

      toast({
        title: 'Email enviado!',
        description: 'Verifique seu email para o código de recuperação.',
      })
    } catch (error) {
      if (error.message === 404) {
        toast({
          variant: 'destructive',
          title: 'Erro ao fazer login',
          description: 'Não existe nenhuma conta com esse e-mail.',
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'Erro ao enviar email',
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

        <Button
          type='submit'
          className='mt-4 h-11 w-full bg-neutral-100 text-neutral-900 hover:bg-neutral-200 disabled:opacity-70'
          disabled={is_loading || !form.formState.isDirty || !form.formState.isValid}
        >
          {is_loading ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Enviando...
            </>
          ) : (
            'Enviar código'
          )}
        </Button>
      </form>
    </Form>
  )
}
