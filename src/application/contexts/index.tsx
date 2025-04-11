'use client'

import React from 'react'

import AccountProvider from './AccountContext'
import ApplicationProvider from './ApplicationContext'
import SubscriptionProvider from './SubscriptionContext'

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return typeof window !== 'undefined' ? (
    <ApplicationProvider>
      <AccountProvider>
        <SubscriptionProvider>{children}</SubscriptionProvider>
      </AccountProvider>
    </ApplicationProvider>
  ) : (
    <>{children}</>
  )
}
