'use client'

import React, { useEffect, useState } from 'react'

import { format } from 'date-fns'
import { LoaderCircle, RefreshCcw } from 'lucide-react'
import { toast } from 'sonner'

import type { AlertsProps } from '@/interfaces/dashboard'

import { useDashboard } from '@/contexts/DashboardContext'

import { DebtStatusEnum } from '@/lib/enums'
import { moneyMask } from '@/lib/masks/money'

import { Alerts } from '@/components/dashboard/home/alerts'
import { BigNumbers } from '@/components/dashboard/home/big-numbers'
import { PaymentModal } from '@/components/dashboard/home/payment-modal'
import { Button } from '@/components/ui/button'
import { removeMask } from '@/lib/masks/remove'

export const runtime = 'edge'

export default function Page() {
  // contexts
  const { big_numbers, alerts, onGetDashboard, onGetAlerts, onUpdateInstallment } = useDashboard()

  // states
  const [is_loading, set_loading] = useState<boolean>(true)
  const [is_payment_modal_open, set_payment_modal_open] = useState<boolean>(false)
  const [selected_alert, set_selected_alert] = useState<AlertsProps | null>(null)
  const [payment_date, set_payment_date] = useState<string>('')
  const [payment_amount, set_payment_amount] = useState<string>('')
  const [is_redistribute_remaining, set_redistribute_remaining] = useState<boolean>(false)

  async function handleGetData() {
    set_loading(true)

    try {
      await onGetDashboard()
      await onGetAlerts()
    } catch (error: any) {
      console.error(error)
    } finally {
      set_loading(false)
    }
  }

  function handleFormatWhatsAppLink(phone: string) {
    const phoneNumber = phone.replace(/\D/g, '')
    return `https://wa.me/${phoneNumber}`
  }

  function handleFormatPhoneLink(phone: string) {
    const phoneNumber = phone.replace(/\D/g, '')
    return `tel:+${phoneNumber}`
  }

  function handleOpenPaymentModal(alert: AlertsProps) {
    set_selected_alert(alert)
    set_payment_date(format(new Date(), 'yyyy-MM-dd'))
    set_payment_amount(moneyMask((alert.amount * 100).toString()))
    set_redistribute_remaining(false)
    set_payment_modal_open(true)
  }

  async function handlePayment() {
    try {
      await onUpdateInstallment({
        id: selected_alert?.id,
        paymentDate: payment_date,
        paidAmount: parseFloat(payment_amount.replace('R$', '').replace('.', '').replace(',', '.')),
        status: DebtStatusEnum.PAID,
        recalculateRemaining: is_redistribute_remaining,
      })
    } catch (error: any) {
      console.error(error)
      toast.error('Erro ao registrar pagamento')
    }
  }

  function isPaymentValid() {
    if (!payment_date || !payment_amount) return false

    const amount = parseFloat(payment_amount.replace(/\D/g, '')) / 100
    return !isNaN(amount) && amount > 0
  }

  function isPartialPayment() {
    if (!selected_alert || !payment_amount) return false

    const amount = parseFloat(payment_amount.replace(/\D/g, '')) / 100
    return amount < selected_alert.amount
  }

  useEffect(() => {
    handleGetData()
  }, [])

  return (
    <div className='w-full space-y-6'>
      <div className='flex flex-col justify-between space-y-2 md:flex-row md:items-center md:space-y-0'>
        <h1 className='text-2xl font-bold text-neutral-100'>Dashboard</h1>
        <Button onClick={handleGetData} disabled={is_loading}>
          {is_loading ? (
            <>
              <LoaderCircle className='mr-2 h-4 w-4 animate-spin' />
              Atualizando...
            </>
          ) : (
            <>
              <RefreshCcw className='mr-2 h-4 w-4' />
              Atualizar
            </>
          )}
        </Button>
      </div>

      {/* Big Numbers */}
      <BigNumbers bigNumbers={big_numbers} loading={is_loading} />

      {/* Alerts */}
      <Alerts
        alerts={alerts}
        loading={is_loading}
        handleWhatsAppLink={handleFormatWhatsAppLink}
        handlePhoneLink={handleFormatPhoneLink}
        handlePaymentModal={handleOpenPaymentModal}
      />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={is_payment_modal_open}
        onClose={() => set_payment_modal_open(false)}
        onPayment={handlePayment}
        isPaymentValid={isPaymentValid}
        isPartialPayment={isPartialPayment}
        paymentDate={payment_date}
        paymentAmount={payment_amount}
        redistributeRemaining={is_redistribute_remaining}
        selectedAlert={selected_alert}
        onPaymentDateChange={set_payment_date}
        onPaymentAmountChange={set_payment_amount}
        onRedistributeRemainingChange={set_redistribute_remaining}
      />
    </div>
  )
}
