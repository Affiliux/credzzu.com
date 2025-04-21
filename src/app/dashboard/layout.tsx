'use client'

import * as React from 'react'

import { useAccount } from '@/contexts/AccountContext'
import { useSubscription } from '@/contexts/SubscriptionContext'

import { DashboardSidebar } from '@/components/dashboard/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  // contexts
  const { account, onSignOut } = useAccount()
  const { subscription } = useSubscription()

  return (
    <div className='relative min-h-screen overflow-hidden bg-black'>
      {/* Background Elements */}
      <div className='absolute top-0 left-0 h-full w-full'>
        <div className='absolute -top-40 -left-40 h-80 w-80 rounded-full bg-emerald-500/5 blur-3xl'></div>
        <div className='absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-emerald-500/5 blur-3xl'></div>

        {/* Estrelas cintilantes */}
        <div className='absolute top-32 right-1/3 h-0.5 w-0.5 rounded-full bg-emerald-300 shadow-[0_0_10px_5px_rgba(16,185,129,0.3)]'></div>
        <div className='absolute top-1/4 left-1/3 h-0.5 w-0.5 rounded-full bg-emerald-300 shadow-[0_0_10px_5px_rgba(16,185,129,0.3)]'></div>
        <div className='absolute right-1/5 bottom-1/3 h-0.5 w-0.5 rounded-full bg-emerald-300 shadow-[0_0_10px_5px_rgba(16,185,129,0.3)]'></div>
        <div className='absolute top-1/2 left-24 h-0.5 w-0.5 rounded-full bg-emerald-300 shadow-[0_0_10px_5px_rgba(16,185,129,0.3)]'></div>
        <div className='absolute bottom-36 left-1/3 h-0.5 w-0.5 rounded-full bg-emerald-300 shadow-[0_0_8px_4px_rgba(16,185,129,0.2)]'></div>
        <div className='absolute right-32 bottom-20 h-0.5 w-0.5 rounded-full bg-emerald-300 shadow-[0_0_8px_4px_rgba(16,185,129,0.2)]'></div>
      </div>

      <DashboardSidebar account={account} subscription={subscription} onSignOut={onSignOut} />

      <main className='relative ml-0 min-h-screen md:ml-64'>
        <div className='container mx-auto px-6 py-6 md:px-12'>{children}</div>
      </main>
    </div>
  )
}
