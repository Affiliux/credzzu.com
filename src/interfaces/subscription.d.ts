/**
 *
 * @name Subscription
 * @category Subscription - Subscription
 *
 */

export interface SubscriptionProps {
  id: string
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
 * @category Subscription - Get Subscription
 *
 */

export interface GetSubscriptionResponseProps extends SubscriptionProps {}

/**
 *
 * @name CreateSubscription
 * @category Subscription - Create Subscription
 *
 */

export interface CreateSubscriptionPayloadProps {
  idPlan: string
  cardToken: string
}

/**
 *
 * @name UpdateSubscription
 * @category Subscription - Update Subscription
 *
 */

export interface UpdateSubscriptionPayloadProps {
  cardToken: string
}

/**
 *
 * @name ReactivateSubscription
 * @category Subscription - Reactivate Subscription
 *
 */

export interface ReactivateSubscriptionPayloadProps {
  id: string
  cardToken: string
}
