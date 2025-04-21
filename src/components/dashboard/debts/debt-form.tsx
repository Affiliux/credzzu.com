'use client'

import React, { useEffect, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { get_debtors } from '@/http/services/dashboard'

import type { CreateDebtPayloadProps, DebtorProps, UpdateDebtPayloadProps } from '@/interfaces/dashboard'

import { DebtFeesTypeEnum } from '@/lib/enums'
import { dateMask } from '@/lib/masks/date'
import { moneyMask } from '@/lib/masks/money'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { SuccessAnimation } from '@/components/ui/success-animation'

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
  feesDailyValue: z.string().min(1, 'Valor da taxa é obrigatório'),
  feeLateType: z.nativeEnum(DebtFeesTypeEnum),
  feeLateValue: z.string().min(1, 'Valor da taxa de atraso é obrigatório'),
  installmentsNumber: z.string().min(1, 'Número de parcelas é obrigatório'),
})

interface DebtFormProps {
  children: React.ReactNode
  open: boolean
  debtorId?: string
  initialData?: CreateDebtPayloadProps | UpdateDebtPayloadProps
  is_loading?: boolean
  onSubmit: (data: CreateDebtPayloadProps | UpdateDebtPayloadProps) => Promise<void>
  onOpenChange: (open: boolean) => void
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
      feesDailyValue: initialData?.feesDailyValue?.toString() || '',
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
        feesDailyValue: Number(values.feesDailyValue),
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
        feesDailyValue: initialData?.feesDailyValue?.toString() || '',
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

      <SheetContent className='flex h-full w-screen flex-col overflow-y-scroll border-emerald-500/20 bg-black md:w-[640px]'>
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
              <SheetHeader className='border-b border-emerald-500/20 pb-6'>
                <SheetTitle className='text-xl font-bold text-white'>
                  {initialData ? 'Editar Dívida' : 'Nova Dívida'}
                </SheetTitle>
                <SheetDescription className='-mt-2 text-white/60'>
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
                              <FormLabel className='text-white/80'>Devedor</FormLabel>
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
                              <FormMessage className='text-red-400/80' />
                            </FormItem>
                          )}
                        />
                      )}

                      <FormField
                        control={form.control}
                        name='description'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-white/80'>Nome</FormLabel>
                            <FormControl>
                              <Input placeholder='Nome da dívida' {...field} />
                            </FormControl>
                            <FormMessage className='text-red-400/80' />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name='totalValue'
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
                                disabled={!!initialData}
                              />
                            </FormControl>
                            <FormMessage className='text-red-400/80' />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name='dateOfDebt'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-white/80'>Data da primeira parcela</FormLabel>
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
                            <FormMessage className='text-red-400/80' />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name='installmentsNumber'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-white/80'>Número de Parcelas</FormLabel>
                            <FormControl>
                              <Input type='number' placeholder='1' {...field} disabled={!!initialData} />
                            </FormControl>
                            <FormMessage className='text-red-400/80' />
                          </FormItem>
                        )}
                      />

                      <div className='space-y-4'>
                        <div className='space-y-4 rounded-lg border bg-black/60 p-4'>
                          <h3 className='text-sm font-medium text-white/80'>Taxa Mensal</h3>
                          <div className='grid grid-cols-2 gap-4'>
                            <FormField
                              control={form.control}
                              name='feesType'
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className='text-white/80'>Tipo de Taxa</FormLabel>
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
                                  <FormMessage className='text-red-400/80' />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name='feesDailyValue'
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className='text-white/80'>Valor da Taxa (%)</FormLabel>
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
                                  <FormMessage className='text-red-400/80' />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        <div className='space-y-4 rounded-lg border bg-black/60 p-4'>
                          <h3 className='text-sm font-medium text-white/80'>Taxa de Atraso Diário</h3>
                          <div className='grid grid-cols-2 gap-4'>
                            <FormField
                              control={form.control}
                              name='feeLateType'
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className='text-white/80'>Tipo de Taxa</FormLabel>
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
                                  <FormMessage className='text-red-400/80' />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name='feeLateValue'
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className='text-white/80'>Valor da Taxa (%)</FormLabel>
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
                                  <FormMessage className='text-red-400/80' />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`mt-auto flex flex-col gap-2 py-6`}>
                    <Button type='submit' className='h-10' disabled={is_loading}>
                      {is_loading ? (
                        <>
                          <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Salvando...
                        </>
                      ) : initialData ? (
                        'Atualizar'
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
