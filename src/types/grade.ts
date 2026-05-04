export interface Grade {
  id: string;
  studentId: string;
  studentName: string;
  subjectId: string;
  subjectName: string;
  groupId: string;
  academicPeriodId: string;
  evaluationPeriodId?: string;
  score: number;
  maxScore: number;
  notes?: string;
  recordedBy: string;
  recordedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGradeRequest {
  studentId: string;
  subjectId: string;
  groupId: string;
  academicPeriodId: string;
  evaluationPeriodId?: string;
  score: number;
  maxScore: number;
  notes?: string;
}

export interface BatchGradeItem {
  studentId: string;
  score: number;
  notes?: string;
}

export interface BatchGradeRequest {
  subjectId: string;
  groupId: string;
  academicPeriodId: string;
  evaluationPeriodId?: string;
  maxScore: number;
  grades: BatchGradeItem[];
}

export interface SubjectSummary {
  subjectId: string;
  subjectName: string;
  average: number;
  highest: number;
  lowest: number;
  passingCount: number;
  failingCount: number;
  totalStudents: number;
}

export interface GradeAverage {
  studentId: string;
  subjectId: string;
  average: number;
  gradeCount: number;
}
