'use client'

import React from 'react'

import AccountProvider from './AccountContext'
import ApplicationProvider from './ApplicationContext'
import DashboardProvider from './DashboardContext'
import SubscriptionProvider from './SubscriptionContext'

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return typeof window !== 'undefined' ? (
    <ApplicationProvider>
      <AccountProvider>
        <SubscriptionProvider>
          <DashboardProvider>{children}</DashboardProvider>
        </SubscriptionProvider>
      </AccountProvider>
    </ApplicationProvider>
  ) : (
    <>{children}</>
  )
}
