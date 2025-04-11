import type { AxiosError } from 'axios'

import {
  CreateSubscriptionPayloadProps,
  GetSubscriptionResponseProps,
  UpdateSubscriptionPayloadProps,
} from '@/application/interfaces/subscription'

import { api } from '../api'

/**
 *
 * @name get_subscription
 * @category Infrastructure - Services - Subscription - Get Subscription
 *
 * @return {PromiseLike<GetSubscriptionResponseProps>} - The response of the API
 *
 */

export async function get_subscription(): Promise<GetSubscriptionResponseProps> {
  try {
    const { data: response } = await api.get('subscription')
    return response
  } catch (error: AxiosError | any) {
    throw new Error(error?.response.status)
  }
}

/**
 *
 * @name create_subscription
 * @category Infrastructure - Services - Subscription - Cancel Subscription
 *
 * @param {CreateSubscriptionPayloadProps} payload - The payload of the request
 * @return {PromiseLike<void>} - The response of the API
 *
 */

export async function create_subscription(payload: CreateSubscriptionPayloadProps): Promise<void> {
  try {
    const { data: response } = await api.post('subscription/create', payload)
    return response
  } catch (error: AxiosError | any) {
    throw new Error(error?.response.status)
  }
}

/**
 *
 * @name cancel_subscription
 * @category Infrastructure - Services - Subscription - Cancel Subscription
 *
 * @return {PromiseLike<void>} - The response of the API
 *
 */

export async function cancel_subscription(): Promise<void> {
  try {
    await api.delete('subscription/cancel')
  } catch (error: AxiosError | any) {
    throw new Error(error?.response.status)
  }
}

/**
 *
 * @name update_subscription
 * @category Infrastructure - Services - Subscription - Cancel Subscription
 *
 * @param {UpdateSubscriptionPayloadProps} payload - The payload of the request
 * @return {PromiseLike<void>} - The response of the API
 *
 */

export async function update_subscription(payload: UpdateSubscriptionPayloadProps): Promise<void> {
  try {
    const { data: response } = await api.patch('subscription/update-card')
    return response
  } catch (error: AxiosError | any) {
    throw new Error(error?.response.status)
  }
}
