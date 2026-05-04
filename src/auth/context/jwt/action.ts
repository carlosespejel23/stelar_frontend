import type { TenantInfo } from '../../types';

import axios, { endpoints } from 'src/lib/axios';

import { setSession } from './utils';
import { JWT_REFRESH_KEY } from './constant';

// ----------------------------------------------------------------------

export type SignInParams = {
  email: string;
  password: string;
};

export type SignInWithTenantParams = {
  email: string;
  password: string;
  tenantSlug: string;
  preAuthToken?: string | null;
};

export type SignUpParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  schoolName: string;
  description?: string;
  periodType?: string;
};

export type VerifyEmailParams = { token: string };

export type ResendVerificationParams = { email: string };

export type ForgotPasswordParams = { email: string };

export type ResetPasswordParams = { token: string; newPassword: string };

export type SignInResult =
  | { requiresTenantSelection: false }
  | { requiresTenantSelection: true; tenants: TenantInfo[]; preAuthToken: string | null };

// Backend validate response shape
type ValidateResponse = {
  firstName: string;
  lastName: string;
  email: string;
  tenants: Array<{ id: string; name: string; slug: string; logoUrl?: string | null }>;
  preAuthToken: string | null;
};

// Backend login/refresh response shape
type AuthTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

// ----------------------------------------------------------------------

/** **************************************
 * Sign in — Step 1: validate credentials
 * Single tenant → login automatically.
 * Multiple tenants → return list for UI selector.
 *************************************** */
export const signIn = async ({ email, password }: SignInParams): Promise<SignInResult> => {
  try {
    const res = await axios.post<ValidateResponse>(endpoints.auth.validate, { email, password });

    const { tenants, preAuthToken } = res.data;

    if (!tenants || tenants.length === 0) {
      throw new Error('No perteneces a ninguna institución. Contacta a tu administrador.');
    }

    const tenantList: TenantInfo[] = tenants.map((t) => ({
      id: t.id,
      name: t.name,
      slug: t.slug,
      logoUrl: t.logoUrl ?? null,
    }));

    if (tenantList.length === 1) {
      // Un solo tenant — login automático, pasamos preAuthToken para evitar doble BCrypt
      await signInWithTenant({ email, password, tenantSlug: tenantList[0].slug, preAuthToken });
      return { requiresTenantSelection: false };
    }

    // Múltiples tenants — devolver lista + preAuthToken para que la vista los use al confirmar
    return { requiresTenantSelection: true, tenants: tenantList, preAuthToken };
  } catch (error) {
    console.error('Error during sign in (validate):', error);
    throw error;
  }
};

/** **************************************
 * Sign in — Step 2: login with selected tenant
 *************************************** */
export const signInWithTenant = async ({
  email,
  password,
  tenantSlug,
  preAuthToken,
}: SignInWithTenantParams): Promise<void> => {
  try {
    const res = await axios.post<AuthTokenResponse>(endpoints.auth.login, {
      email,
      password,
      tenantSlug,
      // preAuthToken omite re-verificación BCrypt en el backend (TTL 30s)
      ...(preAuthToken ? { preAuthToken } : {}),
    });

    const { accessToken, refreshToken } = res.data;

    if (!accessToken) {
      throw new Error('No se recibió el token de acceso.');
    }

    setSession(accessToken, refreshToken ?? null);
  } catch (error) {
    console.error('Error during sign in (login):', error);
    throw error;
  }
};

/** **************************************
 * Sign up — creates a new tenant + admin user
 *************************************** */
export const signUp = async ({
  firstName,
  lastName,
  email,
  password,
  schoolName,
  description,
  periodType,
}: SignUpParams): Promise<void> => {
  try {
    await axios.post(endpoints.auth.register, {
      firstName,
      lastName,
      email,
      password,
      schoolName,
      description: description || undefined,
      periodType: periodType || undefined,
    });
    // Backend sends a verification email; no tokens returned.
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error;
  }
};

/** **************************************
 * Verify email with token from email link
 *************************************** */
export const verifyEmail = async ({ token }: VerifyEmailParams): Promise<void> => {
  try {
    await axios.post(endpoints.auth.verifyEmail, { token });
  } catch (error) {
    console.error('Error during email verification:', error);
    throw error;
  }
};

/** **************************************
 * Resend verification email
 *************************************** */
export const resendVerificationEmail = async ({ email }: ResendVerificationParams): Promise<void> => {
  try {
    await axios.post(endpoints.auth.resendVerification, { email });
  } catch (error) {
    console.error('Error during resend verification email:', error);
    throw error;
  }
};

/** **************************************
 * Forgot password — request reset link via email
 *************************************** */
export const forgotPassword = async ({ email }: ForgotPasswordParams): Promise<void> => {
  try {
    await axios.post(endpoints.auth.forgotPassword, { email });
  } catch (error) {
    console.error('Error during forgot password:', error);
    throw error;
  }
};

/** **************************************
 * Reset password — set new password using token from email link
 *************************************** */
export const resetPassword = async ({ token, newPassword }: ResetPasswordParams): Promise<void> => {
  try {
    await axios.post(endpoints.auth.resetPassword, { token, newPassword });
  } catch (error) {
    console.error('Error during reset password:', error);
    throw error;
  }
};

/** **************************************
 * Sign out — invalidates refresh token on the backend
 *************************************** */
export const signOut = async (): Promise<void> => {
  try {
    const refreshToken = localStorage.getItem(JWT_REFRESH_KEY);
    if (refreshToken) {
      await axios.post(endpoints.auth.logout, { refreshToken });
    }
  } catch (error) {
    console.error('Error during sign out:', error);
  } finally {
    setSession(null, null);
  }
};
