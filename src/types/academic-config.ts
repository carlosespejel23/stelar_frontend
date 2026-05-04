export type PeriodType = 'SEMESTER' | 'TRIMESTER' | 'QUARTER' | 'ANNUAL' | 'CUSTOM';

export interface EvaluationPeriod {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  weight: number;
  order: number;
}

export interface AcademicPeriod {
  id: string;
  tenantId: string;
  name: string;
  type: PeriodType;
  startDate: string;
  endDate: string;
  active: boolean;
  evaluationPeriods: EvaluationPeriod[];
  createdAt: string;
  updatedAt: string;
}

export interface TenantAcademicConfig {
  id: string;
  tenantId: string;
  periodType: PeriodType;
  passingScore: number;
  maxScore: number;
  attendanceThreshold: number;
  gradeWeight: number;
  attendanceWeight: number;
  updatedAt: string;
}

export interface RiskWeights {
  gradeWeight: number;
  attendanceWeight: number;
  trendWeight: number;
  participationWeight: number;
}
