'use client'

import { useEffect, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import type { DebtorProps } from '@/application/interfaces/dashboard'

import { phoneMask } from '@/application/lib/masks'
import { documentMask } from '@/application/lib/masks/document'
import { validateDocument } from '@/application/lib/validators/document'

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

const createFormSchema = (documentType: 'CPF' | 'CNPJ') =>
  z.object({
    name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    email: z.string().email('Email inválido'),
    phone: z.string().min(14, 'Telefone inválido').max(15, 'Telefone inválido'),
    address: z.string().min(5, 'Endereço deve ter pelo menos 5 caracteres').optional().or(z.literal('')),
    city: z.string().min(2, 'Cidade deve ter pelo menos 2 caracteres').optional().or(z.literal('')),
    state: z.string().min(2, 'Estado deve ter pelo menos 2 caracteres').optional().or(z.literal('')),
    documentType: z
      .enum(['CPF', 'CNPJ'], {
        required_error: 'Selecione um tipo de documento',
      })
      .optional(),
    documentNumber: z
      .string()
      .refine(value => {
        if (!value) return true
        const cleaned = value.replace(/\D/g, '')
        return validateDocument(cleaned, documentType)
      }, 'Documento inválido')
      .optional(),
  })

interface DebtorFormProps {
  children: React.ReactNode
  open: boolean
  debtor?: DebtorProps
  onSubmit: (data: DebtorProps) => Promise<void>
  onOpenChange: (open: boolean) => void
}

export function DebtorForm({ debtor, onSubmit, children, open, onOpenChange }: DebtorFormProps) {
  // states
  const [document_type, set_document_type] = useState<'CPF' | 'CNPJ'>((debtor?.documentType as 'CPF' | 'CNPJ') ?? 'CPF')
  const [is_loading, set_is_loading] = useState<boolean>(false)
  const [is_success, set_is_success] = useState<boolean>(false)

  // form
  const formSchema = createFormSchema(document_type)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: debtor?.name ?? '',
      email: debtor?.email ?? '',
      phone: debtor?.phone ?? '',
      address: debtor?.address ?? '',
      city: debtor?.city ?? '',
      state: debtor?.state ?? '',
      documentType: (debtor?.documentType as 'CPF' | 'CNPJ') ?? 'CPF',
      documentNumber: debtor?.documentNumber ?? '',
    },
  })

  // handlers
  async function handleSubmit(values: z.infer<typeof formSchema>) {
    set_is_loading(true)

    try {
      const data = {
        ...values,
        id: debtor?.id,
      } as DebtorProps

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
      set_is_loading(false)
    }
  }

  // effects
  useEffect(() => {
    if (!open) {
      set_is_success(false)
      form.reset()
    }
  }, [open, form])

  // render
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className='flex h-full w-screen flex-col overflow-y-scroll md:w-[640px]'>
        <AnimatePresence mode='wait'>
          {is_success ? (
            <SuccessAnimation message={debtor ? 'Devedor atualizado com sucesso!' : 'Devedor criado com sucesso!'} />
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
                <SheetTitle className='text-xl font-bold'>{debtor ? 'Editar Devedor' : 'Novo Devedor'}</SheetTitle>
                <SheetDescription className='text-neutral-400'>
                  {debtor
                    ? 'Faça alterações no devedor aqui. Clique em salvar quando terminar.'
                    : 'Adicione um novo devedor aqui. Clique em salvar quando terminar.'}
                </SheetDescription>
              </SheetHeader>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className='flex h-full flex-col'>
                  <div className='space-y-6 py-4'>
                    <div className='space-y-4'>
                      <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                              <Input placeholder='Nome completo' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type='email' placeholder='Email' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name='phone'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefone</FormLabel>
                            <FormControl>
                              <Input
                                placeholder='(00) 00000-0000'
                                {...field}
                                onChange={e => {
                                  const masked = phoneMask(e.target.value)
                                  field.onChange(masked)
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className='space-y-4 rounded-lg border border-neutral-700 p-4'>
                      <h3 className='text-sm font-medium text-neutral-400'>Documento</h3>
                      <FormField
                        control={form.control}
                        name='documentType'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tipo de Documento</FormLabel>
                            <Select
                              onValueChange={(value: 'CPF' | 'CNPJ') => {
                                set_document_type(value)
                                field.onChange(value)
                              }}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Selecione o tipo de documento' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value='CPF'>CPF</SelectItem>
                                <SelectItem value='CNPJ'>CNPJ</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='documentNumber'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Número do Documento</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={document_type === 'CPF' ? '000.000.000-00' : '00.000.000/0000-00'}
                                {...field}
                                onChange={e => {
                                  const masked = documentMask(e.target.value, document_type)
                                  field.onChange(masked)
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className='space-y-4 rounded-lg border border-neutral-700 p-4'>
                      <h3 className='text-sm font-medium text-neutral-400'>Endereço</h3>
                      <FormField
                        control={form.control}
                        name='address'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Endereço</FormLabel>
                            <FormControl>
                              <Input placeholder='Endereço completo' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className='grid grid-cols-2 gap-4'>
                        <FormField
                          control={form.control}
                          name='city'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cidade</FormLabel>
                              <FormControl>
                                <Input placeholder='Cidade' {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name='state'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Estado</FormLabel>
                              <FormControl>
                                <Input placeholder='Estado' {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <div className='py-6'>
                    <div className='flex flex-col gap-2'>
                      <Button type='submit' className='h-10 flex-1' disabled={is_loading}>
                        {is_loading ? 'Salvando...' : debtor ? 'Salvar Alterações' : 'Criar Devedor'}
                      </Button>
                      <Button
                        type='button'
                        variant='outline'
                        className='h-10 flex-1'
                        onClick={() => onOpenChange(false)}
                      >
                        Cancelar
                      </Button>
                    </div>
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
