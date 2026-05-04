export type ReportType =
  | 'STUDENT_PERFORMANCE'
  | 'GROUP_SUMMARY'
  | 'ATTENDANCE_REPORT'
  | 'GRADE_REPORT'
  | 'RISK_REPORT'
  | 'PERIOD_SUMMARY';

export type ReportStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

export interface Report {
  id: string;
  tenantId: string;
  type: ReportType;
  title: string;
  description?: string;
  parameters: Record<string, unknown>;
  status: ReportStatus;
  fileUrl?: string;
  fileSize?: number;
  generatedBy: string;
  requestedAt: string;
  completedAt?: string;
  createdAt: string;
}

export interface GenerateReportRequest {
  type: ReportType;
  title: string;
  description?: string;
  parameters: Record<string, unknown>;
}
