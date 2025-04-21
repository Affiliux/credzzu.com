'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { jwtDecode } from 'jwt-decode'
import { usePathname } from 'next/navigation'

import {
  change_password,
  forgot_password,
  resend_email_verification,
  sign_in,
  sign_up,
  update_account,
  update_password,
  verify_account,
} from '@/http/services/account'

import {
  AccountProps,
  ChangePasswordPayloadProps,
  ForgotPasswordPayloadProps,
  ResendEmailVerificationPayloadProps,
  SignInPayloadProps,
  SignUpPayloadProps,
  UpdateAccountPayloadProps,
  UpdatePasswordPayloadProps,
  VerifyAccountPayloadProps,
} from '@/interfaces/account'

import { NEXT_REFRESH_TOKEN, NEXT_USER_TOKEN } from '@/lib/constants'

import type { AccountContextType, AccountProviderProps } from './types'

export const AccountContext = createContext<AccountContextType>({} as AccountContextType)

export default function AccountProvider({ children }: AccountProviderProps) {
  // hooks
  const pathname = usePathname()

  // states
  const [account, set_account] = useState<AccountProps | null>(null)

  async function onSignIn(payload: SignInPayloadProps) {
    try {
      const response = await sign_in(payload)

      setCookie(NEXT_USER_TOKEN, response.access_token, {
        maxAge: 60 * 60 * 24 * 30,
      })

      setCookie(NEXT_REFRESH_TOKEN, response.refresh_token, {
        maxAge: 60 * 60 * 24 * 30,
      })

      const account_decoded = jwtDecode<AccountProps>(response.access_token)

      set_account(account_decoded)
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }

  async function onSignUp(payload: SignUpPayloadProps) {
    try {
      await sign_up(payload)
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }

  async function onVerifyAccount(payload: VerifyAccountPayloadProps) {
    try {
      const response = await verify_account(payload)

      setCookie(NEXT_USER_TOKEN, response.access_token, {
        maxAge: 60 * 60 * 24 * 30,
      })

      setCookie(NEXT_REFRESH_TOKEN, response.refresh_token, {
        maxAge: 60 * 60 * 24 * 30,
      })

      const account_decoded = jwtDecode<AccountProps>(response.access_token)

      set_account(account_decoded)
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }

  async function onResendVerification(payload: ResendEmailVerificationPayloadProps) {
    try {
      await resend_email_verification(payload)
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }

  async function onForgotPassword(payload: ForgotPasswordPayloadProps) {
    try {
      await forgot_password(payload)
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }

  async function onChangePassword(payload: ChangePasswordPayloadProps) {
    try {
      const response = await change_password(payload)

      setCookie(NEXT_USER_TOKEN, response.access_token, {
        maxAge: 60 * 60 * 24 * 30,
      })

      setCookie(NEXT_REFRESH_TOKEN, response.refresh_token, {
        maxAge: 60 * 60 * 24 * 30,
      })

      const account_decoded = jwtDecode<AccountProps>(response.access_token)

      set_account(account_decoded)
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }

  async function onUpdatePassword(payload: UpdatePasswordPayloadProps) {
    try {
      await update_password(payload)
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }

  async function onUpdateAccount(payload: UpdateAccountPayloadProps) {
    try {
      await update_account(payload)

      set_account(rest => ({
        ...rest,
        ...payload,
      }))
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }

  async function onSignOut() {
    set_account(null)

    deleteCookie(NEXT_USER_TOKEN)
    deleteCookie(NEXT_REFRESH_TOKEN)

    window.location.href = '/auth/sign-in'
  }

  useEffect(() => {
    const token = getCookie(NEXT_USER_TOKEN)

    if (token && !account) {
      const account_decoded = jwtDecode<AccountProps>(token)

      set_account(account_decoded)
    }
  }, [])

  return (
    <AccountContext.Provider
      value={{
        account,
        //
        onSignIn,
        onSignUp,
        onVerifyAccount,
        onResendVerification,
        onForgotPassword,
        onChangePassword,
        onUpdatePassword,
        onUpdateAccount,
        onSignOut,
      }}
    >
      {children}
    </AccountContext.Provider>
  )
}

export const useAccount = () => {
  const context = useContext(AccountContext)
  return context
}
