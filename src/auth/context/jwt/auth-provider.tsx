import type { AuthState, TenantInfo } from '../../types';

import { useSetState } from 'minimal-shared/hooks';
import { useMemo, useEffect, useCallback } from 'react';

import axios, { endpoints } from 'src/lib/axios';

import { AuthContext } from '../auth-context';
import { setSession, isValidToken } from './utils';
import { JWT_STORAGE_KEY, JWT_REFRESH_KEY } from './constant';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const { state, setState } = useSetState<AuthState>({
    user: null,
    loading: true,
    tenants: [],
    currentTenant: null,
    permissions: [],
  });

  const fetchAndSetUser = useCallback(
    async (accessToken: string) => {
      setSession(accessToken);

      // Un solo request en lugar de 3 llamadas separadas — GET /auth/session
      const res = await axios.get<{
        user: AuthState['user'];
        permissions: string[];
        tenants: TenantInfo[];
      }>(endpoints.auth.session);

      const { user, permissions, tenants } = res.data;
      const currentTenant: TenantInfo | null =
        tenants.find((t) => t.id === user?.tenantId) ?? tenants[0] ?? null;

      setState({ user, loading: false, tenants, currentTenant, permissions });
    },
    [setState]
  );

  const checkUserSession = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(JWT_STORAGE_KEY);
      const refreshToken = localStorage.getItem(JWT_REFRESH_KEY);

      if (accessToken && isValidToken(accessToken)) {
        // Access token still valid — use it directly
        await fetchAndSetUser(accessToken);
      } else if (refreshToken) {
        // Access token expired or missing but refresh token exists — attempt silent refresh
        try {
          const res = await axios.post<{ accessToken: string; refreshToken?: string }>(
            endpoints.auth.refresh,
            { refreshToken }
          );
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } = res.data;
          setSession(newAccessToken, newRefreshToken ?? null);
          await fetchAndSetUser(newAccessToken);
        } catch {
          // Refresh token invalid or expired — force logout
          setSession(null, null);
          setState({ user: null, loading: false, tenants: [], currentTenant: null, permissions: [] });
        }
      } else {
        setState({ user: null, loading: false, tenants: [], currentTenant: null, permissions: [] });
      }
    } catch (error) {
      console.error('Error checking user session:', error);
      setState({ user: null, loading: false, tenants: [], currentTenant: null, permissions: [] });
    }
  }, [fetchAndSetUser, setState]);

  useEffect(() => {
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';
  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      checkUserSession,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      tenants: state.tenants,
      currentTenant: state.currentTenant,
      permissions: state.permissions,
    }),
    [checkUserSession, state.user, state.tenants, state.currentTenant, state.permissions, status]
  );

  return <AuthContext value={memoizedValue}>{children}</AuthContext>;
}
