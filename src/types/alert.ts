export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type AlertStatus = 'ACTIVE' | 'DISMISSED' | 'RESOLVED';

export interface AcademicAlert {
  id: string;
  studentId: string;
  studentName: string;
  academicPeriodId: string;
  riskLevel: RiskLevel;
  riskScore: number;
  factorScores: Record<string, number>;
  status: AlertStatus;
  dismissedBy?: string;
  dismissedAt?: string;
  dismissReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AlertSummary {
  total: number;
  active: number;
  dismissed: number;
  resolved: number;
  byRiskLevel: Record<RiskLevel, number>;
}

export interface RiskFactorScores {
  gradeScore: number;
  attendanceScore: number;
  trendScore: number;
  participationScore?: number;
  totalScore: number;
}
