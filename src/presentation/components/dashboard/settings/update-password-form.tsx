'use client'

import React, { useState } from 'react'

import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import type { UpdatePasswordPayloadProps } from '@/application/interfaces/account'

import { toast } from '@/application/hooks/use-toast'

import { PasswordStrength } from '@/presentation/components/password-strength'
import { Button } from '@/presentation/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/presentation/components/ui/form'
import { Input } from '@/presentation/components/ui/input'

export function UpdatePasswordForm({ onSubmit }: { onSubmit: (payload: UpdatePasswordPayloadProps) => Promise<void> }) {
  // hooks

  const formSchema = z
    .object({
      oldPassword: z.string(),
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
      confirmPassword: z.string().min(6, {
        message: 'A senha deve ter pelo menos 6 caracteres.',
      }),
    })
    .refine(data => data.oldPassword !== data.password, {
      message: 'Sua nova senha não pode ser igual a senha antiga.',
      path: ['password'],
    })
    .refine(data => data.password === data.confirmPassword, {
      message: 'As senhas não coincidem.',
      path: ['confirmPassword'],
    })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: '',
      password: '',
      confirmPassword: '',
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
      await onSubmit({
        password: values.oldPassword,
        newPassword: values.password,
      })

      toast({
        title: 'Sucesso!',
        description: 'Sua senha foi redefinida com sucesso.',
      })

      form.reset({
        oldPassword: '',
        password: '',
        confirmPassword: '',
      })
    } catch (error: any) {
      if (error.message === 400) {
        toast({
          variant: 'destructive',
          title: 'Erro ao redefinir senha',
          description: 'Senha antiga incorreta, verifique e tente novamente.',
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'Erro ao redefinir senha',
          description: 'Ocorreu um erro ao redefinir sua senha. Tente novamente.',
        })
      }
    } finally {
      set_loading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='oldPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white/80'>Senha atual</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    type={show_password ? 'text' : 'password'}
                    placeholder='••••••'
                    {...field}
                    className='h-11 border-emerald-500/20 bg-black/40 pr-10 text-white placeholder:text-white/40 focus-visible:border-emerald-500/50 focus-visible:ring-emerald-500/20'
                  />
                  <button
                    type='button'
                    onClick={() => set_show_password(!show_password)}
                    className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-white/40 hover:text-white/80'
                  >
                    {show_password ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
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
              <FormLabel className='text-white/80'>Nova senha</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    type={show_password ? 'text' : 'password'}
                    placeholder='••••••'
                    {...field}
                    className='h-11 border-emerald-500/20 bg-black/40 pr-10 text-white placeholder:text-white/40 focus-visible:border-emerald-500/50 focus-visible:ring-emerald-500/20'
                  />
                  <button
                    type='button'
                    onClick={() => set_show_password(!show_password)}
                    className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-white/40 hover:text-white/80'
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

        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white/80'>Confirmar senha</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    type={show_password ? 'text' : 'password'}
                    placeholder='••••••'
                    {...field}
                    className='h-11 border-emerald-500/20 bg-black/40 pr-10 text-white placeholder:text-white/40 focus-visible:border-emerald-500/50 focus-visible:ring-emerald-500/20'
                  />
                  <button
                    type='button'
                    onClick={() => set_show_password(!show_password)}
                    className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-white/40 hover:text-white/80'
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
          className='relative h-11 w-full overflow-hidden border border-emerald-500 bg-emerald-500 text-white transition-all duration-300 hover:bg-emerald-600 disabled:border-emerald-500/30 disabled:bg-emerald-500/10 disabled:text-emerald-500/50'
          disabled={is_loading || !form.formState.isDirty || !form.formState.isValid}
        >
          {is_loading ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Alterando...
            </>
          ) : (
            'Alterar senha'
          )}
          <div className='absolute bottom-0 left-0 h-[2px] w-full bg-white/20'></div>
        </Button>
      </form>
    </Form>
  )
}
