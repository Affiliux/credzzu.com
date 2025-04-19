'use client'

import React, { useEffect, useState } from 'react'

import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import type { AccountProps, UpdateAccountPayloadProps } from '@/application/interfaces/account'

import { phoneMask } from '@/application/lib/masks/phone'

import { toast } from '@/application/hooks/use-toast'

import { Button } from '@/presentation/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/presentation/components/ui/form'
import { Input } from '@/presentation/components/ui/input'

export function UpdateAccountForm({
  enable,
  account,
  onSubmit,
}: {
  enable: boolean
  account: AccountProps
  onSubmit: (payload: UpdateAccountPayloadProps) => Promise<void>
}) {
  // hooks
  const formSchema = z.object({
    name: z.string().min(2, {
      message: 'O nome deve ter pelo menos 2 caracteres.',
    }),
    phone: z.string().min(10, {
      message: 'Telefone inválido.',
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: account?.name,
      phone: phoneMask(account?.phone?.split('+55')[1]),
    },
    mode: 'onChange',
  })

  // states
  const [is_loading, set_loading] = useState<boolean>(false)

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    set_loading(true)

    try {
      const phoneRaw = values.phone.replace(/\D/g, '')

      await onSubmit({
        name: values.name,
        phone: `+55${phoneRaw}`,
      })

      toast({
        title: 'Sucesso!',
        description: 'Os dados da sua conta foram atualizados com sucesso.',
      })
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Erro ao atualizar conta',
        description: 'Ocorreu um erro ao atualizar os dados da sua conta. Tente novamente mais tarde.',
      })
    } finally {
      set_loading(false)
    }
  }

  useEffect(() => {
    form.reset({
      name: account?.name,
      phone: phoneMask(account?.phone?.split('+55')[1]),
    })
  }, [account?.id])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white/80'>Nome completo</FormLabel>
              <FormControl>
                <Input
                  placeholder='João Silva'
                  disabled={!enable}
                  {...field}
                  className='h-11 border-emerald-500/20 bg-black/40 text-white placeholder:text-white/40 focus-visible:border-emerald-500/50 focus-visible:ring-emerald-500/20'
                />
              </FormControl>
              <FormMessage className='text-red-400' />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel className='text-white/80'>Email</FormLabel>
          <FormControl>
            <Input
              placeholder='seu@email.com'
              value={account.email}
              disabled
              className='h-11 border-emerald-500/20 bg-black/40 text-white/60 placeholder:text-white/40'
            />
          </FormControl>
        </FormItem>
        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white/80'>Telefone</FormLabel>
              <FormControl>
                <Input
                  placeholder='(00) 00000-0000'
                  value={field.value}
                  disabled={!enable}
                  onChange={e => {
                    field.onChange(phoneMask(e.target.value))
                  }}
                  className='h-11 border-emerald-500/20 bg-black/40 text-white placeholder:text-white/40 focus-visible:border-emerald-500/50 focus-visible:ring-emerald-500/20'
                />
              </FormControl>
              <FormMessage className='text-red-400' />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          className='relative h-11 w-full overflow-hidden border border-emerald-500 bg-emerald-500 text-white transition-all duration-300 hover:bg-emerald-600 disabled:border-emerald-500/30 disabled:bg-emerald-500/10 disabled:text-emerald-500/50'
          disabled={is_loading || !form.formState.isDirty || !form.formState.isValid || !enable}
        >
          {is_loading ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Atualizando conta...
            </>
          ) : (
            'Atualizar conta'
          )}
          <div className='absolute bottom-0 left-0 h-[2px] w-full bg-white/20'></div>
        </Button>
      </form>
    </Form>
  )
}
