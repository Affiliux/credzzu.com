/**
 *
 * @name Subscription
 * @category Interfaces - Subscription - Subscription
 *
 */

export interface SubscriptionProps {
  gateway: string
  externalId: string
  startDate: string
  endDate: string
  status: string
  isTrial: false
  plan: {
    id: string
    name: string
    sku: string
    description: string
    price: number
    recurrence: {
      MONTHLY: string
      YEARLY: string
    }
    createdAt: string
    updatedAt: string
  }
  createdAt: string
  updatedAt: string
}

/**
 *
 * @name GetSubscription
 * @category Interfaces - Subscription - Get Subscription
 *
 */

export interface GetSubscriptionResponseProps extends SubscriptionProps {}

/**
 *
 * @name CreateSubscription
 * @category Interfaces - Subscription - Create Subscription
 *
 */

export interface CreateSubscriptionPayloadProps {
  idPlan: string
  cardToken: string
}

/**
 *
 * @name UpdateSubscription
 * @category Interfaces - Subscription - Update Subscription
 *
 */

export interface UpdateSubscriptionPayloadProps {
  cardToken: string
}
