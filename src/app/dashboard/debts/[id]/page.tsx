'use client'

import React, { use, useEffect, useState } from 'react'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import type { UpdateInstallmentPayloadProps } from '@/interfaces/dashboard'

import { useDashboard } from '@/contexts/DashboardContext'
import { useSubscription } from '@/contexts/SubscriptionContext'

import { useQueryParams } from '@/hooks/use-query-params'

import { InstallmentsTable } from '@/components/dashboard/installments/installments-table'
import { LockedScreen } from '@/components/dashboard/locked-screen'
import { Button } from '@/components/ui/button'

export const runtime = 'edge'

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  // hooks
  const { id } = use(params)
  const router = useRouter()
  const { debtorId } = useQueryParams()

  // contexts
  const { subscription } = useSubscription()
  const { debtor, installments, onGetInstallments, onUpdateInstallment, onGetDebtorById } = useDashboard()

  // states
  const [is_loading, set_loading] = useState<boolean>(true)

  // handlers
  async function handleGetInstallments() {
    set_loading(true)

    try {
      await onGetInstallments({ idDebt: id })
    } catch (error) {
      console.error(error)
      toast.error('Erro ao carregar parcelas')
    } finally {
      set_loading(false)
    }
  }

  async function handleUpdateInstallment(data: UpdateInstallmentPayloadProps) {
    set_loading(true)

    try {
      await onUpdateInstallment(data)
      if (data.recalculateRemaining) await handleGetInstallments()
    } catch (error) {
      console.error(error)
      toast.error('Erro ao registrar pagamento')

      throw new Error(error.message)
    } finally {
      set_loading(false)
    }
  }

  async function handleGetDebtorById() {
    set_loading(true)

    try {
      await onGetDebtorById({ id: installments[0]?.idDebtor })
    } catch (error) {
      console.error(error)
      toast.error('Erro ao carregar dados do devedor')
    } finally {
      set_loading(false)
    }
  }

  function handleBack() {
    if (id) {
      if (debtorId) router.push(`/dashboard/debts?debtorId=${debtorId}`)
      else router.push('/dashboard/debts')
    } else {
      router.push('/dashboard')
    }
  }

  // effects
  useEffect(() => {
    handleGetInstallments()
  }, [id])

  useEffect(() => {
    if (installments[0]?.idDebtor) {
      handleGetDebtorById()
    }
  }, [installments])

  // render
  return (
    <LockedScreen subscription={subscription}>
      <div className='flex h-full flex-col space-y-6'>
        <div className='flex flex-col justify-between space-y-2 md:flex-row md:items-center md:space-y-0'>
          <div className='flex items-center space-x-4'>
            <Button variant='ghost' size='icon' onClick={handleBack}>
              <ArrowLeft className='h-6 w-6' />
            </Button>
            <h1 className='text-2xl font-bold text-neutral-100'>Parcelas</h1>
          </div>
        </div>

        <InstallmentsTable
          data={installments}
          debtor={debtor}
          is_loading={is_loading}
          onUpdateInstallment={handleUpdateInstallment}
        />
      </div>
    </LockedScreen>
  )
}
