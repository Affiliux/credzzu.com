'use client'

import React, { useState } from 'react'

import { Edit, Link, MoreHorizontal, Plus, Search, Trash2 } from 'lucide-react'

import type { DebtorProps } from '@/interfaces/dashboard'
import type { PaginationResponseProps } from '@/interfaces/pagination'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface DataTableProps {
  data: DebtorProps[]
  is_loading?: boolean
  pagination: PaginationResponseProps
  onSearch: (query: string) => Promise<void>
  onDelete: (id: string) => void
  onEdit: (debtor: DebtorProps) => void
  onCreateDebt: (debtor: DebtorProps) => void
  onViewDebts: (debtor: DebtorProps) => void
  onPageChange: (page: number, query?: string) => Promise<void>
  onLimitChange: (limit: number, query?: string) => Promise<void>
}

export function DataTable({
  data,
  onSearch,
  onDelete,
  onEdit,
  onCreateDebt,
  onViewDebts,
  is_loading = false,
  pagination,
  onPageChange,
  onLimitChange,
}: DataTableProps) {
  // states
  const [search_query, set_search_query] = useState<string>('')

  // handlers
  async function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    set_search_query(value)

    if (value.length >= 3) await onSearch(value)
  }

  return (
    <div className='mt-4 space-y-4 md:mt-0'>
      <div className='flex flex-row items-center justify-between gap-4'>
        <div className='relative min-w-2/3 md:min-w-[350px]'>
          <Search className='absolute top-2.5 left-2 h-4 w-4 text-emerald-400/60' />
          <Input
            placeholder='Buscar nome, email ou telefone...'
            className='border-emerald-500/20 bg-black/60 pl-8 text-white placeholder:text-white/40 focus:border-emerald-500/40 focus:ring-emerald-500/20'
            value={search_query}
            onChange={handleSearch}
          />
        </div>
        <div className='flex flex-row items-center gap-2 space-x-2'>
          <span className='hidden text-sm text-emerald-400/60 md:block'>Itens por página:</span>
          <Select value={String(pagination.limit)} onValueChange={value => onLimitChange(Number(value), search_query)}>
            <SelectTrigger className='w-[100px] border-emerald-500/20 bg-black/60 text-white focus:border-emerald-500/40 focus:ring-emerald-500/20'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className='border-emerald-500/20 bg-black/95 text-white backdrop-blur-xl'>
              <SelectItem
                value='10'
                className='hover:bg-emerald-500/10 hover:text-emerald-400 focus:bg-emerald-500/10 focus:text-emerald-400'
              >
                10
              </SelectItem>
              <SelectItem
                value='20'
                className='hover:bg-emerald-500/10 hover:text-emerald-400 focus:bg-emerald-500/10 focus:text-emerald-400'
              >
                20
              </SelectItem>
              <SelectItem
                value='50'
                className='hover:bg-emerald-500/10 hover:text-emerald-400 focus:bg-emerald-500/10 focus:text-emerald-400'
              >
                50
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='overflow-hidden rounded-lg border border-emerald-500/20 bg-black/60 backdrop-blur-sm'>
        <Table>
          <TableHeader>
            <TableRow className='border-emerald-500/10 hover:bg-emerald-500/5'>
              <TableHead className='min-w-[150px] text-white/80'>Nome</TableHead>
              <TableHead className='min-w-[150px] text-white/80'>Email</TableHead>
              <TableHead className='min-w-[150px] text-white/80'>Telefone</TableHead>
              <TableHead className='min-w-[150px] text-white/80'>Documento</TableHead>
              <TableHead className='min-w-[150px] text-white/80'>Localidade</TableHead>
              <TableHead className='w-[50px] text-white/80'></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {is_loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index} className='border-emerald-500/10'>
                  <TableCell>
                    <Skeleton className='h-4 w-[200px] bg-emerald-500/10' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-4 w-[150px] bg-emerald-500/10' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-4 w-[120px] bg-emerald-500/10' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-4 w-[180px] bg-emerald-500/10' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-4 w-[180px] bg-emerald-500/10' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-8 w-8 rounded-md bg-emerald-500/10' />
                  </TableCell>
                </TableRow>
              ))
            ) : data?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className='h-40 px-4'>
                  <div className='flex flex-col items-center'>
                    <p className='text-center text-base text-white/60 sm:text-sm'>Nenhum devedor cadastrado</p>
                    <p className='text-center text-sm text-white/40 sm:text-xs'>
                      Adicione um novo devedor para começar
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data?.map(debtor => (
                <TableRow
                  key={debtor.id}
                  className='cursor-pointer border-emerald-500/10 text-white hover:bg-emerald-500/5'
                  onClick={() => onViewDebts(debtor)}
                >
                  <TableCell className='max-w-[200px] truncate font-medium'>{debtor.name || '-'}</TableCell>
                  <TableCell className='max-w-[200px] truncate'>{debtor.email || '-'}</TableCell>
                  <TableCell className='max-w-[150px] truncate'>{debtor.phone || '-'}</TableCell>
                  <TableCell className='max-w-[200px] truncate'>
                    {debtor.documentType && debtor.documentNumber
                      ? `${debtor.documentType} - ${debtor.documentNumber}`
                      : '-'}
                  </TableCell>
                  <TableCell className='max-w-[200px] truncate'>
                    {debtor.city && debtor.state ? `${debtor.city}/${debtor.state}` : '-'}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant='ghost'
                          className='h-8 w-8 p-0 text-white/70 hover:bg-emerald-500/10 hover:text-emerald-400'
                        >
                          <span className='sr-only'>Abrir menu</span>
                          <MoreHorizontal className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align='end'
                        className='border-emerald-500/20 bg-black/95 text-white backdrop-blur-xl'
                      >
                        <DropdownMenuItem
                          onClick={e => {
                            e.stopPropagation()
                            onEdit(debtor)
                          }}
                          className='hover:bg-emerald-500/10 hover:text-emerald-400 focus:bg-emerald-500/10 focus:text-emerald-400'
                        >
                          <Edit className='mr-2 h-4 w-4' />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={e => {
                            e.stopPropagation()
                            onCreateDebt(debtor)
                          }}
                          className='hover:bg-emerald-500/10 hover:text-emerald-400 focus:bg-emerald-500/10 focus:text-emerald-400'
                        >
                          <Plus className='mr-2 h-4 w-4' />
                          Criar dívida
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={e => {
                            e.stopPropagation()
                            onViewDebts(debtor)
                          }}
                          className='hover:bg-emerald-500/10 hover:text-emerald-400 focus:bg-emerald-500/10 focus:text-emerald-400'
                        >
                          <Link className='mr-2 h-4 w-4' />
                          Visualizar dívidas
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className='bg-emerald-500/20' />
                        <DropdownMenuItem
                          className='text-red-500 hover:bg-red-500/10 hover:text-red-400 focus:bg-red-500/10 focus:text-red-400'
                          onClick={e => {
                            e.stopPropagation()
                            onDelete(debtor.id!)
                          }}
                        >
                          <Trash2 className='mr-2 h-4 w-4' />
                          Deletar
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
        <div className='hidden text-center text-sm text-emerald-400/60 md:block md:text-left'>
          Mostrando {data?.length} de {pagination.itemCount ?? 0} itens
        </div>
        <div className='flex flex-wrap items-center justify-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => onPageChange(pagination.page - 1, search_query)}
            disabled={pagination.page === 1 || pagination.pageCount === 0 || !pagination.hasPreviousPage}
            className='border-emerald-500/20 bg-black/60 text-white hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-400 disabled:opacity-50 disabled:hover:bg-black/60 disabled:hover:text-white'
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
                  className={`${
                    page === pagination.page
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                      : 'border-emerald-500/20 bg-black/60 text-white hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-400'
                  }`}
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
            className='border-emerald-500/20 bg-black/60 text-white hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-400 disabled:opacity-50 disabled:hover:bg-black/60 disabled:hover:text-white'
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  )
}
