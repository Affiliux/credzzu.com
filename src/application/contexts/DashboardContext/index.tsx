'use client'

import React, { createContext, useContext, useState } from 'react'

import {
  create_debt,
  create_debtor,
  delete_debt,
  delete_debtor,
  get_alerts,
  get_dashboard,
  get_debtor_by_id,
  get_debtors,
  get_debts,
  get_debts_by_debtor,
  get_installments,
  update_debt,
  update_debtor,
  update_installment,
} from '@/infrastructure/http/services/dashboard'

import type {
  AlertsProps,
  CreateDebtorPayloadProps,
  CreateDebtPayloadProps,
  DashboardProps,
  DebtorProps,
  DebtProps,
  DeleteDebtorPayloadProps,
  DeleteDebtPayloadProps,
  GetDebtorByIdPayloadProps,
  GetDebtorsPayloadProps,
  GetDebtsByDebtorPayloadProps,
  GetDebtsPayloadProps,
  GetInstallmentsPayloadProps,
  InstallmentProps,
  UpdateDebtorPayloadProps,
  UpdateDebtPayloadProps,
  UpdateInstallmentPayloadProps,
} from '@/application/interfaces/dashboard'
import { PaginationResponseProps } from '@/application/interfaces/pagination'

import type { DashboardContextType, DashboardProviderProps } from './types'

export const DashboardContext = createContext<DashboardContextType>({} as DashboardContextType)

export default function DashboardProvider({ children }: DashboardProviderProps) {
  // states
  const [big_numbers, set_big_numbers] = useState<DashboardProps>({} as DashboardProps)
  const [alerts, set_alerts] = useState<AlertsProps[]>([])

  const [debtors, set_debtors] = useState<DebtorProps[]>([])
  const [debtor, set_debtor] = useState<DebtorProps>({} as DebtorProps)
  const [pagination, set_pagination] = useState<PaginationResponseProps>({} as PaginationResponseProps)

  const [debts, set_debts] = useState<DebtProps[]>([])
  const [pagination_debts, set_pagination_debts] = useState<PaginationResponseProps>({} as PaginationResponseProps)

  const [installments, set_installments] = useState<InstallmentProps[]>([])

  async function onGetDashboard() {
    try {
      const response = await get_dashboard()
      if (response) set_big_numbers(response)
    } catch (error: any) {
      console.error(error)
    }
  }

  async function onGetAlerts() {
    try {
      const response = await get_alerts()
      if (response) set_alerts(response)
    } catch (error: any) {
      console.error(error)
    }
  }

  async function onGetDebtors(payload: GetDebtorsPayloadProps) {
    try {
      const response = await get_debtors(payload)

      if (response) {
        set_debtors(response.data.debtors)
        set_pagination(response.meta)
      }
    } catch (error: any) {
      console.error(error)
    }
  }

  async function onGetDebtorById(payload: GetDebtorByIdPayloadProps) {
    try {
      const response = await get_debtor_by_id(payload)
      if (response) set_debtor(response)
    } catch (error: any) {
      console.error(error)
    }
  }

  async function onCreateDebtor(payload: CreateDebtorPayloadProps) {
    try {
      const response = await create_debtor(payload)

      if (response) {
        await onGetDebtors({
          page: 1,
          limit: pagination.limit ?? 10,
        })
      }
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }

  async function onUpdateDebtor(payload: UpdateDebtorPayloadProps) {
    try {
      await update_debtor(payload)

      if (debtors) {
        set_debtors(debtors.map(debtor => (debtor.id === payload.id ? { ...debtor, ...payload } : debtor)))
      }
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }

  async function onDeleteDebtor(payload: DeleteDebtorPayloadProps) {
    try {
      await delete_debtor(payload)

      if (debtors) {
        set_debtors(debtors.filter(debtor => debtor.id !== payload.id))
        await onGetDebtors({
          page: pagination.page ?? 1,
          limit: pagination.limit ?? 10,
        })
      }
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }

  async function onGetDebts(payload: GetDebtsPayloadProps) {
    try {
      const response = await get_debts(payload)

      if (response) {
        set_debts(response.data.debts)
        set_pagination_debts(response.meta)
      }
    } catch (error: any) {
      console.error(error)
    }
  }

  async function onGetDebtsByDebtor(payload: GetDebtsByDebtorPayloadProps) {
    try {
      const response = await get_debts_by_debtor(payload)

      if (response) {
        set_debts(response.data.debts)
        set_pagination_debts(response.meta)
      }
    } catch (error: any) {
      console.error(error)
    }
  }

  async function onCreateDebt(payload: CreateDebtPayloadProps) {
    try {
      const response = await create_debt(payload)

      if (response) {
        await onGetDebtsByDebtor({
          idDebtor: payload.idDebtor,
          page: 1,
          limit: pagination_debts.limit ?? 10,
        })
      }
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }

  async function onUpdateDebt(payload: UpdateDebtPayloadProps) {
    try {
      await update_debt(payload)

      if (debts) {
        set_debts(debts.map(debt => (debt.id === payload.id ? { ...debt, ...payload } : debt)))
      }
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }

  async function onDeleteDebt(payload: DeleteDebtPayloadProps) {
    try {
      await delete_debt(payload)

      if (debts) {
        set_debts(debts.filter(debt => debt.id !== payload.id))
      }
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }

  async function onGetInstallments(payload: GetInstallmentsPayloadProps) {
    try {
      const response = await get_installments(payload)

      if (response) {
        set_installments(response)
      }
    } catch (error: any) {
      console.error(error)
    }
  }

  async function onUpdateInstallment(payload: UpdateInstallmentPayloadProps) {
    try {
      const response = await update_installment(payload)

      if (response.installment) {
        set_installments(
          installments.map(installment => (installment.id === payload.id ? response.installment : installment)),
        )
      }
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }

  return (
    <DashboardContext.Provider
      value={{
        big_numbers,
        alerts,
        debtors,
        debtor,
        pagination,
        debts,
        pagination_debts,
        installments,
        //
        set_debtor,
        set_pagination,
        set_debts,
        set_pagination_debts,
        set_installments,
        //
        onGetDashboard,
        onGetAlerts,
        onGetDebtors,
        onGetDebtorById,
        onCreateDebtor,
        onUpdateDebtor,
        onDeleteDebtor,
        onGetDebts,
        onGetDebtsByDebtor,
        onCreateDebt,
        onUpdateDebt,
        onDeleteDebt,
        onGetInstallments,
        onUpdateInstallment,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export const useDashboard = () => {
  const context = useContext(DashboardContext)
  return context
}
