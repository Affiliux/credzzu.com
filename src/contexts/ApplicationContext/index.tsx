'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

import { get_plans } from '@/http/services/application'

import type { PlanProps } from '@/interfaces/application'

import type { ApplicationContextType, ApplicationProviderProps } from './types'

export const ApplicationContext = createContext<ApplicationContextType>({} as ApplicationContextType)

export default function ApplicationProvider({ children }: ApplicationProviderProps) {
  // states
  const [plans, set_plans] = useState<PlanProps[]>([])

  async function onGetPlans() {
    try {
      const response = await get_plans()
      set_plans(response)
    } catch (error: any) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!plans.length) onGetPlans()
  }, [])

  return <ApplicationContext.Provider value={{ plans, onGetPlans }}>{children}</ApplicationContext.Provider>
}

export const useApplication = () => {
  const context = useContext(ApplicationContext)
  return context
}
