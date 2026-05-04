export type EmailFrequency = 'IMMEDIATE' | 'DAILY' | 'WEEKLY' | 'NEVER';

export interface InAppNotification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  read: boolean;
  readAt?: string;
  createdAt: string;
}

export interface NotificationPreference {
  id: string;
  userId: string;
  emailEnabled: boolean;
  emailFrequency: EmailFrequency;
  inAppEnabled: boolean;
  alertNotifications: boolean;
  gradeNotifications: boolean;
  attendanceNotifications: boolean;
  systemNotifications: boolean;
  updatedAt: string;
}

export interface UnreadCountResponse {
  count: number;
}
