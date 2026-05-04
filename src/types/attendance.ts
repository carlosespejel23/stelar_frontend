export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'JUSTIFIED';

export interface Attendance {
  id: string;
  studentId: string;
  studentName: string;
  subjectId: string;
  subjectName: string;
  groupId: string;
  academicPeriodId: string;
  date: string;
  status: AttendanceStatus;
  notes?: string;
  recordedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAttendanceRequest {
  studentId: string;
  subjectId: string;
  groupId: string;
  academicPeriodId: string;
  date: string;
  status: AttendanceStatus;
  notes?: string;
}

export interface BatchAttendanceItem {
  studentId: string;
  status: AttendanceStatus;
  notes?: string;
}

export interface BatchAttendanceRequest {
  subjectId: string;
  groupId: string;
  academicPeriodId: string;
  date: string;
  records: BatchAttendanceItem[];
}

export interface AttendanceSummary {
  studentId: string;
  totalClasses: number;
  present: number;
  absent: number;
  late: number;
  justified: number;
  attendanceRate: number;
}
