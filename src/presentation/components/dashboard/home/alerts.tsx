'use client'

import React from 'react'

import { format } from 'date-fns'
import {
  AlertTriangle,
  CheckCircle2,
  CreditCard,
  InfoIcon,
  Mail,
  MoreHorizontal,
  Phone,
  Smartphone,
} from 'lucide-react'

import type { AlertsProps } from '@/application/interfaces/dashboard'

import { AlertStatusEnum } from '@/application/lib/enums'
import { formatCurrency } from '@/application/lib/formatters/currency'

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

export function Alerts({
  alerts,
  loading,
  handleWhatsAppLink,
  handlePhoneLink,
  handlePaymentModal,
}: {
  alerts: AlertsProps[]
  loading: boolean
  handleWhatsAppLink: (phone: string) => string
  handlePhoneLink: (phone: string) => string
  handlePaymentModal: (alert: AlertsProps) => void
}) {
  return (
    <>
      {/* Alerts */}
      <div className='mt-8'>
        <h2 className='mb-4 text-xl font-bold text-neutral-100'>Alertas</h2>

        {loading ? (
          <div className='rounded-lg border border-neutral-700 bg-neutral-800'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='min-w-[120px] sm:min-w-[140px]'>Status</TableHead>
                  <TableHead className='min-w-[120px] sm:min-w-[140px]'>Devedor</TableHead>
                  <TableHead className='min-w-[160px] sm:min-w-[200px]'>Descrição</TableHead>
                  <TableHead className='min-w-[100px] sm:min-w-[120px]'>Valor</TableHead>
                  <TableHead className='min-w-[100px] sm:min-w-[120px]'>Vencimento</TableHead>
                  <TableHead className='min-w-[80px] sm:min-w-[100px]'>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className='flex items-center gap-2'>
                          <Skeleton className='h-6 w-6 rounded-full' />
                          <Skeleton className='h-4 w-24' />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Skeleton className='h-4 w-32' />
                      </TableCell>
                      <TableCell>
                        <Skeleton className='h-4 w-48' />
                      </TableCell>
                      <TableCell>
                        <Skeleton className='h-4 w-20' />
                      </TableCell>
                      <TableCell>
                        <Skeleton className='h-4 w-24' />
                      </TableCell>
                      <TableCell>
                        <Skeleton className='h-8 w-8 rounded-md' />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        ) : alerts.length > 0 ? (
          <div className='rounded-lg border border-neutral-700 bg-neutral-800'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='min-w-[140px] sm:min-w-[180px]'>Status</TableHead>
                  <TableHead className='min-w-[120px] sm:min-w-[140px]'>Devedor</TableHead>
                  <TableHead className='min-w-[160px] sm:min-w-[200px]'>Descrição</TableHead>
                  <TableHead className='min-w-[100px] sm:min-w-[120px]'>Valor</TableHead>
                  <TableHead className='min-w-[100px] sm:min-w-[120px]'>Vencimento</TableHead>
                  <TableHead className='min-w-[80px] sm:min-w-[100px]'>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alerts.map(alert => {
                  const isLate = alert.status === AlertStatusEnum.OVERDUE
                  const isUpcoming = alert.status === AlertStatusEnum.PENDING

                  return (
                    <TableRow key={alert.id}>
                      <TableCell>
                        <div className='flex items-center gap-2'>
                          <div
                            className={`flex h-6 w-6 items-center justify-center rounded-full ${
                              isLate ? 'bg-red-500/10' : isUpcoming ? 'bg-amber-500/10' : 'bg-emerald-500/10'
                            }`}
                          >
                            {isLate ? (
                              <AlertTriangle className='h-3 w-3 text-red-500' />
                            ) : isUpcoming ? (
                              <InfoIcon className='h-3 w-3 text-amber-500' />
                            ) : (
                              <CheckCircle2 className='h-3 w-3 text-emerald-500' />
                            )}
                          </div>
                          <span
                            className={`text-sm font-medium ${
                              isLate ? 'text-red-400' : isUpcoming ? 'text-amber-400' : 'text-emerald-400'
                            }`}
                          >
                            {isLate
                              ? `Atrasado há ${alert.daysLate} dias`
                              : isUpcoming
                                ? `Em ${alert.daysUntilDue} dias`
                                : 'Em dia'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className='font-medium'>{alert.debtorName}</TableCell>
                      <TableCell className='max-w-[200px] truncate' title={alert.debtDescription}>
                        {alert.debtDescription}
                      </TableCell>
                      <TableCell className='font-medium'>{formatCurrency(alert.amount)}</TableCell>
                      <TableCell>{format(new Date(alert.dueDate), 'dd/MM/yyyy')}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant='ghost' className='h-8 w-8 p-0'>
                              <span className='sr-only'>Abrir menu</span>
                              <MoreHorizontal className='h-4 w-4' />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuItem asChild>
                              <a
                                href={handleWhatsAppLink(alert?.debtorPhone)}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='flex items-center'
                              >
                                <Smartphone className='mr-2 h-4 w-4' />
                                WhatsApp
                              </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <a href={handlePhoneLink(alert?.debtorPhone)} className='flex items-center'>
                                <Phone className='mr-2 h-4 w-4' />
                                Telefone
                              </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <a href={`mailto:${alert.debtorEmail}`} className='flex items-center'>
                                <Mail className='mr-2 h-4 w-4' />
                                Email
                              </a>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handlePaymentModal(alert)} className='flex items-center'>
                              <CreditCard className='mr-2 h-4 w-4' />
                              Registrar Pagamento
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className='rounded-lg border border-neutral-700 bg-neutral-800 p-6 text-center'>
            <p className='text-neutral-400'>Não há alertas para exibir</p>
          </div>
        )}
      </div>
    </>
  )
}
