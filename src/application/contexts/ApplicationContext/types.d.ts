import type { ReactNode } from 'react'

import type { PlanProps } from '@/application/interfaces/application'

export type ApplicationProviderProps = {
  children: ReactNode
}

export type ApplicationContextType = {
  plans: PlanProps[]
  //
  onGetPlans: () => Promise<void>
}
