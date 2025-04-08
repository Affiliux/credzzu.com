import type { AxiosError } from "axios";

import type {
  RefreshTokenProps,
  SignInPayloadProps,
  SignUpPayloadProps,
  VerifyAccountPayloadProps,
  ForgotPasswordPayloadProps,
  ResendEmailVerificationPayloadProps,
  ChangePasswordPayloadProps,
} from "@/application/interfaces/account";

import { api } from "../api";

/**
 *
 * @name sign_in
 * @category Infrastructure - Services - Account - Sign In

 *
 * @param {SignInPayloadProps} payload - The payload of the request
 * @return {PromiseLike<SignInResponseProps>} - The response of the API
 *
 */

export async function sign_in(
  payload: SignInPayloadProps,
): Promise<RefreshTokenProps> {
  try {
    const { data: response } = await api.post(`auth/login`, payload);
    return response;
  } catch (error: AxiosError | any) {
    throw new Error(error?.response.status);
  }
}

/**
 *
 * @name sign_up
 * @category Infrastructure - Services - Account - Sign Up  

 *
 * @param {SignUpPayloadProps} payload - The payload of the request
 * @return {PromiseLike<void>} - The response of the API
 *
 */

export async function sign_up(payload: SignUpPayloadProps): Promise<void> {
  try {
    await api.post(`user/create`, payload);
  } catch (error: AxiosError | any) {
    throw new Error(error?.response.status);
  }
}

/**
 *
 * @name verify_account
 * @category Infrastructure - Services - Account - Verify Account  

 *
 * @param {VerifyAccountPayloadProps} payload - The payload of the request
 * @return {PromiseLike<void>} - The response of the API
 *
 */

export async function verify_account(
  payload: VerifyAccountPayloadProps,
): Promise<RefreshTokenProps> {
  try {
    const { data: response } = await api.patch(`user/active-user`, payload);
    return response;
  } catch (error: AxiosError | any) {
    throw new Error(error?.response.status);
  }
}

/**
 *
 * @name resend_email_verification
 * @category Infrastructure - Services - Account - Resend Email Verification

 *
 * @param {ResendEmailVerificationPayloadProps} payload - The payload of the request
 * @return {PromiseLike<void>} - The response of the API
 *
 */

export async function resend_email_verification(
  payload: ResendEmailVerificationPayloadProps,
): Promise<void> {
  try {
    await api.patch(`user/resend-email-verification`, payload);
  } catch (error: AxiosError | any) {
    throw new Error(error?.response.status);
  }
}

/**
 *
 * @name forgot_password
 * @category Infrastructure - Services - Account -  Forgot Password

 *
 * @param {VerifyAccountPayloadProps} payload - The payload of the request
 * @return {PromiseLike<void>} - The response of the API
 *
 */

export async function forgot_password(
  payload: ForgotPasswordPayloadProps,
): Promise<void> {
  try {
    await api.patch(`user/recover-password/step1`, payload);
  } catch (error: AxiosError | any) {
    throw new Error(error?.response.status);
  }
}

/**
 *
 * @name change_password
 * @category Infrastructure - Services - Account - Change Password 

 *
 * @param {ChangePasswordPayloadProps} payload - The payload of the request
 * @return {PromiseLike<RefreshTokenProps>} - The response of the API
 *
 */

export async function change_password(
  payload: ChangePasswordPayloadProps,
): Promise<RefreshTokenProps> {
  try {
    const { data: response } = await api.patch(
      `user/recover-password/step2`,
      payload,
    );

    return response;
  } catch (error: AxiosError | any) {
    throw new Error(error?.response.status);
  }
}
