import type { DebtFeesTypeEnum, DebtStatusEnum } from '@/lib/enums'

import type { PaginationResponseProps } from './pagination'

/**
 *
 * @name Dashboard
 * @category Dashboard - Dashboard
 *
 */

export interface DashboardProps {
  totalBorrowed: number
  totalReceive: number
  totalPaid: number
  profitWithInterest: number
  numDebtors: number
  numOpenDebts: number
  numDebtsPaid: number
}

export interface DashboardResponseProps extends DashboardProps {}

/**
 *
 * @name Alerts
 * @category Dashboard - Alerts
 *
 */

export interface AlertsProps {
  id: string
  status: string
  dueDate: string
  amount: number
  debtorName: string
  debtorPhone: string
  debtorEmail: string
  debtDescription: string
  daysLate: number
  daysUntilDue: number
}

export interface AlertsResponseProps extends AlertsProps {}

/**
 *
 * @name Debtor
 * @category Dashboard - Debtor
 *
 */

export interface DebtorProps {
  id?: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  country: string
  documentType: string
  documentNumber: string
  createdAt?: string
  updatedAt?: string
}

/**
 *
 * @name GetDebtors
 * @category Dashboard - Get Debtors
 *
 */

export interface GetDebtorsPayloadProps {
  page: number
  limit: number
  query?: string
}

export interface GetDebtorByIdPayloadProps {
  id: string
}

export interface GetDebtorByIdResponseProps extends DebtorProps {}

export interface DebtorResponseProps {
  data: {
    debtors: DebtorProps[]
  }
  meta: PaginationResponseProps
}

/**
 *
 * @name CreateDebtor
 * @category Dashboard - Create Debtor
 *
 */

export interface CreateDebtorPayloadProps extends DebtorProps {}
export interface CreateDebtorResponseProps {
  id: string
}

/**
 *
 * @name UpdateDebtor
 * @category Dashboard - Update Debtor
 *
 */

export interface UpdateDebtorPayloadProps extends DebtorProps {}

/**
 *
 * @name DeleteDebtor
 * @category Dashboard - Delete Debtor
 *
 */

export interface DeleteDebtorPayloadProps {
  id: string
}

/**
 *
 * @name Debtor
 * @category Dashboard - Debtor
 *
 */

export interface DebtProps {
  id?: string
  idDebtor: string
  description: string
  totalValue: number
  dateOfDebt: string
  feesType: DebtFeesTypeEnum
  feesDailyValue: number
  feeLateType: DebtFeesTypeEnum
  feeLateValue: number
  installmentsNumber: number
  isPaid?: boolean
  status?: DebtStatusEnum
  createdAt?: string
  updatedAt?: string
}

/**
 *
 * @name GetDebts
 * @category Dashboard - Get Debts
 *
 */

export interface GetDebtsPayloadProps {
  page: number
  limit: number
  query?: string
}

export interface GetDebtsByDebtorPayloadProps {
  idDebtor: string
  page: number
  limit: number
  query?: string
}

export interface GetDebtsResponseProps {
  data: {
    debts: DebtProps[]
  }
  meta: PaginationResponseProps
}

/**
 *
 * @name CreateDebt
 * @category Dashboard - Create Debt
 *
 */

export interface CreateDebtPayloadProps extends DebtProps {}
export interface CreateDebtResponseProps {
  id: string
}

/**
 *
 * @name UpdateDebt
 * @category Dashboard - Update Debt
 *
 */

export interface UpdateDebtPayloadProps extends DebtProps {}

/**
 *
 * @name DeleteDebt
 * @category Dashboard - Delete Debt
 *
 */

export interface DeleteDebtPayloadProps {
  id: string
}

/**
 *
 * @name Installment
 * @category Dashboard - Installment
 *
 */

export interface InstallmentProps {
  id: string
  installmentNumber: number
  dueDate: string
  paymentDate: string
  originalAmount: number
  paidAmount: number
  status: DebtStatusEnum
  lateFee: number
  interestFee: number
  idDebt: string
  idDebtor: string
  createdAt: string
  updatedAt: string
}

/**
 *
 * @name GetInstallments
 * @category Dashboard - Get Installments
 *
 */

export interface GetInstallmentsPayloadProps {
  idDebt: string
}

export interface GetInstallmentsResponseProps extends InstallmentProps {}

/**
 *
 * @name UpdateInstallment
 * @category Dashboard - Update Installment
 *
 */

export interface UpdateInstallmentPayloadProps {
  id: string
  paymentDate: string
  paidAmount: number
  status: DebtStatusEnum
  recalculateRemaining: boolean
}

export interface UpdateInstallmentResponseProps {
  installment: InstallmentProps
}
