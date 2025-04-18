'use client'

import React, { useEffect, useState } from 'react'

import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import type {
  CreateDebtPayloadProps,
  DebtProps,
  DeleteDebtPayloadProps,
  UpdateDebtPayloadProps,
} from '@/application/interfaces/dashboard'

import { useDashboard } from '@/application/contexts/DashboardContext'

import { useQueryParams } from '@/application/hooks/use-query-params'

import { DataTable } from '@/presentation/components/dashboard/debts/data-table'
import { DebtForm } from '@/presentation/components/dashboard/debts/debt-form'
import { Button } from '@/presentation/components/ui/button'

export const runtime = 'edge'

export default function Page() {
  // hooks
  const { debtorId } = useQueryParams()
  const router = useRouter()

  // contexts
  const { debts, pagination_debts, onGetDebts, onGetDebtsByDebtor, onCreateDebt, onUpdateDebt, onDeleteDebt } =
    useDashboard()

  // states
  const [is_loading, set_loading] = useState<boolean>(false)
  const [is_create_sheet_open, set_is_create_sheet_open] = useState<boolean>(false)

  // handlers
  async function handleSearch(query: string) {
    set_loading(true)

    try {
      if (debtorId) {
        await onGetDebtsByDebtor({ idDebtor: debtorId, page: 1, limit: pagination_debts.limit, query })
      } else {
        await onGetDebts({ page: 1, limit: pagination_debts.limit, query })
      }
    } catch (error) {
      console.error(error)
      toast.error('Erro ao buscar dívidas')
    } finally {
      set_loading(false)
    }
  }

  async function handleCreateDebt(data: CreateDebtPayloadProps) {
    set_loading(true)

    try {
      await onCreateDebt(data)
    } catch (error) {
      console.error(error)

      if (error.message === '404') toast.error('Nenhum devedor encontrado para criar dívida')
      if (error.message === '400') toast.error('Já existe uma dívida com essas informações')
      if (error.message === '500') toast.error('Ocorreu um erro ao criar a dívida')

      throw new Error(error.message)
    } finally {
      set_loading(false)
    }
  }

  async function handleUpdateDebt(data: UpdateDebtPayloadProps) {
    set_loading(true)

    try {
      await onUpdateDebt(data)
    } catch (error) {
      console.error(error)

      if (error.message === '404') toast.error('Nenhuma dívida encontrada para atualizar')
      if (error.message === '500') toast.error('Ocorreu um erro ao atualizar a dívida')

      throw new Error(error.message)
    } finally {
      set_loading(false)
    }
  }

  async function handleDeleteDebt(data: DeleteDebtPayloadProps) {
    set_loading(true)

    try {
      await onDeleteDebt(data)
    } catch (error) {
      console.error(error)

      if (error.message === '404') toast.error('Nenhuma dívida encontrada para deletar')
      if (error.message === '500') toast.error('Ocorreu um erro ao deletar a dívida')

      throw new Error(error.message)
    } finally {
      set_loading(false)
    }
  }

  async function handlePageChange(page: number, query?: string) {
    set_loading(true)

    try {
      if (debtorId) {
        await onGetDebtsByDebtor({ idDebtor: debtorId, page, limit: pagination_debts.limit, query })
      } else {
        await onGetDebts({ page, limit: pagination_debts.limit, query })
      }
    } catch (error) {
      console.error(error)
      toast.error('Erro ao carregar página')
    } finally {
      set_loading(false)
    }
  }

  async function handleLimitChange(limit: number, query?: string) {
    set_loading(true)

    try {
      if (debtorId) {
        await onGetDebtsByDebtor({ idDebtor: debtorId, page: 1, limit, query })
      } else {
        await onGetDebts({ page: 1, limit, query })
      }
    } catch (error) {
      console.error(error)
      toast.error('Erro ao alterar limite de itens')
    } finally {
      set_loading(false)
    }
  }

  async function handleViewInstallments(debt: DebtProps) {
    router.push(`/dashboard/debts/${debt.id}${debtorId ? `?debtorId=${debtorId}` : ''}`)
  }

  // effects
  useEffect(() => {
    async function handleGetData() {
      set_loading(true)

      try {
        if (debtorId) {
          await onGetDebtsByDebtor({ idDebtor: debtorId, page: 1, limit: 10 })
        } else {
          await onGetDebts({ page: 1, limit: 10 })
        }
      } catch (error) {
        console.error(error)
        toast.error('Erro ao carregar dívidas')
      } finally {
        set_loading(false)
      }
    }

    handleGetData()
  }, [debtorId])

  // render
  return (
    <div className='w-full space-y-6'>
      <div className='flex flex-col justify-between space-y-2 md:flex-row md:items-center md:space-y-0'>
        <h1 className='text-2xl font-bold text-neutral-100'>Dívidas</h1>
        <DebtForm
          open={is_create_sheet_open}
          debtorId={debtorId || ''}
          onSubmit={handleCreateDebt}
          onOpenChange={set_is_create_sheet_open}
        >
          <Button>
            <Plus className='mr-2 h-4 w-4' />
            Nova Dívida
          </Button>
        </DebtForm>
      </div>

      <DataTable
        data={debts}
        is_loading={is_loading}
        pagination={pagination_debts}
        onSearch={handleSearch}
        onDelete={handleDeleteDebt}
        onViewInstallments={handleViewInstallments}
        onEdit={handleUpdateDebt}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />
    </div>
  )
}
