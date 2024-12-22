export interface IResListUser {
  meta?: any;
  items?: IUser[];
}
export interface IResListUserIntroduce {
  items: IIntroduceUser[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}
export interface IUser {
  id: number;
  name: string;
  province: {
    id: number;
    name: string;
  } | null;
  ward: {
    id: number;
    name: string;
  } | null;
  district: {
    id: number;
    name: string;
  } | null;
  role?: string;
  phoneNumber: string;
  email: string;
  status: string;
  address: string;
  birthDate?: string;
  tierCode: string;
  lastScanDate?: string;
  lastVisitDate?: string;
  lackRankPoint?: number;
  userPoint: IUserPoint;
  blockAccount: boolean;
  createdAt?: string;
  gender?: string;
  avatar?: string;
  user?: string;
  userId: number;
  blockAddPoint?: boolean;
}
export interface IUserPoint {
  totalPoints: number;
}

export interface IPropsTableRow {
  row: IUser;
  selected?: boolean;
  onSelectRow?: (checked: boolean) => void;
}
export interface IProvinceParams {
  type: string;
  parentId?: number;
  searchText?: string;
  page?: number;
  limit?: number;
}
export interface IResProvince {
  items: IProvince[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}
export interface IProvince {
  id: number;
  name: string;
  type?: string;
  parentId: number;
}
export interface IIntroduceUser {
  id: number;
  createdAt: string;
  referrer: {
    customer: {
      name: string;
      phoneNumber: number;
      email: string;
      tierPoint: number;
    };
  };
  beReferred: {
    customer: {
      name: string;
      phoneNumber: number;
      email: string;
    };
  };
}
export interface IPropsTableRowIntroduceUser {
  row: IIntroduceUser;
  selected?: boolean;
  onSelectRow?: (checked: boolean) => void;
}
export interface IListUserParams {
  page?: number;
  limit?: number;
  name?: string | null;
  phoneNumber?: string | null;
  tierCode?: string | null;
  email?: string | null;
  accountStatus?: string | null;
}

export interface ISearchUser {
  name?: string | null;
  phoneNumber?: string | null;
  tierCode?: string | null;
  email?: string | null;
  accountStatus?: string | null;
}
export interface ISearchUserIntroduced {
  referrerName?: string | null;
  phoneNumber?: string | null;
  minReferralDate?: string | null;
  maxReferralDate?: string | null;
}
export interface IListUserIntroduceParams extends ISearchUserIntroduced {
  page?: number;
  limit?: number;
}
export interface IStatusAccount {
  [key: string]: {
    name: string;
    color: string;
  };
}

export type ICallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export interface IParamsChangeBlockAccount {
  id: number;
  blockAddPoint?: boolean;
  phoneNumber?: string;
  blockAccount?: boolean;
  totalPoints?: number;
}

export interface IParamsEditUser {
  id: number;
  data: {
    name: string | null;
    email: string | null;
    gender: string | null;
    address?: string | null;
    birthDate?: string | null;
    tierCode?: string | null;
    blockAccount?: boolean;
    blockAddPoint?: boolean;
    totalPoints?: number;
  };
}

export interface IFormEditUser {
  id: number;
  name: string | null;
  phoneNumber: string | null;
  email: string | null;
  status: string | null;
  address: string | null;
  provinceId: {
    id: number;
    name: string;
  } | null;
  wardId: {
    id: number;
    name: string;
  } | null;
  districtId: {
    id: number;
    name: string;
  } | null;
  birthDate?: string | null;
  tierCode: string | null;
  lastScanDate?: string;
  lastVisitDate?: string;
  totalPoints?: number | null;
  blockAccount?: boolean;
  createdAt?: string | null;
  gender?: string | null;
  blockAddPoint?: boolean;
}
