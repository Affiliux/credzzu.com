'use client'

import React from 'react'

import { AlertTriangle } from 'lucide-react'

import type { AlertsProps } from '@/application/interfaces/dashboard'

import { formatCurrency } from '@/application/lib/formatters/currency'

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/presentation/components/ui/dialog'

interface PaymentModalProps {
  isOpen: boolean
  paymentDate: string
  paymentAmount: string
  redistributeRemaining: boolean
  selectedAlert: AlertsProps | null
  onClose: () => void
  onPayment: () => void
  isPaymentValid: () => boolean
  isPartialPayment: () => boolean
  onPaymentDateChange: (value: string) => void
  onPaymentAmountChange: (value: string) => void
  onRedistributeRemainingChange: (value: boolean) => void
}

export function PaymentModal({
  isOpen,
  paymentDate,
  paymentAmount,
  redistributeRemaining,
  selectedAlert,
  onClose,
  onPayment,
  isPaymentValid,
  isPartialPayment,
  onPaymentDateChange,
  onPaymentAmountChange,
  onRedistributeRemainingChange,
}: PaymentModalProps) {
  if (!selectedAlert) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Marcar como pago</DialogTitle>
        </DialogHeader>

        <div className='mt-6 space-y-4'>
          <div>
            <label htmlFor='payment_date' className='mb-2 block text-sm font-medium text-neutral-300'>
              Data do pagamento
            </label>
            <input
              type='date'
              id='payment_date'
              value={paymentDate}
              onChange={e => onPaymentDateChange(e.target.value)}
              className='w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-neutral-100 transition-colors outline-none focus:border-neutral-600'
            />
          </div>

          <div>
            <label htmlFor='payment_amount' className='mb-2 block text-sm font-medium text-neutral-300'>
              Valor do pagamento
            </label>
            <input
              type='number'
              id='payment_amount'
              value={paymentAmount}
              onChange={e => onPaymentAmountChange(e.target.value)}
              className='w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-neutral-100 transition-colors outline-none focus:border-neutral-600'
            />
          </div>

          {isPartialPayment() && (
            <div className='rounded-md bg-amber-500/10 p-4'>
              <div className='flex items-start gap-3'>
                <AlertTriangle className='mt-0.5 h-5 w-5 text-amber-500' />
                <div className='space-y-1'>
                  <p className='text-sm font-medium text-amber-500'>Pagamento parcial</p>
                  <p className='text-sm text-amber-500/90'>
                    O valor informado ({formatCurrency(Number(paymentAmount))}) é menor que o valor total da dívida (
                    {formatCurrency(selectedAlert.amount)}).
                  </p>
                </div>
              </div>

              <div className='mt-4'>
                <label className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    checked={redistributeRemaining}
                    onChange={e => onRedistributeRemainingChange(e.target.checked)}
                    className='h-4 w-4 rounded border-neutral-700 bg-neutral-800 text-neutral-100'
                  />
                  <span className='text-sm text-amber-500'>Redistribuir valor restante em novas parcelas</span>
                </label>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <button
            onClick={onClose}
            className='rounded-md border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm font-medium text-neutral-100 transition-colors hover:bg-neutral-700'
          >
            Cancelar
          </button>
          <button
            onClick={onPayment}
            disabled={!isPaymentValid()}
            className='rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50'
          >
            Confirmar pagamento
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
