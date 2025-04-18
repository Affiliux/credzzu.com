'use client'

import React, { useState } from 'react'

import { format } from 'date-fns'
import { CreditCard, Mail, MoreHorizontal, Phone, Smartphone } from 'lucide-react'

import type { DebtorProps, InstallmentProps, UpdateInstallmentPayloadProps } from '@/application/interfaces/dashboard'

import { DebtStatusEnum } from '@/application/lib/enums'
import { formatCurrency } from '@/application/lib/formatters/currency'

import { Badge } from '@/presentation/components/ui/badge'
import { Button } from '@/presentation/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/presentation/components/ui/dropdown-menu'
import { Skeleton } from '@/presentation/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/presentation/components/ui/table'

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
    return `https://wa.me/55${phoneNumber}`
  }

  function handleFormatPhoneLink(phone: string) {
    const phoneNumber = phone?.replace(/\D/g, '')
    return `tel:+55${phoneNumber}`
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
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Parcela</TableHead>
            <TableHead>Vencimento</TableHead>
            <TableHead>Pagamento</TableHead>
            <TableHead>Valor Original</TableHead>
            <TableHead>Valor Pago</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className='w-[100px]'>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {is_loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index} className='h-16'>
                <TableCell>
                  <Skeleton className='h-4 w-8' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-32' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-32' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-24' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-24' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-20' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-8 w-8 rounded-full' />
                </TableCell>
              </TableRow>
            ))
          ) : data?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className='h-40 px-4'>
                <div className='flex flex-col items-start md:items-center'>
                  <p className='text-center text-base text-neutral-400 sm:text-sm'>Nenhuma parcela encontrada</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            data?.map(installment => (
              <TableRow key={installment.id} className='h-16'>
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
                      <Button variant='ghost' size='icon'>
                        <MoreHorizontal className='h-4 w-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuItem asChild>
                        <a
                          href={handleFormatWhatsAppLink(debtor.phone)}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex items-center'
                        >
                          <Smartphone className='mr-2 h-4 w-4' />
                          WhatsApp
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <a href={handleFormatPhoneLink(debtor.phone)} className='flex items-center'>
                          <Phone className='mr-2 h-4 w-4' />
                          Telefone
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <a href={`mailto:${debtor.email}`} className='flex items-center'>
                          <Mail className='mr-2 h-4 w-4' />
                          Email
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleOpenPaymentModal(installment)}
                        disabled={installment.status === DebtStatusEnum.PAID}
                        className='flex items-center'
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

      {selected_installment && (
        <PaymentModal
          open={is_payment_modal_open}
          onOpenChange={set_payment_modal_open}
          installment={selected_installment}
          onUpdate={onUpdateInstallment}
          onClose={handleClosePaymentModal}
        />
      )}
    </div>
  )
}
