import type { AxiosError } from "axios";

import type { PlanProps } from "@/application/interfaces/application";

import { api } from "../api";

/**
 *
 * @name get_plans
 * @category Infrastructure - Services - Application - Get Plans
 *
 * @return {PromiseLike<PlanProps[]>} - The response of the API
 *
 */

export async function get_plans(): Promise<PlanProps[]> {
  try {
    const { data: response } = await api.get(`plan/all`);
    return response;
  } catch (error: AxiosError | any) {
    throw new Error(error?.response.status);
  }
}
