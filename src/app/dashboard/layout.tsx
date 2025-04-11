'use client'

import * as React from 'react'

import { useAccount } from '@/application/contexts/AccountContext'
import { useSubscription } from '@/application/contexts/SubscriptionContext'

import { DashboardSidebar } from '@/presentation/components/dashboard/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  // contexts
  const { account, onSignOut } = useAccount()
  const { subscription } = useSubscription()

  return (
    <div className='min-h-screen bg-neutral-900'>
      <DashboardSidebar account={account} subscription={subscription} onSignOut={onSignOut} />

      <main className='ml-0 min-h-screen md:ml-64'>
        <div className='container mx-auto px-6 py-6 md:px-12'>{children}</div>
      </main>
    </div>
  )
}
