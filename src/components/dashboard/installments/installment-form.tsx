'use client'

import React, { useEffect, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import type { CreateInstallmentPayloadProps, InstallmentProps } from '@/interfaces/dashboard'

import { dateMask } from '@/lib/masks/date'
import { moneyMask } from '@/lib/masks/money'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { SuccessAnimation } from '@/components/ui/success-animation'

const formSchema = z.object({
  dueDate: z
    .string()
    .min(10, 'Data de vencimento inválida')
    .refine(date => {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const selectedDate = new Date(date.split('/').reverse().join('-'))
      return selectedDate >= today
    }, 'A data não pode ser menor que hoje'),
  originalAmount: z.string().min(1, 'Valor é obrigatório'),
  lateFee: z.string().min(1, 'Taxa de atraso é obrigatória'),
})

interface InstallmentFormProps {
  children: React.ReactNode
  open: boolean
  debtId: string
  installments: InstallmentProps[]
  onSubmit: (data: CreateInstallmentPayloadProps) => Promise<void>
  onOpenChange: (open: boolean) => void
}

export function InstallmentForm({
  children,
  open,
  debtId,
  installments,
  onSubmit,
  onOpenChange,
}: InstallmentFormProps) {
  // states
  const [is_success, set_is_success] = useState<boolean>(false)
  const [is_loading, set_loading] = useState<boolean>(false)

  // form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dueDate: '',
      originalAmount: '',
      lateFee: '',
    },
  })

  // handlers
  async function handleSubmit(values: z.infer<typeof formSchema>) {
    set_loading(true)

    try {
      const data = {
        idDebt: debtId,
        installmentNumber: installments.length + 1,
        dueDate: values.dueDate.split('/').reverse().join('-'),
        originalAmount: Number(values.originalAmount.replace(/\D/g, '')) / 100,
        lateFee: Number(values.lateFee),
        interestFee: installments[0]?.interestFee || 0,
      } as CreateInstallmentPayloadProps

      await onSubmit(data)
      set_is_success(true)

      setTimeout(() => {
        onOpenChange(false)
        set_is_success(false)
        form.reset()
      }, 2000)
    } catch (error) {
      console.error(error)
    } finally {
      set_loading(false)
    }
  }

  // effects
  useEffect(() => {
    if (open) {
      form.reset({
        dueDate: '',
        originalAmount: '',
        lateFee: '',
      })
    }
  }, [open, form])

  // render
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className='flex h-full w-screen flex-col overflow-y-scroll border-emerald-500/20 bg-black md:w-[640px]'>
        <AnimatePresence mode='wait'>
          {is_success ? (
            <SuccessAnimation message='Parcela criada com sucesso!' />
          ) : (
            <motion.div
              key='form-content'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='flex h-full flex-col'
            >
              <SheetHeader className='border-b border-emerald-500/20 pb-6'>
                <SheetTitle className='text-xl font-bold text-white'>Nova Parcela</SheetTitle>
                <SheetDescription className='-mt-2 text-white/60'>
                  Adicione uma nova parcela aqui. Clique em salvar quando terminar.
                </SheetDescription>
              </SheetHeader>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className='flex h-full flex-col'>
                  <div className='space-y-6 py-6'>
                    <div className='space-y-4'>
                      <FormField
                        control={form.control}
                        name='dueDate'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-white/80'>Data de Vencimento</FormLabel>
                            <FormControl>
                              <Input
                                placeholder='00/00/0000'
                                {...field}
                                onChange={e => {
                                  const masked = dateMask(e.target.value)
                                  field.onChange(masked)
                                }}
                              />
                            </FormControl>
                            <FormMessage className='text-red-400/80' />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name='originalAmount'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-white/80'>Valor</FormLabel>
                            <FormControl>
                              <Input
                                placeholder='R$ 0,00'
                                {...field}
                                onChange={e => {
                                  const masked = moneyMask(e.target.value)
                                  field.onChange(masked)
                                }}
                              />
                            </FormControl>
                            <FormMessage className='text-red-400/80' />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name='lateFee'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-white/80'>Taxa de Atraso (%)</FormLabel>
                            <FormControl>
                              <Input type='number' placeholder='0,00' step='0.01' min='0' {...field} />
                            </FormControl>
                            <FormMessage className='text-red-400/80' />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className={`mt-auto flex flex-col gap-2`}>
                    <div className='mb-4 rounded-md border border-yellow-500/20 bg-yellow-500/10 p-3'>
                      <p className='text-sm text-yellow-500'>
                        Atenção: Após criar uma parcela, não será possível excluí-la. Verifique os dados antes de
                        confirmar.
                      </p>
                    </div>

                    <Button type='submit' className='h-10' disabled={is_loading}>
                      {is_loading ? (
                        <>
                          <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Salvando...
                        </>
                      ) : (
                        'Criar'
                      )}
                    </Button>
                    <Button type='button' variant='outline' className='h-10' onClick={() => onOpenChange(false)}>
                      Cancelar
                    </Button>
                  </div>
                </form>
              </Form>
            </motion.div>
          )}
        </AnimatePresence>
      </SheetContent>
    </Sheet>
  )
}
