/**
 *
 * @name Plan
 * @category Interfaces - Application - Plan
 *
 */

export interface PlanProps {
  id: string;
  name: string;
  sku: string;
  description: string;
  price: number;
  recurrence: {
    MONTHLY: string;
    YEARLY: string;
  };
  createdAt: string;
  updatedAt: string;
}
