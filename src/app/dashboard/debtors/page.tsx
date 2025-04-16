'use client'

import React, { useEffect, useState } from 'react'

import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import type {
  CreateDebtorPayloadProps,
  CreateDebtPayloadProps,
  DebtorProps,
  DeleteDebtorPayloadProps,
  UpdateDebtorPayloadProps,
} from '@/application/interfaces/dashboard'

import { useDashboard } from '@/application/contexts/DashboardContext'

import { DataTable } from '@/presentation/components/dashboard/debtors/data-table'
import { DebtorForm } from '@/presentation/components/dashboard/debtors/debtor-form'
import { DeleteDialog } from '@/presentation/components/dashboard/debtors/delete-dialog'
import { DebtForm } from '@/presentation/components/dashboard/debts/debt-form'
import { Button } from '@/presentation/components/ui/button'

export const runtime = 'edge'

export default function Page() {
  // hooks
  const router = useRouter()

  // contexts
  const { debtors, pagination, onGetDebtors, onCreateDebtor, onUpdateDebtor, onDeleteDebtor, onCreateDebt } =
    useDashboard()

  // states
  const [is_loading, set_loading] = useState<boolean>(false)
  const [selected_debtor, set_selected_debtor] = useState<DebtorProps | null>(null)
  const [editing_debtor, set_editing_debtor] = useState<DebtorProps | null>(null)
  const [is_delete_dialog_open, set_is_delete_dialog_open] = useState<boolean>(false)
  const [is_edit_sheet_open, set_is_edit_sheet_open] = useState<boolean>(false)
  const [is_create_sheet_open, set_is_create_sheet_open] = useState<boolean>(false)
  const [is_create_debt_sheet_open, set_is_create_debt_sheet_open] = useState<boolean>(false)
  const [selected_debtor_for_debt, set_selected_debtor_for_debt] = useState<DebtorProps | null>(null)

  // handlers
  async function handleSearch(query: string) {
    set_loading(true)

    try {
      await onGetDebtors({ page: 1, limit: pagination.limit, query: `${query}` })
    } catch (error: any) {
      console.error(error)
      toast.error('Erro ao buscar devedores')
    } finally {
      set_loading(false)
    }
  }

  async function handleCreateDebtor(data: CreateDebtorPayloadProps) {
    set_loading(true)

    try {
      await onCreateDebtor(data)
    } catch (error: any) {
      console.error(error)

      if (error.message === '400') toast.warning('Já existe um devedor com essas informações')
      if (error.message === '500') toast.error('Ocorreu um erro ao criar o devedor')

      throw new Error(error.message)
    } finally {
      set_loading(false)
    }
  }

  async function handleUpdateDebtor(data: UpdateDebtorPayloadProps) {
    set_loading(true)

    try {
      await onUpdateDebtor(data)
    } catch (error: any) {
      console.error(error)

      if (error.message === '404') toast.warning('Nenhum devedor encontrado para atualizar')
      if (error.message === '500') toast.error('Ocorreu um erro ao atualizar o devedor')

      throw new Error(error.message)
    } finally {
      set_loading(false)
    }
  }

  async function handleDeleteDebtor(data: DeleteDebtorPayloadProps) {
    set_loading(true)

    try {
      await onDeleteDebtor(data)
    } catch (error: any) {
      console.error(error)

      if (error.message === '404') toast.warning('Nenhum devedor encontrado para deletar')
      if (error.message === '500') toast.error('Ocorreu um erro ao deletar o devedor')

      throw new Error(error.message)
    } finally {
      set_loading(false)
    }
  }

  async function handlePageChange(page: number, query?: string) {
    set_loading(true)

    try {
      await onGetDebtors({ page, limit: pagination.limit, query: `${query}` })
    } catch (error: any) {
      console.error(error)
      toast.error('Erro ao carregar página')
    } finally {
      set_loading(false)
    }
  }

  async function handleLimitChange(limit: number, query?: string) {
    set_loading(true)

    try {
      await onGetDebtors({ page: 1, limit, query: `${query}` })
    } catch (error: any) {
      toast.error('Erro ao alterar limite de itens')
      console.error(error)
    } finally {
      set_loading(false)
    }
  }

  async function handleCreateDebt(debtor: DebtorProps) {
    set_selected_debtor_for_debt(debtor)
    set_is_create_debt_sheet_open(true)
  }

  async function handleSubmitDebt(data: CreateDebtPayloadProps) {
    set_loading(true)

    try {
      await onCreateDebt(data)
    } catch (error: any) {
      console.error(error)

      if (error.message === '404') toast.warning('Nenhum devedor encontrado para criar dívida')
      if (error.message === '400') toast.warning('Já existe uma dívida com essas informações')
      if (error.message === '500') toast.error('Ocorreu um erro ao criar a dívida')

      throw new Error(error.message)
    } finally {
      set_loading(false)
    }
  }

  async function handleViewDebts(debtor: DebtorProps) {
    router.push(`/dashboard/debts?debtorId=${debtor.id}`)
  }

  // effects
  useEffect(() => {
    async function handleGetData() {
      set_loading(true)

      try {
        await onGetDebtors({ page: 1, limit: 10, query: '' })
      } catch (error) {
        console.error(error)
        toast.error('Erro ao carregar devedores')
      } finally {
        set_loading(false)
      }
    }

    handleGetData()
  }, [])

  // render
  return (
    <div className='w-full space-y-6'>
      <div className='flex flex-col justify-between space-y-2 md:flex-row md:items-center md:space-y-0'>
        <h1 className='text-2xl font-bold text-neutral-100'>Devedores</h1>
        <DebtorForm onSubmit={handleCreateDebtor} open={is_create_sheet_open} onOpenChange={set_is_create_sheet_open}>
          <Button>
            <Plus className='mr-2 h-4 w-4' />
            Novo Devedor
          </Button>
        </DebtorForm>
      </div>

      <DataTable
        data={debtors}
        onSearch={handleSearch}
        onDelete={id => {
          const debtor = debtors.find(d => d.id === id)

          if (debtor) {
            set_selected_debtor(debtor)
            set_is_delete_dialog_open(true)
          }
        }}
        onEdit={debtor => {
          set_editing_debtor(debtor)
          set_is_edit_sheet_open(true)
        }}
        onCreateDebt={handleCreateDebt}
        onViewDebts={handleViewDebts}
        is_loading={is_loading}
        pagination={pagination}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />

      {selected_debtor && (
        <DeleteDialog
          open={is_delete_dialog_open}
          debtor={selected_debtor}
          onDelete={handleDeleteDebtor}
          onOpenChange={set_is_delete_dialog_open}
        >
          <div />
        </DeleteDialog>
      )}

      {editing_debtor && (
        <DebtorForm
          open={is_edit_sheet_open}
          debtor={editing_debtor}
          onSubmit={handleUpdateDebtor}
          onOpenChange={set_is_edit_sheet_open}
        >
          <div />
        </DebtorForm>
      )}

      {selected_debtor_for_debt && (
        <DebtForm
          open={is_create_debt_sheet_open}
          debtorId={selected_debtor_for_debt.id!}
          onSubmit={handleSubmitDebt}
          onOpenChange={set_is_create_debt_sheet_open}
        >
          <div />
        </DebtForm>
      )}
    </div>
  )
}
