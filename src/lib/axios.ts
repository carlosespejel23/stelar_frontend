import type { AxiosRequestConfig } from 'axios';

import axios from 'axios';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: CONFIG.serverUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ----------------------------------------------------------------------
// 401 interceptor — auto-refresh with queuing
// ----------------------------------------------------------------------

const JWT_STORAGE_KEY = 'jwt_access_token';
const JWT_REFRESH_KEY = 'jwt_refresh_token';
const SIGN_IN_PATH = '/auth/jwt/sign-in';

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token as string);
    }
  });
  failedQueue = [];
};

const clearSession = () => {
  sessionStorage.removeItem(JWT_STORAGE_KEY);
  localStorage.removeItem(JWT_REFRESH_KEY);
  delete axiosInstance.defaults.headers.common.Authorization;
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config as AxiosRequestConfig & { _isRetry?: boolean };

    // Handle 401 — attempt token refresh
    if (error.response?.status === 401 && !originalConfig._isRetry) {
      const refreshToken = localStorage.getItem(JWT_REFRESH_KEY);

      if (!refreshToken) {
        clearSession();
        window.location.href = SIGN_IN_PATH;
        return Promise.reject(new Error('Sesión expirada. Inicia sesión nuevamente.'));
      }

      if (isRefreshing) {
        // Queue this request until refresh completes
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            originalConfig.headers = {
              ...originalConfig.headers,
              Authorization: `Bearer ${newToken}`,
            };
            return axiosInstance(originalConfig);
          })
          .catch((queueError: Error) => Promise.reject(queueError));
      }

      originalConfig._isRetry = true;
      isRefreshing = true;

      try {
        const response = await axiosInstance.post('/api/v1/auth/refresh', { refreshToken });
        const { accessToken, refreshToken: newRefreshToken } = response.data as {
          accessToken: string;
          refreshToken?: string;
        };

        sessionStorage.setItem(JWT_STORAGE_KEY, accessToken);
        if (newRefreshToken) {
          localStorage.setItem(JWT_REFRESH_KEY, newRefreshToken);
        }
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        processQueue(null, accessToken);
        isRefreshing = false;

        originalConfig.headers = {
          ...originalConfig.headers,
          Authorization: `Bearer ${accessToken}`,
        };
        return axiosInstance(originalConfig);
      } catch (refreshError) {
        processQueue(refreshError as Error, null);
        isRefreshing = false;
        clearSession();
        window.location.href = SIGN_IN_PATH;
        return Promise.reject(new Error('Sesión expirada. Inicia sesión nuevamente.'));
      }
    }

    // For all other errors, extract message from backend response
    const message = error?.response?.data?.message || error?.message || 'Algo salió mal';
    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async <T = unknown>(
  args: string | [string, AxiosRequestConfig]
): Promise<T> => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args, {}];

    const res = await axiosInstance.get<T>(url, config);

    return res.data;
  } catch (error) {
    console.error('Fetcher failed:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    validate: '/api/v1/auth/validate',
    login: '/api/v1/auth/login',
    register: '/api/v1/auth/register',
    session: '/api/v1/auth/session',   // consolida me + permissions + tenants en 1 request
    me: '/api/v1/auth/me',
    mePermissions: '/api/v1/auth/me/permissions',
    meTenants: '/api/v1/auth/me/tenants',
    refresh: '/api/v1/auth/refresh',
    switchTenant: '/api/v1/auth/switch-tenant',
    logout: '/api/v1/auth/logout',
    verifyEmail: '/api/v1/auth/verify-email',
    resendVerification: '/api/v1/auth/verify-email/resend',
    forgotPassword: '/api/v1/auth/forgot-password',
    resetPassword: '/api/v1/auth/reset-password',
  },
  invitations: {
    external: '/api/v1/invitations/external',
    internal: '/api/v1/invitations/internal',
    accept: '/api/v1/invitations/accept',
    revoke: '/api/v1/invitations/revoke',
    list: '/api/v1/invitations',
    register: '/api/v1/invitations/register',
  },
  users: {
    list: '/api/v1/users',
    details: (id: string) => `/api/v1/users/${id}`,
    create: '/api/v1/users',
  },
  tenants: {
    current: '/api/v1/tenants/current',
  },
  roles: {
    list: '/api/v1/roles',
    create: '/api/v1/roles',
    update: (id: string) => `/api/v1/roles/${id}`,
  },
  permissions: {
    list: '/api/v1/permissions',
    create: '/api/v1/permissions',
    update: (id: string) => `/api/v1/permissions/${id}`,
  },
  groups: {
    list: '/api/v1/groups',
    create: '/api/v1/groups',
    details: (id: string) => `/api/v1/groups/${id}`,
  },
  subjects: {
    list: '/api/v1/subjects',
    create: '/api/v1/subjects',
    details: (id: string) => `/api/v1/subjects/${id}`,
  },
  students: {
    list: '/api/v1/students',
    create: '/api/v1/students',
    details: (id: string) => `/api/v1/students/${id}`,
    dashboard: (id: string) => `/api/v1/students/${id}/dashboard`,
    enrollments: {
      create: '/api/v1/students/enrollments',
      list: (studentId: string) => `/api/v1/students/${studentId}/enrollments`,
      cancel: (enrollmentId: string) => `/api/v1/students/enrollments/${enrollmentId}`,
    },
  },
  attendance: {
    create: '/api/v1/attendance',
    batch: '/api/v1/attendance/batch',
    byStudent: (id: string) => `/api/v1/attendance/student/${id}`,
    bySubject: (id: string) => `/api/v1/attendance/subject/${id}`,
    byGroup: (id: string) => `/api/v1/attendance/group/${id}`,
  },
  grades: {
    create: '/api/v1/grades',
    batch: '/api/v1/grades/batch',
    byStudent: (id: string) => `/api/v1/grades/student/${id}`,
    bySubject: (id: string) => `/api/v1/grades/subject/${id}`,
    average: (studentId: string, subjectId: string) =>
      `/api/v1/grades/student/${studentId}/subject/${subjectId}/average`,
  },
  academic: {
    config: '/api/v1/academic/config',
    periods: {
      list: '/api/v1/academic/periods',
      active: '/api/v1/academic/periods/active',
      activate: (id: string) => `/api/v1/academic/periods/${id}/activate`,
    },
  },
  alerts: {
    list: '/api/v1/alerts',
    byStudent: (id: string) => `/api/v1/alerts/student/${id}`,
    summary: '/api/v1/alerts/summary',
    dismiss: (id: string) => `/api/v1/alerts/${id}/dismiss`,
    evaluate: (studentId: string) => `/api/v1/alerts/evaluate/${studentId}`,
    evaluateAll: '/api/v1/alerts/evaluate-all',
  },
  risk: {
    weights: '/api/v1/risk/weights',
  },
  notifications: {
    list: '/api/v1/notifications',
    unreadCount: '/api/v1/notifications/unread-count',
    read: (id: string) => `/api/v1/notifications/${id}/read`,
    readAll: '/api/v1/notifications/read-all',
    preferences: '/api/v1/notifications/preferences',
  },
  reports: {
    generate: '/api/v1/reports/generate',
    list: '/api/v1/reports',
    details: (id: string) => `/api/v1/reports/${id}`,
    download: (id: string) => `/api/v1/reports/${id}/download`,
  },
  stats: {
    dashboard: '/api/v1/dashboard',
    riskSummary: '/api/v1/dashboard/risk-summary',
    byGroup: (groupId: string) => `/api/v1/stats/group/${groupId}`,
    byGroupSubject: (groupId: string, subjectId: string) =>
      `/api/v1/stats/group/${groupId}/subject/${subjectId}`,
  },
};
