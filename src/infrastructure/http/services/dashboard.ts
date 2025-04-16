import type { AxiosError } from 'axios'

import type {
  AlertsResponseProps,
  CreateDebtorPayloadProps,
  CreateDebtorResponseProps,
  CreateDebtPayloadProps,
  CreateDebtResponseProps,
  DashboardResponseProps,
  DebtorResponseProps,
  DeleteDebtorPayloadProps,
  DeleteDebtPayloadProps,
  GetDebtorsPayloadProps,
  GetDebtsByDebtorPayloadProps,
  GetDebtsPayloadProps,
  GetDebtsResponseProps,
  GetInstallmentsPayloadProps,
  GetInstallmentsResponseProps,
  UpdateDebtorPayloadProps,
  UpdateDebtPayloadProps,
  UpdateInstallmentPayloadProps,
  UpdateInstallmentResponseProps,
} from '@/application/interfaces/dashboard'

import { api } from '../api'

/**
 *
 * @name get_dashboard
 * @category Infrastructure - Services - Dashboard - Get Dashboard
 *
 * @return {PromiseLike<DashboardResponseProps>} - The response of the API
 */

export async function get_dashboard(): Promise<DashboardResponseProps> {
  try {
    const { data: response } = await api.get(`dashboard`)
    return response
  } catch (error: AxiosError | any) {
    throw new Error(error?.response.status)
  }
}

/**
 *
 * @name get_alerts
 * @category Infrastructure - Services - Dashboard - Get Alerts
 *
 * @return {PromiseLike<AlertsResponseProps[]>} - The response of the API
 */

export async function get_alerts(): Promise<AlertsResponseProps[]> {
  try {
    const { data: response } = await api.get(`dashboard/alerts`)
    return response
  } catch (error: AxiosError | any) {
    throw new Error(error?.response.status)
  }
}

/**
 *
 * @name get_debtors
 * @category Infrastructure - Services - Dashboard - Get Debtors
 *
 * @param {GetDebtorsPayloadProps} payload - The payload of the API
 * @return {PromiseLike<DebtorResponseProps>} - The response of the API
 */

export async function get_debtors(payload: GetDebtorsPayloadProps): Promise<DebtorResponseProps> {
  try {
    const { data: response } = await api.get(`debtor/find?page=${payload.page}&limit=${payload.limit}&${payload.query}`)
    return response
  } catch (error: AxiosError | any) {
    throw new Error(error?.response.status)
  }
}

/**
 *
 * @name create_debtor
 * @category Infrastructure - Services - Dashboard - Create Debtor
 *
 * @param {CreateDebtorPayloadProps} payload - The payload of the API
 * @return {PromiseLike<CreateDebtorResponseProps>} - The response of the API
 */

export async function create_debtor(payload: CreateDebtorPayloadProps): Promise<CreateDebtorResponseProps> {
  try {
    const { data: response } = await api.post(`debtor/create`, payload)
    return response
  } catch (error: AxiosError | any) {
    throw new Error(error?.response.status)
  }
}

/**
 *
 * @name update_debtor
 * @category Infrastructure - Services - Dashboard - Update Debtor
 *
 * @param {UpdateDebtorPayloadProps} payload - The payload of the API
 * @return {PromiseLike<void>} - The response of the API
 */

export async function update_debtor(payload: UpdateDebtorPayloadProps): Promise<void> {
  try {
    await api.patch(`debtor/update/${payload.id}`, payload)
  } catch (error: AxiosError | any) {
    throw new Error(error?.response.status)
  }
}

/**
 *
 * @name delete_debtor
 * @category Infrastructure - Services - Dashboard - Delete Debtor
 *
 * @param {DeleteDebtorPayloadProps} payload - The payload of the API
 * @return {PromiseLike<DeleteDebtorResponseProps>} - The response of the API
 */

export async function delete_debtor(payload: DeleteDebtorPayloadProps): Promise<void> {
  try {
    await api.delete(`debtor/delete/${payload.id}`)
  } catch (error: AxiosError | any) {
    throw new Error(error?.response.status)
  }
}

/**
 *
 * @name get_debts
 * @category Infrastructure - Services - Dashboard - Get Debts
 *
 * @param {GetDebtsPayloadProps} payload - The payload of the API
 * @return {PromiseLike<DebtResponseProps>} - The response of the API
 */

export async function get_debts(payload: GetDebtsPayloadProps): Promise<GetDebtsResponseProps> {
  try {
    const { data: response } = await api.get(
      `debts/find?page=${payload.page}&limit=${payload.limit}&q=${payload.query}`,
    )
    return response
  } catch (error: AxiosError | any) {
    throw new Error(error?.response.status)
  }
}

/**
 *
 * @name get_debts_by_debtor
 * @category Infrastructure - Services - Dashboard - Get Debts by Debtor
 *
 * @param {GetDebtsByDebtorPayloadProps} payload - The payload of the API
 * @return {PromiseLike<GetDebtsResponseProps>} - The response of the API
 */

export async function get_debts_by_debtor(payload: GetDebtsByDebtorPayloadProps): Promise<GetDebtsResponseProps> {
  try {
    const { data: response } = await api.get(
      `debts/find-by-debtor/${payload.idDebtor}?page=${payload.page}&limit=${payload.limit}`,
    )
    return response
  } catch (error: AxiosError | any) {
    throw new Error(error?.response.status)
  }
}

/**
 *
 * @name create_debt
 * @category Infrastructure - Services - Dashboard - Create Debt
 *
 * @param {CreateDebtPayloadProps} payload - The payload of the API
 * @return {PromiseLike<CreateDebtResponseProps>} - The response of the API
 */

export async function create_debt(payload: CreateDebtPayloadProps): Promise<CreateDebtResponseProps> {
  try {
    const { data: response } = await api.post(`debts/create`, payload)
    return response
  } catch (error: AxiosError | any) {
    throw new Error(error?.response.status)
  }
}

/**
 *
 * @name update_debt
 * @category Infrastructure - Services - Dashboard - Update Debt
 *
 * @param {UpdateDebtPayloadProps} payload - The payload of the API
 * @return {PromiseLike<void>} - The response of the API
 */

export async function update_debt(payload: UpdateDebtPayloadProps): Promise<void> {
  try {
    await api.patch(`debts/${payload.id}`, payload)
  } catch (error: AxiosError | any) {
    throw new Error(error?.response.status)
  }
}

/**
 *
 * @name delete_debt
 * @category Infrastructure - Services - Dashboard - Delete Debt
 *
 * @param {DeleteDebtPayloadProps} payload - The payload of the API
 * @return {PromiseLike<void>} - The response of the API
 */

export async function delete_debt(payload: DeleteDebtPayloadProps): Promise<void> {
  try {
    await api.delete(`debts/delete/${payload.id}`)
  } catch (error: AxiosError | any) {
    throw new Error(error?.response.status)
  }
}

/**
 *
 * @name get_installments
 * @category Infrastructure - Services - Dashboard - Get Installments
 *
 * @param {GetInstallmentsPayloadProps} payload - The payload of the API
 * @return {PromiseLike<GetInstallmentsResponseProps[]>} - The response of the API
 */

export async function get_installments(payload: GetInstallmentsPayloadProps): Promise<GetInstallmentsResponseProps[]> {
  try {
    const { data: response } = await api.get(`installments/find-by-debt/${payload.idDebt}`)
    return response
  } catch (error: AxiosError | any) {
    throw new Error(error?.response.status)
  }
}

/**
 *
 * @name update_installment
 * @category Infrastructure - Services - Dashboard - Update Installment
 *
 * @param {UpdateInstallmentPayloadProps} payload - The payload of the API
 * @return {PromiseLike<UpdateInstallmentResponseProps>} - The response of the API
 */

export async function update_installment(
  payload: UpdateInstallmentPayloadProps,
): Promise<UpdateInstallmentResponseProps> {
  try {
    const { data: response } = await api.patch(`installments/${payload.id}`, payload)
    return response
  } catch (error: AxiosError | any) {
    throw new Error(error?.response.status)
  }
}
