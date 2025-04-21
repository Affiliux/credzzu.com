import type { AccountTypes, DocumentTypes, LanguageCodes } from '@/lib/enums'

/**
 *
 * @name RefreshToken
 * @category Account - RefreshToken
 *
 */

export interface RefreshTokenProps {
  access_token: string
  refresh_token: string
}

/**
 *
 * @name Account
 * @category Account - Account
 *
 */

export interface AccountProps {
  id: string
  name: string
  email: string
  phone?: string
  createdAt?: string
  updatedAt?: string
}

/**
 *
 * @name SignIn
 * @category Account - Sign In
 *
 */

export interface SignInPayloadProps {
  email: string
  password: string
}

/**
 *
 * @name SignUp
 * @category Account - Sign Up
 *
 */

export interface SignUpPayloadProps {
  name: string
  email: string
  phone: string
  password: string
}

/**
 *
 * @name VerifyAccount
 * @category Account - Verify Account
 *
 */

export interface VerifyAccountPayloadProps {
  email: string
  token: string
}

/**
 *
 * @name ResendEmailVerification
 * @category Account - Resend Email Verification
 *
 */

export interface ResendEmailVerificationPayloadProps {
  email: string
}

/**
 *
 * @name ForgotPassword
 * @category Account - Forgot Password
 *
 */

export interface ForgotPasswordPayloadProps {
  email: string
}

/**
 *
 * @name ChangePassword
 * @category Account - ChangePassword
 *
 */

export interface ChangePasswordPayloadProps {
  email: string
  token: string
  password: string
}

/**
 *
 * @name UpdatePassword
 * @category Account - UpdatePassword
 *
 */

export interface UpdatePasswordPayloadProps {
  password: string
  newPassword: string
}

/**
 *
 * @name UpdateAccount
 * @category Account - UpdateAccount
 *
 */

export interface UpdateAccountPayloadProps {
  name: string
  phone: string
}
