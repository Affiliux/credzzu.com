'use client'

import React, { useState } from 'react'

import {
  BadgeDollarSign,
  BarChart3,
  ChevronRight,
  Home,
  LogOut,
  Menu,
  Settings,
  ShieldAlert,
  Sparkles,
  Star,
  Users,
  X,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { AccountProps } from '@/application/interfaces/account'
import { SubscriptionProps } from '@/application/interfaces/subscription'

import { SubscriptionStatusEnum } from '@/application/lib/enums'

import { Avatar, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Badge } from '../ui/badge'

const sidebarLinks = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    title: 'Devedores',
    href: '/dashboard/debtors',
    icon: Users,
  },
  {
    title: 'Dívidas',
    href: '/dashboard/debts',
    icon: BadgeDollarSign,
  },
  {
    title: 'Relatórios',
    href: '/dashboard/reports',
    icon: BarChart3,
    disabled: true,
    badge: 'Em breve',
  },
]

export function DashboardSidebar({
  account,
  subscription,
  onSignOut,
}: {
  account: AccountProps
  subscription: SubscriptionProps
  onSignOut: () => void
}) {
  // hooks
  const pathname = usePathname()

  // states
  const [is_open, set_open] = useState<boolean>(false)

  return (
    <>
      {/* Mobile overlay */}
      {is_open && <div className='fixed inset-0 z-40 bg-black/80 md:hidden' onClick={() => set_open(false)} />}

      {/* Mobile toggle */}
      <div className='flex items-center justify-between border-b border-neutral-700 px-6 py-4 md:hidden'>
        <div className='flex h-16 items-center'>
          <Link href='/' className='flex items-center gap-2'>
            <Image src='/logo.png' alt='Credzzu Logo' width={160} height={160} priority className='h-10 w-auto' />
          </Link>
        </div>

        <Button
          variant='outline'
          size='icon'
          className='border-neutral-700 bg-neutral-800 text-neutral-100 hover:bg-neutral-700'
          onClick={() => set_open(!is_open)}
        >
          {is_open ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-neutral-800 transition-transform duration-200 ease-in-out md:translate-x-0 ${
          is_open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='flex h-full flex-col'>
          {/* Logo */}
          <div className='flex h-16 w-full items-center justify-center px-6'>
            <Link href='/' className='flex items-center gap-2'>
              <Image src='/logo.png' alt='Credzzu Logo' width={160} height={160} priority className='h-10 w-auto' />
            </Link>
          </div>

          <Separator className='bg-neutral-700' />

          {/* Navigation */}
          <nav className='flex-1 space-y-1 px-3 py-4'>
            {sidebarLinks.map(link => {
              const isActive = pathname === link.href
              const isDisabled = link.disabled
              const badge = link.badge

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                    isDisabled
                      ? 'cursor-not-allowed opacity-50'
                      : isActive
                        ? 'bg-neutral-700 text-neutral-100'
                        : 'text-neutral-400 hover:bg-neutral-700 hover:text-neutral-100'
                  }`}
                >
                  <link.icon className='mr-3 h-5 w-5' />
                  {link.title}

                  {isDisabled && <Badge className='ml-auto'>{badge}</Badge>}
                </Link>
              )
            })}
          </nav>

          {/* Pro Plan Widget */}
          {subscription?.status && subscription?.status === SubscriptionStatusEnum.ACTIVE && (
            <div className='mx-3 mb-4 rounded-lg border border-amber-200/40 bg-neutral-700 p-4'>
              <div className='mb-2 flex items-center'>
                <Sparkles className='mr-2 h-5 w-5 animate-pulse text-amber-400' />
                <span className='font-medium text-neutral-100'>Assinatura Premium</span>
              </div>
              <p className='mb-3 text-xs text-neutral-300'>
                Aproveite todos os recursos premium do Credzzu sem limitações.
              </p>
              <Button
                variant='outline'
                size='sm'
                className='w-full border-neutral-600 bg-neutral-800 text-xs text-neutral-100 hover:bg-neutral-600'
                asChild
              >
                <Link href='/dashboard/settings'>
                  Gerenciar assinatura
                  <ChevronRight className='ml-1 h-4 w-4' />
                </Link>
              </Button>
            </div>
          )}

          {subscription?.status && subscription?.status === SubscriptionStatusEnum.EXPIRED && (
            <div className='mx-3 mb-4 rounded-lg border border-red-200/40 bg-neutral-700 p-4'>
              <div className='mb-2 flex items-center'>
                <ShieldAlert className='mr-2 h-5 w-5 animate-pulse text-red-400' />
                <span className='font-medium text-neutral-100'>Renove sua Assinatura</span>
              </div>
              <p className='mb-3 text-xs text-neutral-300'>
                Seu plano expirou. Renove para continuar aproveitando todos os recursos premium do Credzzu.
              </p>
              <Button
                variant='outline'
                size='sm'
                className='w-full border-neutral-600 bg-neutral-800 text-xs text-neutral-100 hover:bg-neutral-600'
                asChild
              >
                <Link href='/dashboard/settings'>
                  Renovar assinatura
                  <ChevronRight className='ml-1 h-4 w-4' />
                </Link>
              </Button>
            </div>
          )}

          {subscription?.status && subscription?.status === SubscriptionStatusEnum.CANCELED && (
            <div className='mx-3 mb-4 rounded-lg border border-red-200/40 bg-neutral-700 p-4'>
              <div className='mb-2 flex items-center'>
                <ShieldAlert className='mr-2 h-5 w-5 animate-pulse text-red-400' />
                <span className='font-medium text-neutral-100'>Assinatura Cancelada</span>
              </div>
              <p className='mb-3 text-xs text-neutral-300'>
                Sua assinatura foi cancelada. Renove para continuar aproveitando todos os recursos premium do Credzzu.
              </p>
              <Button
                variant='outline'
                size='sm'
                className='w-full border-neutral-600 bg-neutral-800 text-xs text-neutral-100 hover:bg-neutral-600'
                asChild
              >
                <Link href='/dashboard/settings'>
                  Renovar assinatura
                  <ChevronRight className='ml-1 h-4 w-4' />
                </Link>
              </Button>
            </div>
          )}

          {!subscription?.status && (
            <div className='mx-3 mb-4 rounded-lg border border-amber-200/40 bg-neutral-700 p-4'>
              <div className='mb-2 flex items-center'>
                <Sparkles className='mr-2 h-5 w-5 animate-pulse text-amber-400' />
                <span className='font-medium text-neutral-100'>Testar Grátis</span>
              </div>
              <p className='mb-3 text-xs text-neutral-300'>
                Experimente todos os recursos premium do Credzzu por 3 dias grátis.
              </p>
              <Button
                variant='outline'
                size='sm'
                className='w-full border-neutral-600 bg-neutral-800 text-xs text-neutral-100 hover:bg-neutral-600'
                asChild
              >
                <Link href='/dashboard/settings'>
                  Testar agora
                  <ChevronRight className='ml-1 h-4 w-4' />
                </Link>
              </Button>
            </div>
          )}

          {/* User section */}
          <div className='border-t border-neutral-700 p-4'>
            <div className='flex items-center'>
              <Avatar className='h-9 w-9'>
                {/* <AvatarImage src='/placeholder.svg?height=36&width=36' alt='Avatar' /> */}
                <AvatarFallback className='bg-neutral-700 text-neutral-200'>
                  {account?.name?.split(' ')[0][0].toUpperCase()}
                  {account?.name?.split(' ')[1][0].toUpperCase() ?? account?.name?.split(' ')[0][1].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className='ml-3 flex-1 truncate'>
                <p className='truncate text-sm font-medium text-neutral-100'>{account?.name}</p>
                <p className='truncate text-xs text-neutral-400'>{account?.email}</p>
              </div>
            </div>

            <div className='mt-4 flex flex-col space-y-2'>
              <Button
                variant='ghost'
                size='sm'
                className='justify-start text-neutral-400 hover:bg-neutral-700 hover:text-neutral-100'
                asChild
              >
                <Link href='/dashboard/settings'>
                  <Settings className='mr-2 h-4 w-4' />
                  Configurações
                </Link>
              </Button>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className='justify-start text-neutral-400 hover:bg-neutral-700 hover:text-neutral-100'
                onClick={onSignOut}
              >
                <LogOut className='mr-2 h-4 w-4' />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
