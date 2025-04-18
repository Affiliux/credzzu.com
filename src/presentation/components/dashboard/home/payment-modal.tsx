'use client'

import React, { useState } from 'react'

import { format } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

import type { AlertsProps } from '@/application/interfaces/dashboard'

import { DebtStatusEnum } from '@/application/lib/enums'
import { formatCurrency } from '@/application/lib/formatters/currency'
import { moneyMask } from '@/application/lib/masks/money'

import { Button } from '@/presentation/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/presentation/components/ui/dialog'
import { Input } from '@/presentation/components/ui/input'
import { Label } from '@/presentation/components/ui/label'
import { SuccessAnimation } from '@/presentation/components/ui/success-animation'
import { Switch } from '@/presentation/components/ui/switch'

interface PaymentModalProps {
  isOpen: boolean
  selectedAlert: AlertsProps | null
  paymentDate: string
  paymentAmount: string
  redistributeRemaining: boolean
  onClose: () => void
  onPayment: () => Promise<void>
  isPaymentValid: () => boolean
  isPartialPayment: () => boolean
  onPaymentDateChange: (value: string) => void
  onPaymentAmountChange: (value: string) => void
  onRedistributeRemainingChange: (value: boolean) => void
}

export function PaymentModal({
  isOpen,
  selectedAlert,
  onClose,
  onPayment,
  isPaymentValid,
  isPartialPayment,
  paymentDate,
  paymentAmount,
  redistributeRemaining,
  onPaymentDateChange,
  onPaymentAmountChange,
  onRedistributeRemainingChange,
}: PaymentModalProps) {
  // states
  const [is_loading, set_loading] = useState<boolean>(false)
  const [is_success, set_success] = useState<boolean>(false)

  // handlers
  async function handleSubmit() {
    set_loading(true)

    try {
      await onPayment()
      set_success(true)

      setTimeout(() => {
        onClose()
        set_success(false)
      }, 2000)
    } catch (error) {
      console.error(error)
    } finally {
      set_loading(false)
    }
  }

  if (!selectedAlert) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <AnimatePresence mode='wait'>
          {is_success ? (
            <SuccessAnimation message='Pagamento registrado com sucesso!' />
          ) : (
            <motion.div
              key='dialog-content'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <DialogTitle>Registrar Pagamento</DialogTitle>
              </DialogHeader>

              <div className='grid gap-4 py-6'>
                <div className='grid gap-2'>
                  <Label htmlFor='description'>Descrição</Label>
                  <Input id='description' value={selectedAlert.debtDescription} disabled className='bg-neutral-900' />
                </div>

                <div className='grid gap-2'>
                  <Label htmlFor='amount'>Valor Original</Label>
                  <Input id='amount' value={formatCurrency(selectedAlert.amount)} disabled className='bg-neutral-900' />
                </div>

                <div className='grid gap-2'>
                  <Label htmlFor='paymentDate'>Data do Pagamento</Label>
                  <Input
                    id='paymentDate'
                    type='date'
                    value={paymentDate}
                    onChange={e => onPaymentDateChange(e.target.value)}
                  />
                </div>

                <div className='grid gap-2'>
                  <Label htmlFor='paymentAmount'>Valor Pago</Label>
                  <Input
                    id='paymentAmount'
                    value={paymentAmount}
                    onChange={e => {
                      const masked = moneyMask(e.target.value)
                      onPaymentAmountChange(masked)
                    }}
                  />
                </div>

                {isPartialPayment() && (
                  <div className='rounded-md bg-amber-500/10 p-4'>
                    <div className='flex items-start gap-3'>
                      <AlertTriangle className='mt-0.5 h-5 w-5 text-amber-500' />
                      <div className='space-y-1'>
                        <p className='text-sm font-medium text-amber-500'>Pagamento parcial</p>
                        <p className='text-sm text-amber-500/90'>
                          O valor informado ({formatCurrency(Number(paymentAmount))}) é menor que o valor total da
                          dívida ({formatCurrency(selectedAlert.amount)}).
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

              <div className='flex justify-end space-x-2'>
                <Button variant='outline' onClick={onClose} disabled={is_loading}>
                  Cancelar
                </Button>
                <Button onClick={handleSubmit} disabled={!isPaymentValid() || is_loading}>
                  Registrar
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
