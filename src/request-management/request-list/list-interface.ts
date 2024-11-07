export interface IResRequest {
  items: IFormRequest[];
  meta: {
    [key in string]: number;
  };
}
export type ILimitSpoonCodeCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};
export interface IFormRequest {
  id: number;
  name: string;
  approvedDate: string | null;
  addPointCodeQuantity: number;
  status: string;
  codeQuantityCreated: number | null;
  rejectDescription: string | null;
  productGroup: string;
  type: string;
  description: string;
  weight: number;
  manufactureDate: string;
  isAcitve: boolean;
  accRequestId: number | null;
  nameUserRequest: string;
  accApproveId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  version: number;
}

export interface IPropsTableRow {
  row: IFormRequest;
}

export interface IListRequestParams {
  page: number;
  limit: number;
  name?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  type?: string | null;
  productGroup?: string | null;
  status?: string | null;
  code?: string | null;
}

export interface ISearchRequest {
  name?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  type?: string | null;
  productGroup?: string | null;
  status?: string | null;
  code?: string | null;
}

export interface ISliceForm {
  searchForm: ISearchRequest;
  isExport: boolean;
  id: number;
  isLoading: boolean;
  exportSuccess: boolean;
  nameFile: string;
}

export enum FactoryName {
  Aiwa = 'Aiwado',
}

export enum renderNameFactory {
  Aiwa = 'Aiwa',
}

export interface IFormExport {
  fileId: string;
}
export interface IstatusListRequest {
  [key: string]: string;
}
