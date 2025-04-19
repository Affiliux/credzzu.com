'use client'

import React, { useState } from 'react'

import {
  BadgeDollarSign,
  BarChart3,
  ChevronDown,
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
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Separator } from '../ui/separator'

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
      {is_open && (
        <div className='fixed inset-0 z-40 bg-black/90 backdrop-blur-sm md:hidden' onClick={() => set_open(false)} />
      )}

      {/* Mobile toggle */}
      <div className='flex items-center justify-between border-b border-neutral-800/50 bg-black px-6 py-4 md:hidden'>
        <div className='flex h-16 items-center'>
          <Link href='/' className='flex items-center gap-2'>
            <Image src='/logo.png' alt='Credzzu Logo' width={160} height={160} priority className='h-10 w-auto' />
          </Link>
        </div>

        <Button
          variant='outline'
          size='icon'
          className='border-emerald-500/30 bg-black text-white hover:bg-emerald-500/10 hover:text-emerald-400'
          onClick={() => set_open(!is_open)}
        >
          {is_open ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-emerald-500/10 bg-black/95 backdrop-blur-xl transition-transform duration-200 ease-in-out md:translate-x-0 ${
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

          <Separator className='bg-emerald-500/20' />

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
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'text-white/80 hover:bg-emerald-500/5 hover:text-white'
                  }`}
                >
                  <link.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-emerald-400' : ''}`} />
                  {link.title}

                  {isDisabled && <Badge className='ml-auto bg-emerald-500/20 text-emerald-400'>{badge}</Badge>}
                </Link>
              )
            })}
          </nav>

          {/* Pro Plan Widget */}
          {subscription?.status && subscription?.status === SubscriptionStatusEnum.ACTIVE && (
            <div className='mx-3 mb-4 rounded-lg border border-emerald-500/30 bg-gradient-to-b from-emerald-500/[0.08] to-transparent p-4 backdrop-blur-sm'>
              <div className='mb-2 flex items-center'>
                <Sparkles className='mr-2 h-5 w-5 animate-pulse text-emerald-400' />
                <span className='font-medium text-white'>Assinatura Premium</span>
              </div>
              <p className='mb-3 text-xs text-white/80'>
                Aproveite todos os recursos premium do Credzzu sem limitações.
              </p>
              <Button
                variant='outline'
                size='sm'
                className='w-full border-emerald-500/30 bg-black/50 text-xs text-white hover:bg-emerald-500/10 hover:text-emerald-400'
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
            <div className='mx-3 mb-4 rounded-lg border border-red-500/30 bg-gradient-to-b from-red-500/[0.08] to-transparent p-4 backdrop-blur-sm'>
              <div className='mb-2 flex items-center'>
                <ShieldAlert className='mr-2 h-5 w-5 animate-pulse text-red-400' />
                <span className='font-medium text-white'>Renove sua Assinatura</span>
              </div>
              <p className='mb-3 text-xs text-white/80'>
                Seu plano expirou. Renove para continuar aproveitando todos os recursos premium do Credzzu.
              </p>
              <Button
                variant='outline'
                size='sm'
                className='w-full border-red-500/30 bg-black/50 text-xs text-white hover:bg-red-500/10 hover:text-red-400'
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
            <div className='mx-3 mb-4 rounded-lg border border-red-500/30 bg-gradient-to-b from-red-500/[0.08] to-transparent p-4 backdrop-blur-sm'>
              <div className='mb-2 flex items-center'>
                <ShieldAlert className='mr-2 h-5 w-5 animate-pulse text-red-400' />
                <span className='font-medium text-white'>Assinatura Cancelada</span>
              </div>
              <p className='mb-3 text-xs text-white/80'>
                Sua assinatura foi cancelada. Renove para continuar aproveitando todos os recursos premium do Credzzu.
              </p>
              <Button
                variant='outline'
                size='sm'
                className='w-full border-red-500/30 bg-black/50 text-xs text-white hover:bg-red-500/10 hover:text-red-400'
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
            <div className='mx-3 mb-4 rounded-lg border border-emerald-500/30 bg-gradient-to-b from-emerald-500/[0.08] to-transparent p-4 backdrop-blur-sm'>
              <div className='mb-2 flex items-center'>
                <Sparkles className='mr-2 h-5 w-5 animate-pulse text-emerald-400' />
                <span className='font-medium text-white'>Testar Grátis</span>
              </div>
              <p className='mb-3 text-xs text-white/80'>
                Experimente todos os recursos premium do Credzzu por 3 dias grátis.
              </p>
              <Button
                variant='outline'
                size='sm'
                className='w-full border-emerald-500/30 bg-black/50 text-xs text-white hover:bg-emerald-500/10 hover:text-emerald-400'
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
          <div className='border-t border-emerald-500/20 p-4'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='flex w-full items-center justify-between px-0 hover:bg-transparent'>
                  <div className='flex items-center'>
                    <Avatar className='h-9 w-9 border border-emerald-500/30'>
                      <AvatarFallback className='bg-emerald-500/10 text-emerald-400'>
                        {account?.name?.split(' ')[0][0].toUpperCase()}
                        {account?.name?.split(' ')[1][0].toUpperCase() ?? account?.name?.split(' ')[0][1].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className='ml-3 flex-1 truncate text-left'>
                      <p className='truncate text-sm font-medium text-white'>{account?.name}</p>
                      <p className='truncate text-xs text-white/60'>{account?.email}</p>
                    </div>
                  </div>
                  <ChevronDown className='-ml-1 h-4 w-4 text-white/60' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align='end'
                className='w-56 border-emerald-500/20 bg-black/95 text-white backdrop-blur-xl'
              >
                <DropdownMenuLabel className='font-normal'>
                  <div className='flex flex-col space-y-1'>
                    <p className='text-sm leading-none font-medium'>{account?.name}</p>
                    <p className='text-xs leading-none text-white/60'>{account?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className='bg-emerald-500/20' />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className='hover:bg-emerald-500/10 hover:text-emerald-400 focus:bg-emerald-500/10 focus:text-emerald-400'
                    asChild
                  >
                    <Link href='/dashboard/settings' className='flex w-full items-center'>
                      <Settings className='mr-2 h-4 w-4' />
                      <span>Configurações</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className='bg-emerald-500/20' />
                <DropdownMenuItem
                  onClick={onSignOut}
                  className='hover:bg-emerald-500/10 hover:text-emerald-400 focus:bg-emerald-500/10 focus:text-emerald-400'
                >
                  <LogOut className='mr-2 h-4 w-4' />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>
    </>
  )
}
