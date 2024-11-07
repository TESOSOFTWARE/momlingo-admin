import { IUser } from '../user-management/interfaces';

export interface IResListHistoryScan {
  items: IHistoryScan[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}
export interface IHistoryScan {
  id: number;
  code: string;
  scanDate: string;
  status: string;
  scanPoint: number;
  userHistoryPoint: string;
  systemConfigPoint: {
    id: number;
    code: string;
    point: number;
    type: string;
    description: string;
    isActive: boolean;
    productGroup: string;
    weight: number;
  };
  user?: {
    id: number;
    type: string;
    customer: IUser;
  };
}

export interface IListHistoryScanParams {
  page?: number;
  limit?: number;
  startDate?: string | null;
  endDate?: string | null;
  productGroup?: string;
  status?: string;
  code?: string;
  userId?: number;
  type?: string;
}

export interface IPropsTableRow {
  row: IHistoryScan;
}

export interface IParamsDuplicateScan {
  page?: number;
  limit?: number;
  searchText?: string;
  startDate?: string | null;
  endDate?: string | null;
  phoneNumber?: string;
}

export interface IResDuplicateScan {
  items: IDuplicateScan[];
  total: number;
}
export interface IDuplicateScan {
  code: string;
  createdAt: string;
  id: number;
  status: string;
  phoneNumber: string;
  unBLockScanDup: boolean;
}

export interface IPropsDuplicateTableRow {
  row: IDuplicateScan;
  isRefetching?: boolean;
}

export interface IParamsActiveCode {
  id?: number;
  data: {
    isUnBLock?: boolean;
  };
}
export interface IEditDuplicateScan {
  phoneNumber?: any;
}

export interface ICallback {
  onSuccess?: VoidFunction;
  onError?: VoidFunction;
}

export interface IFilterOption {
  label: string;
  value: string;
}
