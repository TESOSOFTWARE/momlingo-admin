export interface INewAgentSlice {
  showPassword: boolean;
  confirmPassword: boolean;
}

export interface IGroupPolicyParams {
  searchText?: string;
  status?: string;
  type?: string;
  page?: number;
  limit?: number;
}

export interface INewAgent {
  email: string;
  password: string;
  groupPolicyIds: number[];
}

export interface IDataNewAgent {
  email: string;
  newPassword: string;
  confirmPassword: string;
  groupPolicyIds: [
    {
      value: number;
      label: string;
    }
  ];
}
