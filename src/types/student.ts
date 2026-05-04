import type { AcademicAlert, RiskLevel } from './alert';

export type { RiskLevel };

export interface Student {
  id: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  studentCode: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
  birthDate?: string;
  address?: string;
  guardianName?: string;
  guardianPhone?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStudentRequest {
  firstName: string;
  lastName: string;
  studentCode: string;
  email?: string;
  phone?: string;
  birthDate?: string;
  address?: string;
  guardianName?: string;
  guardianPhone?: string;
}

export interface UpdateStudentRequest extends Partial<CreateStudentRequest> {
  active?: boolean;
}

export interface StudentEnrollment {
  id: string;
  studentId: string;
  groupId: string;
  groupName: string;
  academicPeriodId: string;
  enrolledAt: string;
  cancelledAt?: string;
  active: boolean;
}

export interface StudentDashboard {
  student: Student;
  currentRiskLevel: RiskLevel;
  riskScore: number;
  attendanceRate: number;
  gradeAverage: number;
  activeEnrollments: StudentEnrollment[];
  recentAlerts: AcademicAlert[];
}
