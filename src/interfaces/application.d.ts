/**
 *
 * @name Plan
 * @category Application - Plan
 *
 */

import { PlanRecurrenceEnum } from '../lib/enums'

export interface PlanProps {
  id: string
  name: string
  sku: string
  description: string
  price: number
  recurrence: PlanRecurrenceEnum
  createdAt: string
  updatedAt: string
}
