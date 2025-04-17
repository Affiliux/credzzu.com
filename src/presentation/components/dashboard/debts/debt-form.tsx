'use client'

import React, { useEffect, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { get_debtors } from '@/infrastructure/http/services/dashboard'

import type { CreateDebtPayloadProps, DebtorProps, UpdateDebtPayloadProps } from '@/application/interfaces/dashboard'

import { DebtFeesTypeEnum } from '@/application/lib/enums'
import { dateMask, moneyMask } from '@/application/lib/masks'

import { Button } from '@/presentation/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/presentation/components/ui/form'
import { Input } from '@/presentation/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/presentation/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/presentation/components/ui/sheet'
import { SuccessAnimation } from '@/presentation/components/ui/success-animation'

const formSchema = z.object({
  idDebtor: z.string().min(1, 'Devedor é obrigatório'),
  description: z.string().min(2, 'Descrição deve ter pelo menos 2 caracteres'),
  totalValue: z.string().min(1, 'Valor é obrigatório'),
  dateOfDebt: z
    .string()
    .min(10, 'Data de vencimento inválida')
    .refine(date => {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const selectedDate = new Date(date.split('/').reverse().join('-'))
      return selectedDate >= today
    }, 'A data não pode ser menor que hoje'),
  feesType: z.nativeEnum(DebtFeesTypeEnum),
  feesMonthlyValue: z.string().min(1, 'Valor da taxa é obrigatório'),
  feeLateType: z.nativeEnum(DebtFeesTypeEnum),
  feeLateValue: z.string().min(1, 'Valor da taxa de atraso é obrigatório'),
  installmentsNumber: z.string().min(1, 'Número de parcelas é obrigatório'),
})

interface DebtFormProps {
  children: React.ReactNode
  open: boolean
  debtorId?: string
  onSubmit: (data: CreateDebtPayloadProps | UpdateDebtPayloadProps) => Promise<void>
  onOpenChange: (open: boolean) => void
  initialData?: CreateDebtPayloadProps | UpdateDebtPayloadProps
  is_loading?: boolean
}

export function DebtForm({
  children,
  open,
  debtorId,
  onSubmit,
  onOpenChange,
  initialData,
  is_loading = false,
}: DebtFormProps) {
  // states
  const [is_success, set_is_success] = useState<boolean>(false)
  const [debtors, set_debtors] = useState<DebtorProps[]>([])

  // form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idDebtor: debtorId || '',
      description: initialData?.description || '',
      totalValue: initialData?.totalValue ? moneyMask((initialData.totalValue * 100).toString()) : '',
      dateOfDebt: initialData?.dateOfDebt ? new Date(initialData.dateOfDebt).toLocaleDateString('pt-BR') : '',
      feesType: initialData?.feesType || DebtFeesTypeEnum.SIMPLE,
      feesMonthlyValue: initialData?.feesMonthlyValue?.toString() || '',
      feeLateType: initialData?.feeLateType || DebtFeesTypeEnum.SIMPLE,
      feeLateValue: initialData?.feeLateValue?.toString() || '',
      installmentsNumber: initialData?.installmentsNumber?.toString() || '',
    },
  })

  // handlers
  async function handleSubmit(values: z.infer<typeof formSchema>) {
    try {
      const data = {
        idDebtor: values.idDebtor,
        description: values.description,
        totalValue: Number(values.totalValue.replace(/\D/g, '')) / 100,
        dateOfDebt: values.dateOfDebt.split('/').reverse().join('-'),
        feesType: values.feesType,
        feesMonthlyValue: Number(values.feesMonthlyValue),
        feeLateType: values.feeLateType,
        feeLateValue: Number(values.feeLateValue),
        installmentsNumber: Number(values.installmentsNumber),
        ...(initialData?.id && { id: initialData.id }),
      } as CreateDebtPayloadProps | UpdateDebtPayloadProps

      await onSubmit(data)
      set_is_success(true)

      setTimeout(() => {
        onOpenChange(false)
        set_is_success(false)
        form.reset()
      }, 2000)
    } catch (error) {
      console.error(error)
    }
  }

  // effects
  useEffect(() => {
    if (open) {
      form.reset({
        idDebtor: debtorId || '',
        description: initialData?.description || '',
        totalValue: initialData?.totalValue ? moneyMask((initialData.totalValue * 100).toString()) : '',
        dateOfDebt: initialData?.dateOfDebt ? new Date(initialData.dateOfDebt).toLocaleDateString('pt-BR') : '',
        feesType: initialData?.feesType || DebtFeesTypeEnum.SIMPLE,
        feesMonthlyValue: initialData?.feesMonthlyValue?.toString() || '',
        feeLateType: initialData?.feeLateType || DebtFeesTypeEnum.SIMPLE,
        feeLateValue: initialData?.feeLateValue?.toString() || '',
        installmentsNumber: initialData?.installmentsNumber?.toString() || '',
      })
    }
  }, [open, debtorId, initialData, form])

  useEffect(() => {
    async function loadDebtors() {
      try {
        const response = await get_debtors({ page: 1, limit: 50 })
        set_debtors(response.data.debtors)
      } catch (error) {
        console.error('Erro ao carregar devedores:', error)
      }
    }

    if (open) loadDebtors()
  }, [open])

  // render
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className='flex h-full w-screen flex-col overflow-y-scroll md:w-[640px]'>
        <AnimatePresence mode='wait'>
          {is_success ? (
            <SuccessAnimation message={`Dívida ${initialData ? 'atualizada' : 'criada'} com sucesso!`} />
          ) : (
            <motion.div
              key='form-content'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='flex h-full flex-col'
            >
              <SheetHeader className='border-b border-neutral-700 pb-6'>
                <SheetTitle className='text-xl font-bold'>{initialData ? 'Editar Dívida' : 'Nova Dívida'}</SheetTitle>
                <SheetDescription className='text-neutral-400'>
                  {initialData
                    ? 'Edite os dados da dívida aqui. Clique em salvar quando terminar.'
                    : 'Adicione uma nova dívida aqui. Clique em salvar quando terminar.'}
                </SheetDescription>
              </SheetHeader>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className='flex h-full flex-col'>
                  <div className='space-y-6 py-6'>
                    <div className='space-y-4'>
                      {!debtorId && (
                        <FormField
                          control={form.control}
                          name='idDebtor'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Devedor</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder='Selecione o devedor' />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {debtors.map(debtor => (
                                    <SelectItem key={debtor.id} value={debtor.id!}>
                                      {debtor.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      <FormField
                        control={form.control}
                        name='description'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                              <Input placeholder='Nome da dívida' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name='totalValue'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Valor</FormLabel>
                            <FormControl>
                              <Input
                                placeholder='R$ 0,00'
                                {...field}
                                onChange={e => {
                                  const masked = moneyMask(e.target.value)
                                  field.onChange(masked)
                                }}
                                disabled={!!initialData}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name='dateOfDebt'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Data da primeira parcela</FormLabel>
                            <FormControl>
                              <Input
                                placeholder='00/00/0000'
                                {...field}
                                onChange={e => {
                                  const masked = dateMask(e.target.value)
                                  field.onChange(masked)
                                }}
                                disabled={!!initialData}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className='grid grid-cols-2 gap-4'>
                        <FormField
                          control={form.control}
                          name='feesType'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tipo de Taxa</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={!!initialData}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder='Selecione o tipo de taxa' />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value={DebtFeesTypeEnum.SIMPLE}>Simples</SelectItem>
                                  <SelectItem value={DebtFeesTypeEnum.COMPOUND}>Composta</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name='feesMonthlyValue'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Valor da Taxa (%)</FormLabel>
                              <FormControl>
                                <Input
                                  type='number'
                                  placeholder='0,00'
                                  step='0.01'
                                  min='0'
                                  {...field}
                                  disabled={!!initialData}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className='grid grid-cols-2 gap-4'>
                        <FormField
                          control={form.control}
                          name='feeLateType'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tipo Taxa de Atraso</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={!!initialData}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder='Selecione o tipo de taxa de atraso' />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value={DebtFeesTypeEnum.SIMPLE}>Simples</SelectItem>
                                  <SelectItem value={DebtFeesTypeEnum.COMPOUND}>Composta</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name='feeLateValue'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Valor da Taxa (%)</FormLabel>
                              <FormControl>
                                <Input
                                  type='number'
                                  placeholder='0,00'
                                  step='0.01'
                                  min='0'
                                  {...field}
                                  disabled={!!initialData}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name='installmentsNumber'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Número de Parcelas</FormLabel>
                            <FormControl>
                              <Input type='number' placeholder='1' {...field} disabled={!!initialData} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className={`mt-auto flex flex-col gap-2 ${!debtorId ? 'py-6' : 'pt-6'}`}>
                    <Button type='submit' className='h-10 flex-1' disabled={is_loading}>
                      {is_loading ? 'Salvando...' : initialData ? 'Atualizar' : 'Criar'}
                    </Button>
                    <Button type='button' variant='outline' className='h-10 flex-1' onClick={() => onOpenChange(false)}>
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
