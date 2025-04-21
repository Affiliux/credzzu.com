'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

import {
  cancel_subscription,
  create_subscription,
  get_subscription,
  reactivate_subscription,
  update_subscription,
} from '@/http/services/subscription'

import type {
  CreateSubscriptionPayloadProps,
  ReactivateSubscriptionPayloadProps,
  SubscriptionProps,
  UpdateSubscriptionPayloadProps,
} from '@/interfaces/subscription'

import { SubscriptionStatusEnum } from '@/lib/enums'

import type { SubscriptionContextType, SubscriptionProviderProps } from './types'
import { useAccount } from '../AccountContext'

export const SubscriptionContext = createContext<SubscriptionContextType>({} as SubscriptionContextType)

export default function SubscriptionProvider({ children }: SubscriptionProviderProps) {
  // contexts
  const { account } = useAccount()

  // states
  const [subscription, set_subscription] = useState<SubscriptionProps | null>(null)

  async function onGetSubscription() {
    try {
      const response = await get_subscription()

      if (response) set_subscription(response)
      else set_subscription({ ...(subscription as SubscriptionProps), status: SubscriptionStatusEnum.NO_EXIST })
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }

  async function onCreateSubscription(payload: CreateSubscriptionPayloadProps) {
    try {
      await create_subscription(payload)
      await onGetSubscription()
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }

  async function onUpdateSubscription(payload: UpdateSubscriptionPayloadProps) {
    try {
      await update_subscription(payload)
      await onGetSubscription()
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }

  async function onCancelSubscription() {
    try {
      await cancel_subscription()
      await onGetSubscription()
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }

  async function onReactivateSubscription(payload: ReactivateSubscriptionPayloadProps) {
    try {
      await reactivate_subscription(payload)
      await onGetSubscription()
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }

  useEffect(() => {
    if (!!account?.id) onGetSubscription()
  }, [account?.id])

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        //
        onGetSubscription,
        onCreateSubscription,
        onCancelSubscription,
        onUpdateSubscription,
        onReactivateSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  )
}

export const useSubscription = () => {
  const context = useContext(SubscriptionContext)
  return context
}
