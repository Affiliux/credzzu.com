'use client'

import React, { useState } from 'react'
import { toast } from 'sonner'

import { Edit, MoreHorizontal, Search, Trash2, Pencil, FileText } from 'lucide-react'

import type {
  DebtProps,
  DeleteDebtPayloadProps,
  CreateDebtPayloadProps,
  UpdateDebtPayloadProps,
} from '@/application/interfaces/dashboard'
import type { PaginationResponseProps } from '@/application/interfaces/pagination'

import { DebtStatusEnum } from '@/application/lib/enums'
import { formatCurrency } from '@/application/lib/formatters/currency'

import { Badge } from '@/presentation/components/ui/badge'
import { Button } from '@/presentation/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/presentation/components/ui/dropdown-menu'
import { Input } from '@/presentation/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/presentation/components/ui/select'
import { Skeleton } from '@/presentation/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/presentation/components/ui/table'
import { DeleteDebtDialog } from './delete-debt-dialog'
import { DebtForm } from './debt-form'

interface DataTableProps {
  data: DebtProps[]
  is_loading?: boolean
  pagination: PaginationResponseProps
  onSearch: (query: string) => Promise<void>
  onDelete: (data: DeleteDebtPayloadProps) => Promise<void>
  onEdit: (data: CreateDebtPayloadProps | UpdateDebtPayloadProps) => Promise<void>
  onPageChange: (page: number, query?: string) => Promise<void>
  onLimitChange: (limit: number, query?: string) => Promise<void>
}

export function DataTable({
  data,
  is_loading = false,
  pagination,
  onSearch,
  onDelete,
  onEdit,
  onPageChange,
  onLimitChange,
}: DataTableProps) {
  // states
  const [search_query, set_search_query] = useState<string>('')
  const [delete_dialog_open, set_delete_dialog_open] = useState<boolean>(false)
  const [selected_debt, set_selected_debt] = useState<DebtProps | null>(null)
  const [edit_sheet_open, set_edit_sheet_open] = useState<boolean>(false)
  const [is_submitting, set_is_submitting] = useState<boolean>(false)

  // handlers
  async function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    set_search_query(value)

    if (value.length >= 3) await onSearch(value)
  }

  async function handleEdit(debt: DebtProps) {
    set_selected_debt(debt)
    set_edit_sheet_open(true)
  }

  async function handleSubmitEdit(data: CreateDebtPayloadProps | UpdateDebtPayloadProps) {
    set_is_submitting(true)

    try {
      await onEdit(data)
    } catch (error) {
      console.error(error)
      toast.error('Erro ao atualizar dívida')
    } finally {
      set_is_submitting(false)
    }
  }

  const getStatusBadge = (status: DebtStatusEnum) => {
    switch (status) {
      case DebtStatusEnum.ACTIVE:
        return <Badge variant='default'>Aberto</Badge>
      case DebtStatusEnum.PAID:
        return <Badge variant='success'>Pago</Badge>
      case DebtStatusEnum.OVERDUE:
        return <Badge variant='destructive'>Atrasado</Badge>
      default:
        return <Badge variant='outline'>-</Badge>
    }
  }

  return (
    <div className='mt-12 space-y-4 md:mt-0'>
      <div className='flex flex-row items-center justify-between gap-4'>
        <div className='relative min-w-full md:min-w-[350px]'>
          <Search className='absolute top-2.5 left-2 h-4 w-4 text-neutral-400' />
          <Input
            placeholder='Busque pelo nome da dívida...'
            className='pl-8'
            value={search_query}
            onChange={handleSearch}
          />
        </div>
        <div className='flex flex-row items-center gap-2 space-x-2'>
          <span className='hidden text-sm text-neutral-400 md:block'>Itens por página:</span>
          <Select value={String(pagination.limit)} onValueChange={value => onLimitChange(Number(value), search_query)}>
            <SelectTrigger className='w-[100px]'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='10'>10</SelectItem>
              <SelectItem value='20'>20</SelectItem>
              <SelectItem value='50'>50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='overflow-x-auto rounded-md border border-neutral-800'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='min-w-[150px]'>Nome</TableHead>
              <TableHead className='min-w-[150px]'>Valor</TableHead>
              <TableHead className='min-w-[150px]'>Primeira parcela</TableHead>
              <TableHead className='min-w-[150px]'>Status</TableHead>
              <TableHead className='min-w-[150px]'>Parcelas</TableHead>
              <TableHead className='w-[50px]'></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {is_loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className='h-4 w-[200px]' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-4 w-[150px]' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-4 w-[120px]' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-4 w-[100px]' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-4 w-[80px]' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-8 w-8' />
                  </TableCell>
                </TableRow>
              ))
            ) : data?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className='h-40 px-4'>
                  <div className='flex flex-col items-start md:items-center'>
                    <p className='text-center text-base text-neutral-400 sm:text-sm'>Nenhuma dívida cadastrada</p>
                    <p className='text-center text-sm text-neutral-500 sm:text-xs'>
                      Adicione uma nova dívida para começar
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data?.map(debt => (
                <TableRow key={debt.id} className='cursor-pointer' onClick={() => console.log(debt)}>
                  <TableCell className='font-medium'>{debt.description || '-'}</TableCell>
                  <TableCell>{formatCurrency(debt.totalValue)}</TableCell>
                  <TableCell>{new Date(debt.dateOfDebt).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>{getStatusBadge(debt.status || DebtStatusEnum.ACTIVE)}</TableCell>
                  <TableCell>{debt.installmentsNumber}x</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className='h-8 w-8 p-0'>
                          <span className='sr-only'>Abrir menu</span>
                          <MoreHorizontal className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuItem onClick={() => handleEdit(debt)}>
                          <Pencil className='mr-2 h-4 w-4' />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => set_selected_debt(debt)}>
                          <FileText className='mr-2 h-4 w-4' />
                          Ver parcelas
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            set_selected_debt(debt)
                            set_delete_dialog_open(true)
                          }}
                          className='text-red-600 focus:text-red-600'
                        >
                          <Trash2 className='mr-2 h-4 w-4' />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='text-center text-sm text-neutral-400 md:text-left'>
          Mostrando {data?.length} de {pagination.itemCount} itens
        </div>
        <div className='flex flex-wrap items-center justify-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => onPageChange(pagination.page - 1, search_query)}
            disabled={pagination.page === 1 || pagination.pageCount === 0 || !pagination.hasPreviousPage}
          >
            Anterior
          </Button>
          {pagination.pageCount > 0 && (
            <div className='flex flex-wrap items-center justify-center gap-1'>
              {[
                ...(pagination.hasPreviousPage ? [pagination.page - 1] : []),
                pagination.page,
                ...(pagination.hasNextPage ? [pagination.page + 1] : []),
              ].map(page => (
                <Button
                  key={page}
                  variant={page === pagination.page ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => onPageChange(page, search_query)}
                >
                  {page}
                </Button>
              ))}
            </div>
          )}
          <Button
            variant='outline'
            size='sm'
            onClick={() => onPageChange(pagination.page + 1, search_query)}
            disabled={pagination.page === pagination.pageCount || pagination.pageCount === 0 || !pagination.hasNextPage}
          >
            Próximo
          </Button>
        </div>
      </div>

      {selected_debt && (
        <>
          <DeleteDebtDialog
            open={delete_dialog_open}
            onOpenChange={set_delete_dialog_open}
            onDelete={onDelete}
            debtId={selected_debt.id!}
          >
            <div className='hidden' />
          </DeleteDebtDialog>

          <DebtForm
            open={edit_sheet_open}
            onOpenChange={set_edit_sheet_open}
            onSubmit={handleSubmitEdit}
            initialData={selected_debt}
            debtorId={selected_debt.idDebtor}
            is_loading={is_submitting}
          >
            <div className='hidden' />
          </DebtForm>
        </>
      )}
    </div>
  )
}
