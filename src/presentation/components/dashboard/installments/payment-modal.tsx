'use client'

import React, { useState } from 'react'

import { format } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

import type { InstallmentProps, UpdateInstallmentPayloadProps } from '@/application/interfaces/dashboard'

import { DebtStatusEnum } from '@/application/lib/enums'
import { formatCurrency } from '@/application/lib/formatters/currency'
import { moneyMask } from '@/application/lib/masks/money'

import { Button } from '@/presentation/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/presentation/components/ui/dialog'
import { Input } from '@/presentation/components/ui/input'
import { Label } from '@/presentation/components/ui/label'
import { SuccessAnimation } from '@/presentation/components/ui/success-animation'

interface PaymentModalProps {
  open: boolean
  installment: InstallmentProps
  onOpenChange: (open: boolean) => void
  onUpdate?: (data: UpdateInstallmentPayloadProps) => Promise<void>
  onClose: () => void
}

export function PaymentModal({ open, onOpenChange, installment, onUpdate, onClose }: PaymentModalProps) {
  // states
  const [is_loading, set_loading] = useState<boolean>(false)
  const [is_success, set_success] = useState<boolean>(false)
  const [payment_date, set_payment_date] = useState<string>(format(new Date(), 'yyyy-MM-dd'))
  const [payment_amount, set_payment_amount] = useState<string>(formatCurrency(installment.originalAmount))
  const [is_redistribute_remaining, set_redistribute_remaining] = useState<boolean>(false)

  // handlers
  async function handleSubmit() {
    if (!onUpdate) return

    set_loading(true)

    try {
      await onUpdate({
        id: installment.id,
        paymentDate: payment_date,
        paidAmount: parseFloat(payment_amount.replace(/\D/g, '')) / 100,
        status: DebtStatusEnum.PAID,
        recalculateRemaining: is_redistribute_remaining,
      })

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

  function isPaymentValid() {
    if (!payment_date || !payment_amount) return false

    const amount = parseFloat(payment_amount.replace(/\D/g, '')) / 100
    return !isNaN(amount) && amount > 0
  }

  function isPartialPayment() {
    const amount = parseFloat(payment_amount.replace(/\D/g, '')) / 100
    return amount < installment.originalAmount
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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

              <div className='grid gap-4 py-4'>
                <div className='grid gap-2'>
                  <Label htmlFor='dueDate'>Vencimento</Label>
                  <Input
                    id='dueDate'
                    value={format(new Date(installment.dueDate), 'dd/MM/yyyy')}
                    disabled
                    className='bg-neutral-900'
                  />
                </div>

                <div className='grid gap-2'>
                  <Label htmlFor='amount'>Valor Original</Label>
                  <Input
                    id='amount'
                    value={formatCurrency(installment.originalAmount)}
                    disabled
                    className='bg-neutral-900'
                  />
                </div>

                <div className='grid gap-2'>
                  <Label htmlFor='paymentDate'>Data do Pagamento</Label>
                  <Input
                    id='paymentDate'
                    type='date'
                    value={payment_date}
                    onChange={e => set_payment_date(e.target.value)}
                  />
                </div>

                <div className='grid gap-2'>
                  <Label htmlFor='paymentAmount'>Valor Pago</Label>
                  <Input
                    id='paymentAmount'
                    value={payment_amount}
                    onChange={e => {
                      const masked = moneyMask(e.target.value)
                      set_payment_amount(masked)
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
                          O valor informado ({formatCurrency(Number(payment_amount))}) é menor que o valor total da
                          dívida ({formatCurrency(installment.originalAmount)}).
                        </p>
                      </div>
                    </div>

                    <div className='mt-4'>
                      <label className='flex items-center gap-2'>
                        <input
                          type='checkbox'
                          checked={is_redistribute_remaining}
                          onChange={e => set_redistribute_remaining(e.target.checked)}
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
