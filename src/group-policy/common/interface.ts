export interface IPropsTableRow {
  row: IGroupPolicyRow;
  selected: boolean;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
  onEditRow: VoidFunction;
}

export interface IGroupPolicyRow {
  id: number;
  name: string;
  description: string;
  status: GroupPolicyStatus;
  type: GroupPolicyType;
}

export type StateProps = {
  groupPolicySelected: string;
  searchText: string;
  searchType?: string;
  searchStatus?: string;
  confirmModal: {
    callback: VoidFunction;
    isOpen: boolean;
    text: string;
  };
  searchPoliciesText: string;
};

export interface ISearchParams {
  page: number;
  limit: number;
  searchText?: string;
  type?: string;
  status?: string;
}

export interface ISearchPoliciesParams {
  page: number;
  limit: number;
  searchText?: string;
}

export interface EditGroupPolicyForm {
  id: number;
  status: boolean;
  name: string;
  description: string;
  policyIds: {
    id: number;
    name: string;
    action: string;
    resource: string;
    actionAbility: string;
  }[];
}

export interface IEditGroupPolicy {
  id: number;
  status: GroupPolicyStatus;
  name: string;
  description: string;
  policyIds: number[];
}

export interface IGroupPolicy {
  id: number;
  key: string;
  name: string;
  description: string;
  createdAt: string;
  status: GroupPolicyStatus;
  type: GroupPolicyType;
  policies: {
    id: number;
    name: string;
    action: string;
    resource: string;
    actionAbility: string;
  }[];
}

export interface IResGroupPolicies {
  items: IGroupPolicy[];
  meta: {
    itemCount: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}
export interface IResPolicies {
  items: {
    id: number;
    name: string;
    action: string;
    resource: string;
    actionAbility: string;
  }[];
  meta: {
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export type CreateGroupPolicyForm = {
  name: string;
  description: string;
  policyIds: number[];
};

export interface IGroupPolicyCallback {
  onSuccess: VoidFunction;
  onError: VoidFunction;
}

export type GroupPolicyStatus = 'ACTIVE' | 'IN_ACTIVE';

export type GroupPolicyType = 'COMMON' | 'ADMIN' | 'MERCHANT';
