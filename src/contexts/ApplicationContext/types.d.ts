import type { ReactNode } from 'react'

import type { PlanProps } from '@/interfaces/application'

export type ApplicationProviderProps = {
  children: ReactNode
}

export type ApplicationContextType = {
  plans: PlanProps[]
  //
  onGetPlans: () => Promise<void>
}
