'use client'

import React, { useState } from 'react'

import { format } from 'date-fns'
import { CreditCard, Mail, MoreHorizontal, Phone, Smartphone } from 'lucide-react'

import type { DebtorProps, InstallmentProps, UpdateInstallmentPayloadProps } from '@/interfaces/dashboard'

import { DebtStatusEnum } from '@/lib/enums'
import { formatCurrency } from '@/lib/formatters/currency'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { PaymentModal } from './payment-modal'

interface InstallmentsTableProps {
  data: InstallmentProps[]
  debtor: DebtorProps
  is_loading?: boolean
  onUpdateInstallment?: (data: UpdateInstallmentPayloadProps) => Promise<void>
}

export function InstallmentsTable({ data, debtor, is_loading = false, onUpdateInstallment }: InstallmentsTableProps) {
  // states
  const [selected_installment, set_selected_installment] = useState<InstallmentProps | null>(null)
  const [is_payment_modal_open, set_payment_modal_open] = useState<boolean>(false)

  // handlers
  function handleOpenPaymentModal(installment: InstallmentProps) {
    set_selected_installment(installment)
    set_payment_modal_open(true)
  }

  function handleClosePaymentModal() {
    set_selected_installment(null)
    set_payment_modal_open(false)
  }

  function handleFormatWhatsAppLink(phone: string) {
    const phoneNumber = phone?.replace(/\D/g, '')
    const whatsappLink = `https://wa.me/55${phoneNumber}`

    window.open(whatsappLink, '_blank')
  }

  function handleFormatPhoneLink(phone: string) {
    const phoneNumber = phone?.replace(/\D/g, '')
    const phoneLink = `tel:+55${phoneNumber}`

    window.open(phoneLink, '_blank')
  }

  function handleFormatEmailLink(email: string) {
    const emailLink = `mailto:${email}`
    window.open(emailLink, '_blank')
  }

  function getStatusBadge(status: DebtStatusEnum) {
    switch (status) {
      case DebtStatusEnum.ACTIVE:
        return <Badge variant='default'>Ativo</Badge>
      case DebtStatusEnum.PAID:
        return <Badge variant='success'>Pago</Badge>
      case DebtStatusEnum.OVERDUE:
        return <Badge variant='destructive'>Atrasado</Badge>
      case DebtStatusEnum.PENDING:
        return <Badge variant='secondary'>Pendente</Badge>
      default:
        return <Badge variant='outline'>Desconhecido</Badge>
    }
  }

  return (
    <div className='mt-4 space-y-4 md:mt-0'>
      <div className='overflow-hidden rounded-lg border border-emerald-500/20 bg-black/60 backdrop-blur-sm'>
        <Table>
          <TableHeader>
            <TableRow className='border-emerald-500/10 hover:bg-emerald-500/5'>
              <TableHead className='min-w-[80px] text-white/80'>Parcela</TableHead>
              <TableHead className='min-w-[120px] text-white/80'>Vencimento</TableHead>
              <TableHead className='min-w-[120px] text-white/80'>Pagamento</TableHead>
              <TableHead className='min-w-[120px] text-white/80'>Valor Original</TableHead>
              <TableHead className='min-w-[120px] text-white/80'>Valor Pago</TableHead>
              <TableHead className='min-w-[100px] text-white/80'>Status</TableHead>
              <TableHead className='w-[100px] text-white/80'>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {is_loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index} className='border-emerald-500/10'>
                  <TableCell>
                    <Skeleton className='h-4 w-8 bg-emerald-500/10' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-4 w-32 bg-emerald-500/10' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-4 w-32 bg-emerald-500/10' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-4 w-24 bg-emerald-500/10' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-4 w-24 bg-emerald-500/10' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-4 w-20 bg-emerald-500/10' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-8 w-8 rounded-md bg-emerald-500/10' />
                  </TableCell>
                </TableRow>
              ))
            ) : data?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className='h-40 px-4'>
                  <div className='flex flex-col items-center'>
                    <p className='text-center text-base text-white/60 sm:text-sm'>Nenhuma parcela encontrada</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data?.map(installment => (
                <TableRow
                  key={installment.id}
                  className='cursor-pointer border-emerald-500/10 text-white hover:bg-emerald-500/5'
                  onClick={() => handleOpenPaymentModal(installment)}
                >
                  <TableCell className='font-medium'>{installment.installmentNumber}x</TableCell>
                  <TableCell>{format(new Date(installment.dueDate), 'dd/MM/yyyy')}</TableCell>
                  <TableCell>
                    {installment.paymentDate ? format(new Date(installment.paymentDate), 'dd/MM/yyyy') : '-'}
                  </TableCell>
                  <TableCell>{formatCurrency(installment.originalAmount)}</TableCell>
                  <TableCell>{formatCurrency(installment.paidAmount)}</TableCell>
                  <TableCell>{getStatusBadge(installment.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant='ghost'
                          className='h-8 w-8 p-0 text-white/70 hover:bg-emerald-500/10 hover:text-emerald-400'
                        >
                          <span className='sr-only'>Abrir menu</span>
                          <MoreHorizontal className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align='end'
                        className='border-emerald-500/20 bg-black/95 text-white backdrop-blur-xl'
                      >
                        <DropdownMenuItem
                          onClick={e => {
                            e.stopPropagation()
                            handleFormatWhatsAppLink(debtor.phone)
                          }}
                          className='hover:bg-emerald-500/10 hover:text-emerald-400 focus:bg-emerald-500/10 focus:text-emerald-400'
                        >
                          <Smartphone className='mr-2 h-4 w-4' />
                          WhatsApp
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={e => {
                            e.stopPropagation()
                            handleFormatPhoneLink(debtor.phone)
                          }}
                          className='hover:bg-emerald-500/10 hover:text-emerald-400 focus:bg-emerald-500/10 focus:text-emerald-400'
                        >
                          <Phone className='mr-2 h-4 w-4' />
                          Telefone
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={e => {
                            e.stopPropagation()
                            handleFormatEmailLink(debtor.email)
                          }}
                          className='hover:bg-emerald-500/10 hover:text-emerald-400 focus:bg-emerald-500/10 focus:text-emerald-400'
                        >
                          <Mail className='mr-2 h-4 w-4' />
                          Email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className='bg-emerald-500/20' />
                        <DropdownMenuItem
                          onClick={e => {
                            e.stopPropagation()
                            handleOpenPaymentModal(installment)
                          }}
                          disabled={installment.status === DebtStatusEnum.PAID}
                          className='hover:bg-emerald-500/10 hover:text-emerald-400 focus:bg-emerald-500/10 focus:text-emerald-400'
                        >
                          <CreditCard className='mr-2 h-4 w-4' />
                          Registrar Pagamento
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {selected_installment && (
        <PaymentModal
          open={is_payment_modal_open}
          onOpenChange={set_payment_modal_open}
          installment={selected_installment}
          onUpdate={onUpdateInstallment}
          onClose={handleClosePaymentModal}
        >
          <Button variant='ghost' className='hidden'>
            Open Payment Modal
          </Button>
        </PaymentModal>
      )}
    </div>
  )
}
