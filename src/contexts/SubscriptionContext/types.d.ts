import type { ReactNode } from 'react'

import type {
  CreateSubscriptionPayloadProps,
  ReactivateSubscriptionPayloadProps,
  SubscriptionProps,
  UpdateSubscriptionPayloadProps,
} from '@/interfaces/subscription'

export type SubscriptionProviderProps = {
  children: ReactNode
}

export type SubscriptionContextType = {
  subscription: SubscriptionProps | null
  //
  onGetSubscription: () => Promise<void>
  onCreateSubscription: (payload: CreateSubscriptionPayloadProps) => Promise<void>
  onCancelSubscription: () => Promise<void>
  onUpdateSubscription: (payload: UpdateSubscriptionPayloadProps) => Promise<void>
  onReactivateSubscription: (payload: ReactivateSubscriptionPayloadProps) => Promise<void>
}
