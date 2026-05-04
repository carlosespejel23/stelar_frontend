// Tenant info — matches backend TenantSummaryResponse
export type TenantInfo = {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string | null;
};

// User data — matches backend UserResponse
export type UserType = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string | null;
  emailVerified: boolean;
  active: boolean;
  roleName: string;
  roleId: string;
  tenantId: string;
  profession: string | null;
  createdAt: string;
} | null;

export type AuthState = {
  user: UserType;
  loading: boolean;
  tenants: TenantInfo[];
  currentTenant: TenantInfo | null;
  permissions: string[];
};

export type AuthContextValue = {
  user: UserType;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  tenants: TenantInfo[];
  currentTenant: TenantInfo | null;
  permissions: string[];
  checkUserSession?: () => Promise<void>;
};
