import type { Dispatch, ReactNode, SetStateAction } from 'react'

import type {
  AlertsProps,
  CreateDebtorPayloadProps,
  DashboardProps,
  DebtorProps,
  DeleteDebtorPayloadProps,
  DeleteDebtPayloadProps,
  GetDebtorsPayloadProps,
  GetDebtsByDebtorPayloadProps,
  GetDebtsPayloadProps,
  GetInstallmentsPayloadProps,
  InstallmentProps,
  UpdateDebtorPayloadProps,
  UpdateDebtPayloadProps,
} from '@/application/interfaces/dashboard'
import type { PaginationResponseProps } from '@/application/interfaces/pagination'

export type DashboardProviderProps = {
  children: ReactNode
}

export type DashboardContextType = {
  big_numbers: DashboardProps
  alerts: AlertsProps[]
  debtors: DebtorProps[]
  debtor: DebtorProps
  pagination: PaginationResponseProps
  debts: DebtProps[]
  pagination_debts: PaginationResponseProps
  installments: InstallmentProps[]
  //
  set_debtor: Dispatch<SetStateAction<DebtorProps>>
  set_pagination: Dispatch<SetStateAction<PaginationResponseProps>>
  set_debts: Dispatch<SetStateAction<DebtProps[]>>
  set_pagination_debts: Dispatch<SetStateAction<PaginationResponseProps>>
  set_installments: Dispatch<SetStateAction<InstallmentProps[]>>
  //
  onGetDashboard: () => Promise<void>
  onGetAlerts: () => Promise<void>
  onGetDebtors: (payload: GetDebtorsPayloadProps) => Promise<void>
  onGetDebtorById: (payload: GetDebtorByIdPayloadProps) => Promise<void>
  onCreateDebtor: (payload: CreateDebtorPayloadProps) => Promise<void>
  onUpdateDebtor: (payload: UpdateDebtorPayloadProps) => Promise<void>
  onDeleteDebtor: (payload: DeleteDebtorPayloadProps) => Promise<void>
  onGetDebts: (payload: GetDebtsPayloadProps) => Promise<void>
  onGetDebtsByDebtor: (payload: GetDebtsByDebtorPayloadProps) => Promise<void>
  onCreateDebt: (payload: CreateDebtPayloadProps) => Promise<void>
  onUpdateDebt: (payload: UpdateDebtPayloadProps) => Promise<void>
  onDeleteDebt: (payload: DeleteDebtPayloadProps) => Promise<void>
  onGetInstallments: (payload: GetInstallmentsPayloadProps) => Promise<void>
  onUpdateInstallment: (payload: UpdateInstallmentPayloadProps) => Promise<void>
}
