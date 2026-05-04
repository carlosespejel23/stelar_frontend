export interface Group {
  id: string;
  tenantId: string;
  name: string;
  code: string;
  description?: string;
  gradeLevel?: string;
  academicPeriodId?: string;
  studentCount: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGroupRequest {
  name: string;
  code: string;
  description?: string;
  gradeLevel?: string;
  academicPeriodId?: string;
}

export interface UpdateGroupRequest extends Partial<CreateGroupRequest> {
  active?: boolean;
}
