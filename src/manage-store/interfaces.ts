import { IUser } from '../user-management/interfaces';

export interface IFormFilter {
  from: string | null;
  to: string | null;
  name: string | null;
  phoneNumber: string | null;
}

export interface ISubmitCreateStore {
  id?: number;
  code: string;
  name: string;
  address: string;
  phoneNumber: string;
  status: string;
  referralCode: string;
  isActive?: boolean;
}

export interface IDataHistoryReferralHistory {
  id: number;
  phone: string;
  status: string;
  status_first_point: string;
  time_encode: string;
  time_first_points: string;
}

// interface list

export interface ICustomParams {
  from?: string | null;
  to?: string | null;
  name?: string | null;
  phoneNumber?: string | null;
}

export interface IParamsFilter {
  page: number;
  limit: number;
  from?: string;
  to?: string;
  name?: string;
  phoneNumber?: string;
}

export interface IResGetListExternalReferrer {
  items: IExternalReferrerItem[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface IExternalReferrerItem {
  id: number;
  type: string;
  status: string;
  code: string;
  referralCode: string;
  address: string;
  phoneNumber: string;
  name: string;
  totalUser: number;
  totalUserScanned: number;
}

export interface IExternalReferrerDetail {
  id: number;
  type: string;
  status: string;
  code: string;
  referralCode: string;
  address: string;
  phoneNumber: string;
  name: string;
  externalReferrerHistories: IExternalReferrerHistories[];
}

export interface IExternalReferrerHistories {
  id: number;
  createdAt: string;
  referrer: any;
  user: {
    id: number;
    type: string;
    customer: IUser;
  };
  firstScan: {
    id: number;
    point: number;
    createdAt: string;
    type: string;
  };
}
export interface IHistoriesExternalTableRow {
  row: IExternalReferrerHistories;
}

export interface IExternalHistoryParams {
  externalReferrerId: number;
  page?: number;
  limit?: number;
}

export interface IResExternalHistory {
  items: IExternalReferrerHistories[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}
