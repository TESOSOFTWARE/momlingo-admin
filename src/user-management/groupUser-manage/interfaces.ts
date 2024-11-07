export interface IParamsGroupUser {
  page?: number;
  limit?: number;
}

export interface ICallback {
  onSuccess: VoidFunction;
  onError: VoidFunction;
}

export interface IResListGroupUser {
  items: IGroupUser[];
  meta: {
    totalItems?: number;
    itemCount?: number;
    itemsPerPage?: number;
    totalPages?: number;
    currentPage?: number;
  };
}

export interface IGroupUser {
  id: number;
  name: string;
  ownerId?: number;
  status: string;
  description: string;
  userGroupToUsers: IUserGroupToUsers[];
}
export interface IUserGroupToUsers {
  userId: number;
  id: number;
  userGroupId: number;
}

export interface IGroupUserTableRow {
  row: IGroupUser;
  selected: boolean;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
  onEditRow: VoidFunction;
}

export interface IParamsDeleteMultiple {
  ids: number[];
}

export interface IFormCreateGroupUser {
  nameGroup?: string;
  description?: string;
  status?: boolean;
  ids?: number[];
  isCheckAll?: boolean;
}

export interface IDataFormGroupUser {
  name?: string;
  description?: string;
  status?: string;
  ids?: number[];
}

export interface IParamsEditGroupUser {
  id?: number;
  data?: IDataFormGroupUser;
}

export interface IDataFormGroupUserAll {
  groupName?: string;

  description?: string;
  status?: string;
  email?: string;
  phoneNumber?: string;
  accountStatus?: string;
  tierCode?: string;
  name?: string;
}

export interface IParamsEditGroupUserAll {
  id?: number;
  data?: IDataFormGroupUserAll;
}
