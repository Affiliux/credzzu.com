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

import type { AlertsProps } from '@/interfaces/dashboard'

import { AlertStatusEnum } from '@/lib/enums'
import { formatCurrency } from '@/lib/formatters/currency'

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
        <h2 className='mb-4 text-xl font-bold text-white'>Alertas</h2>

        {loading ? (
          <div className='overflow-hidden rounded-lg border border-emerald-500/20 bg-black/60 backdrop-blur-sm'>
            <Table>
              <TableHeader>
                <TableRow className='border-emerald-500/10 hover:bg-emerald-500/5'>
                  <TableHead className='min-w-[120px] text-white/80 sm:min-w-[140px]'>Status</TableHead>
                  <TableHead className='min-w-[120px] text-white/80 sm:min-w-[140px]'>Devedor</TableHead>
                  <TableHead className='min-w-[160px] text-white/80 sm:min-w-[200px]'>Descrição</TableHead>
                  <TableHead className='min-w-[100px] text-white/80 sm:min-w-[120px]'>Valor</TableHead>
                  <TableHead className='min-w-[100px] text-white/80 sm:min-w-[120px]'>Vencimento</TableHead>
                  <TableHead className='min-w-[80px] text-white/80 sm:min-w-[100px]'>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <TableRow key={index} className='border-emerald-500/10'>
                      <TableCell>
                        <div className='flex items-center gap-2'>
                          <Skeleton className='h-6 w-6 rounded-full bg-emerald-500/10' />
                          <Skeleton className='h-4 w-24 bg-emerald-500/10' />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Skeleton className='h-4 w-32 bg-emerald-500/10' />
                      </TableCell>
                      <TableCell>
                        <Skeleton className='h-4 w-48 bg-emerald-500/10' />
                      </TableCell>
                      <TableCell>
                        <Skeleton className='h-4 w-20 bg-emerald-500/10' />
                      </TableCell>
                      <TableCell>
                        <Skeleton className='h-4 w-24 bg-emerald-500/10' />
                      </TableCell>
                      <TableCell>
                        <Skeleton className='h-8 w-8 rounded-md bg-emerald-500/10' />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        ) : alerts.length > 0 ? (
          <div className='overflow-hidden rounded-lg border border-emerald-500/20 bg-black/60 backdrop-blur-sm'>
            <Table>
              <TableHeader>
                <TableRow className='border-emerald-500/10 hover:bg-emerald-500/5'>
                  <TableHead className='min-w-[140px] text-white/80 sm:min-w-[180px]'>Status</TableHead>
                  <TableHead className='min-w-[120px] text-white/80 sm:min-w-[140px]'>Devedor</TableHead>
                  <TableHead className='min-w-[160px] text-white/80 sm:min-w-[200px]'>Descrição</TableHead>
                  <TableHead className='min-w-[100px] text-white/80 sm:min-w-[120px]'>Valor</TableHead>
                  <TableHead className='min-w-[100px] text-white/80 sm:min-w-[120px]'>Vencimento</TableHead>
                  <TableHead className='min-w-[80px] text-white/80 sm:min-w-[100px]'>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alerts.map(alert => {
                  const isLate = alert.status === AlertStatusEnum.OVERDUE
                  const isUpcoming = alert.status === AlertStatusEnum.PENDING

                  return (
                    <TableRow key={alert.id} className='border-emerald-500/10 text-white hover:bg-emerald-500/5'>
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
                              asChild
                              className='hover:bg-emerald-500/10 hover:text-emerald-400 focus:bg-emerald-500/10 focus:text-emerald-400'
                            >
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
                            <DropdownMenuItem
                              asChild
                              className='hover:bg-emerald-500/10 hover:text-emerald-400 focus:bg-emerald-500/10 focus:text-emerald-400'
                            >
                              <a href={handlePhoneLink(alert?.debtorPhone)} className='flex items-center'>
                                <Phone className='mr-2 h-4 w-4' />
                                Telefone
                              </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              asChild
                              className='hover:bg-emerald-500/10 hover:text-emerald-400 focus:bg-emerald-500/10 focus:text-emerald-400'
                            >
                              <a href={`mailto:${alert.debtorEmail}`} className='flex items-center'>
                                <Mail className='mr-2 h-4 w-4' />
                                Email
                              </a>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className='bg-emerald-500/20' />
                            <DropdownMenuItem
                              onClick={() => handlePaymentModal(alert)}
                              className='flex items-center hover:bg-emerald-500/10 hover:text-emerald-400 focus:bg-emerald-500/10 focus:text-emerald-400'
                            >
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
          <div className='rounded-lg border border-emerald-500/20 bg-black/60 p-6 text-center backdrop-blur-sm'>
            <p className='text-white/60'>Não há alertas para exibir</p>
          </div>
        )}
      </div>
    </>
  )
}
