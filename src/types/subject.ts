export interface Subject {
  id: string;
  tenantId: string;
  name: string;
  code: string;
  description?: string;
  credits?: number;
  hoursPerWeek?: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSubjectRequest {
  name: string;
  code: string;
  description?: string;
  credits?: number;
  hoursPerWeek?: number;
}

export interface UpdateSubjectRequest extends Partial<CreateSubjectRequest> {
  active?: boolean;
}
