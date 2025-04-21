import type { ReactNode } from 'react'

import type {
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

export type AccountProviderProps = {
  children: ReactNode
}

export type AccountContextType = {
  account: AccountProps | null
  //
  onSignIn: (payload: SignInPayloadProps) => Promise<void>
  onSignUp: (payload: SignUpPayloadProps) => Promise<void>
  onVerifyAccount: (payload: VerifyAccountPayloadProps) => Promise<void>
  onResendVerification: (payload: ResendEmailVerificationPayloadProps) => Promise<void>
  onForgotPassword: (payload: ForgotPasswordPayloadProps) => Promise<void>
  onChangePassword: (payload: ChangePasswordPayloadProps) => Promise<void>
  onUpdatePassword: (payload: UpdatePasswordPayloadProps) => Promise<void>
  onUpdateAccount: (payload: UpdateAccountPayloadProps) => Promise<void>
  onSignOut: () => Promise<void>
}
