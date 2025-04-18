'use client'

import React from 'react'

import { AlertTriangle, BadgeDollarSign, BarChart3, CheckCircle2, Users } from 'lucide-react'

import type { DashboardProps } from '@/application/interfaces/dashboard'

import { formatCurrency } from '@/application/lib/formatters/currency'

import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/card'
import { Skeleton } from '@/presentation/components/ui/skeleton'

export function BigNumbers({ bigNumbers, loading }: { bigNumbers: DashboardProps; loading: boolean }) {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      {loading ? (
        <>
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <Card key={index} className='p-3'>
                <CardHeader className='p-0 pb-2'>
                  <Skeleton className='h-5 w-32' />
                </CardHeader>
                <CardContent className='p-0'>
                  <Skeleton className='h-10 w-36' />
                  <Skeleton className='mt-2 h-3 w-24' />
                </CardContent>
              </Card>
            ))}
        </>
      ) : (
        <>
          <Card className='hover:bg-neutral-750 border-neutral-700 bg-neutral-800 p-4 transition-all duration-200'>
            <CardHeader className='flex flex-row items-center justify-between p-0'>
              <div className='flex items-center space-x-2'>
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10'>
                  <BadgeDollarSign className='h-4 w-4 text-emerald-500' />
                </div>
                <CardTitle className='text-sm font-medium text-neutral-300'>Total Emprestado</CardTitle>
              </div>
            </CardHeader>
            <CardContent className='p-0'>
              <p className='text-xl font-bold text-neutral-100'>{formatCurrency(bigNumbers.totalBorrowed || 0)}</p>
              <p className='mt-1 text-xs text-neutral-400'>Valor total emprestado para todos os devedores</p>
            </CardContent>
          </Card>

          <Card className='hover:bg-neutral-750 border-neutral-700 bg-neutral-800 p-4 transition-all duration-200'>
            <CardHeader className='flex flex-row items-center justify-between p-0'>
              <div className='flex items-center space-x-2'>
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/10'>
                  <BadgeDollarSign className='h-4 w-4 text-indigo-500' />
                </div>
                <CardTitle className='text-sm font-medium text-neutral-300'>Total a Receber</CardTitle>
              </div>
            </CardHeader>
            <CardContent className='p-0'>
              <p className='text-2xl font-bold text-neutral-100'>{formatCurrency(bigNumbers.totalReceive || 0)}</p>
              <p className='mt-1 text-xs text-neutral-400'>Soma de todos os valores ainda a serem recebidos</p>
            </CardContent>
          </Card>

          <Card className='hover:bg-neutral-750 border-neutral-700 bg-neutral-800 p-4 transition-all duration-200'>
            <CardHeader className='flex flex-row items-center justify-between p-0'>
              <div className='flex items-center space-x-2'>
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10'>
                  <CheckCircle2 className='h-4 w-4 text-emerald-500' />
                </div>
                <CardTitle className='text-sm font-medium text-neutral-300'>Total Pago</CardTitle>
              </div>
            </CardHeader>
            <CardContent className='p-0'>
              <p className='text-2xl font-bold text-neutral-100'>{formatCurrency(bigNumbers.totalPaid || 0)}</p>
              <p className='mt-1 text-xs text-neutral-400'>Valor total já recebido de todos os pagamentos</p>
            </CardContent>
          </Card>

          <Card className='hover:bg-neutral-750 border-neutral-700 bg-neutral-800 p-4 transition-all duration-200'>
            <CardHeader className='flex flex-row items-center justify-between p-0'>
              <div className='flex items-center space-x-2'>
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10'>
                  <BarChart3 className='h-4 w-4 text-amber-500' />
                </div>
                <CardTitle className='text-sm font-medium text-neutral-300'>Lucro com Juros</CardTitle>
              </div>
            </CardHeader>
            <CardContent className='p-0'>
              <p className='text-xl font-bold text-neutral-100'>{formatCurrency(bigNumbers.profitWithInterest || 0)}</p>
              <p className='mt-1 text-xs text-neutral-400'>Ganhos provenientes dos juros das dívidas</p>
            </CardContent>
          </Card>

          <Card className='hover:bg-neutral-750 border-neutral-700 bg-neutral-800 p-4 transition-all duration-200'>
            <CardHeader className='flex flex-row items-center justify-between p-0'>
              <div className='flex items-center space-x-2'>
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10'>
                  <Users className='h-4 w-4 text-blue-500' />
                </div>
                <CardTitle className='text-sm font-medium text-neutral-300'>Devedores</CardTitle>
              </div>
            </CardHeader>
            <CardContent className='p-0'>
              <p className='text-xl font-bold text-neutral-100'>{bigNumbers.numDebtors || 0}</p>
              <p className='mt-1 text-xs text-neutral-400'>Número total de pessoas que devem valores</p>
            </CardContent>
          </Card>

          <Card className='hover:bg-neutral-750 border-neutral-700 bg-neutral-800 p-4 transition-all duration-200'>
            <CardHeader className='flex flex-row items-center justify-between p-0'>
              <div className='flex items-center space-x-2'>
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10'>
                  <AlertTriangle className='h-4 w-4 text-red-500' />
                </div>
                <CardTitle className='text-sm font-medium text-neutral-300'>Dívidas Abertas</CardTitle>
              </div>
            </CardHeader>
            <CardContent className='p-0'>
              <p className='text-xl font-bold text-neutral-100'>{bigNumbers.numOpenDebts || 0}</p>
              <p className='mt-1 text-xs text-neutral-400'>Quantidade de dívidas pendentes de pagamento</p>
            </CardContent>
          </Card>

          <Card className='hover:bg-neutral-750 border-neutral-700 bg-neutral-800 p-4 transition-all duration-200'>
            <CardHeader className='flex flex-row items-center justify-between p-0'>
              <div className='flex items-center space-x-2'>
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10'>
                  <CheckCircle2 className='h-4 w-4 text-emerald-500' />
                </div>
                <CardTitle className='text-sm font-medium text-neutral-300'>Dívidas Pagas</CardTitle>
              </div>
            </CardHeader>
            <CardContent className='p-0'>
              <p className='text-xl font-bold text-neutral-100'>{bigNumbers.numDebtsPaid || 0}</p>
              <p className='mt-1 text-xs text-neutral-400'>Quantidade de dívidas totalmente quitadas</p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
