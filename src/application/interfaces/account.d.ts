import type { AccountTypes, DocumentTypes, LanguageCodes } from "@/lib/enums";

/**
 *
 * @name RefreshToken
 * @category Interfaces - Account - RefreshToken
 *
 */

export interface RefreshTokenProps {
  access_token: string;
  refresh_token: string;
}

/**
 *
 * @name Account
 * @category Interfaces - Account - Account
 *
 */

export interface AccountProps {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 *
 * @name SignIn
 * @category Interfaces - Account - Sign In
 *
 */

export interface SignInPayloadProps {
  email: string;
  password: string;
}

/**
 *
 * @name SignUp
 * @category Interfaces - Account - Sign Up
 *
 */

export interface SignUpPayloadProps {
  name: string;
  email: string;
  phone: string;
  password: string;
}

/**
 *
 * @name VerifyAccount
 * @category Interfaces - Account - Verify Account
 *
 */

export interface VerifyAccountPayloadProps {
  email: string;
  token: string;
}

/**
 *
 * @name ResendEmailVerification
 * @category Interfaces - Account - Resend Email Verification
 *
 */

export interface ResendEmailVerificationPayloadProps {
  email: string;
}

/**
 *
 * @name ForgotPassword
 * @category Interfaces - Account - Forgot Password
 *
 */

export interface ForgotPasswordPayloadProps {
  email: string;
}

/**
 *
 * @name ChangePassword
 * @category Interfaces - Account - ChangePassword
 *
 */

export interface ChangePasswordPayloadProps {
  email: string;
  token: string;
  password: string;
}
