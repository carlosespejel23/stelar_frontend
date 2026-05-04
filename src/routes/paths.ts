// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  faqs: '/faqs',
  minimalStore: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    signIn: `${ROOTS.AUTH}/sign-in`,
    signUp: `${ROOTS.AUTH}/sign-up`,
    forgotPassword: `${ROOTS.AUTH}/forgot-password`,
    resetPassword: `${ROOTS.AUTH}/reset-password`,
    verifyEmail: `${ROOTS.AUTH}/verify-email`,
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    students: {
      root: `${ROOTS.DASHBOARD}/students`,
      new: `${ROOTS.DASHBOARD}/students/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/students/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/students/${id}/edit`,
    },
    groups: {
      root: `${ROOTS.DASHBOARD}/groups`,
      new: `${ROOTS.DASHBOARD}/groups/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/groups/${id}`,
    },
    subjects: {
      root: `${ROOTS.DASHBOARD}/subjects`,
      new: `${ROOTS.DASHBOARD}/subjects/new`,
    },
    grades: {
      root: `${ROOTS.DASHBOARD}/grades`,
      entry: (groupId: string, subjectId: string) =>
        `${ROOTS.DASHBOARD}/grades/${groupId}/${subjectId}`,
    },
    attendance: {
      root: `${ROOTS.DASHBOARD}/attendance`,
      entry: (groupId: string, subjectId: string) =>
        `${ROOTS.DASHBOARD}/attendance/${groupId}/${subjectId}`,
      history: `${ROOTS.DASHBOARD}/attendance/history`,
    },
    alerts: {
      root: `${ROOTS.DASHBOARD}/alerts`,
      details: (id: string) => `${ROOTS.DASHBOARD}/alerts/${id}`,
    },
    reports: `${ROOTS.DASHBOARD}/reports`,
  },
};
