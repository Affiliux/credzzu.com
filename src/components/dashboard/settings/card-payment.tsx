'use client'

import React, { useState } from 'react'

import axios from 'axios'
import { CheckCircle2, Loader2, XCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import type { CreateSubscriptionPayloadProps } from '@/interfaces/subscription'

import { validateCreditCard } from '@/lib/validators/credit-card-number'
import { validateCVV } from '@/lib/validators/cvv'
import { validateExpiryDate } from '@/lib/validators/expiry-date'
import { validateName } from '@/lib/validators/name'
import { removeNonLetters } from '@/lib/formatters/non-letters'
import { removeNonNumbers } from '@/lib/formatters/non-numbers'
import { creditCardMask } from '@/lib/masks/credit-card'
import { cvvMask } from '@/lib/masks/cvv'
import { expiryDateMask } from '@/lib/masks/expiry-date'
import { removeMask } from '@/lib/masks/remove'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  number: z
    .string()
    .min(1, 'Número do cartão é obrigatório')
    .transform(value => removeNonNumbers(value))
    .refine(value => validateCreditCard(value), 'Número de cartão inválido'),
  name: z
    .string()
    .min(1, 'Nome no cartão é obrigatório')
    .transform(value => removeNonLetters(value).trim())
    .refine(value => validateName(value), 'Insira o nome completo como está no cartão'),
  expiry: z
    .string()
    .min(1, 'Data de validade é obrigatória')
    .transform(value => removeNonNumbers(value))
    .refine(value => !validateExpiryDate(value), 'Data de validade inválida'),
  cvv: z
    .string()
    .min(1, 'CVV é obrigatório')
    .transform(value => removeNonNumbers(value))
    .refine(value => validateCVV(value), 'CVV inválido'),
})

export function CardPaymentModal({
  is_open,
  title,
  description,
  button_text,
  plan_id,
  onClose,
  onSubmit,
}: {
  is_open: boolean
  title: string
  description: string
  button_text: string
  plan_id?: string
  onClose: () => void
  onSubmit: (result: CreateSubscriptionPayloadProps) => Promise<void>
}) {
  // states
  const [is_loading, set_is_loading] = useState(false)
  const [status, set_status] = useState<'idle' | 'success' | 'error'>('idle')

  // form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      number: '',
      name: '',
      expiry: '',
      cvv: '',
    },
  })

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    set_is_loading(true)
    set_status('idle')

    try {
      // Generate card token
      const { data: response } = await axios.post(
        `https://api.pagar.me/core/v5/tokens?appId=${process.env.NEXT_PUBLIC_STONE_APP_ID}`,
        {
          type: 'card',
          card: {
            number: removeMask(values.number),
            holder_name: values.name,
            exp_month: Number(values.expiry.slice(0, 2)),
            exp_year: Number(values.expiry.slice(2, 4)),
            cvv: values.cvv,
          },
        },
      )

      if (response.id) {
        await onSubmit({
          cardToken: response.id,
          idPlan: plan_id,
        })

        set_status('success')

        setTimeout(() => {
          onClose()
          form.reset()
          set_status('idle')
        }, 3000)
      }
    } catch (error) {
      console.error('Error processing payment:', error)
      set_status('error')

      setTimeout(() => {
        set_status('idle')
        form.reset()
        onClose()
      }, 3000)
    } finally {
      set_is_loading(false)
    }
  }

  return (
    <Dialog open={is_open} onOpenChange={open => !open && onClose()}>
      <DialogContent className='rounded-xl border border-emerald-500/20 bg-black/80 p-0 shadow-xl backdrop-blur-sm sm:max-w-[400px]'>
        <DialogHeader className='p-6 pb-0'>
          <DialogTitle className='text-xl font-medium text-white'>{title}</DialogTitle>
          <DialogDescription className='-mt-2 text-sm text-white/60'>{description}</DialogDescription>
        </DialogHeader>

        {status === 'success' && (
          <div className='animate-fade-in flex flex-col items-center justify-center p-8'>
            <div className='animate-scale-in mb-4 rounded-full bg-green-900/20 p-4'>
              <CheckCircle2 className='h-12 w-12 text-green-500' />
            </div>
            <p className='text-center font-medium text-green-400'>Pagamento processado com sucesso!</p>
          </div>
        )}

        {status === 'error' && (
          <div className='animate-fade-in flex flex-col items-center justify-center p-8'>
            <div className='animate-scale-in mb-4 rounded-full bg-red-900/20 p-4'>
              <XCircle className='h-10 w-10 text-red-500' />
            </div>
            <p className='text-center font-medium text-red-400'>Falha ao processar o pagamento</p>
            <p className='text-center text-sm text-red-400/70'>Verifique os dados do cartão e tente novamente</p>
          </div>
        )}

        {status === 'idle' && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4 p-6 pt-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-normal text-white/60'>Nome no cartão</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Nome como está no cartão'
                        {...field}
                        onChange={e => {
                          const value = removeNonLetters(e.target.value)
                          field.onChange(value)
                        }}
                      />
                    </FormControl>
                    <FormMessage className='text-xs text-red-500' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='number'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-normal text-white/60'>Número do cartão</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='0000 0000 0000 0000'
                        {...field}
                        onChange={e => {
                          const value = removeNonNumbers(e.target.value)
                          const masked = creditCardMask(value)
                          field.onChange(masked)
                        }}
                      />
                    </FormControl>
                    <FormMessage className='text-xs text-red-500' />
                  </FormItem>
                )}
              />

              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='expiry'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-normal text-white/60'>Validade</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='MM/YY'
                          {...field}
                          onChange={e => {
                            const value = removeNonNumbers(e.target.value)
                            const masked = expiryDateMask(value)
                            field.onChange(masked)
                          }}
                        />
                      </FormControl>
                      <FormMessage className='text-xs text-red-500' />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='cvv'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-normal text-white/60'>CVV</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='123'
                          {...field}
                          onChange={e => {
                            const value = removeNonNumbers(e.target.value)
                            const masked = cvvMask(value)
                            field.onChange(masked)
                          }}
                        />
                      </FormControl>
                      <FormMessage className='text-xs text-red-500' />
                    </FormItem>
                  )}
                />
              </div>

              <Button type='submit' className='mt-6 h-10 w-full' disabled={is_loading}>
                {is_loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                {is_loading ? 'Processando...' : button_text}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  )
}
