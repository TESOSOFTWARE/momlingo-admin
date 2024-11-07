export type StateProps = {};

export interface IFormCreateSpoon {
  productGroup: string;
  weight: number | null;
  quantity: string;
  useDate: string;
  type?: string;
  spoonType: string;
}

export interface IFormParamsCreateSpoon {
  productGroup: string;
  weight: number | null;
  quantity: number;
  useDate: string;
  type?: string;
  spoonType: string;
}

export interface IFormCreateSBPS {
  productGroup: string;
  weight: number | null;
  quantity: number;
  isActive: boolean;
  useDate: string;
  type?: string;
  code?: string;
}

export type IQRCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export interface IParamsRequest {
  page?: number;
  limit?: number;
  weight?: number | null;
  productGroup?: string;
  type?: string;
}

export interface IProductGroup {
  productGroup: string;
}

export interface IWeight {
  weight: string;
}

export interface ICodeSBPS {
  code: string;
}

export interface IDataProductGroup {
  items: IProductGroup[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface IDataWeight {
  items: IWeight[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface IDataCodeSBPS {
  items: ICodeSBPS[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface IListQRCodeParams {
  page: number;
  limit: number;
  searchText?: string;
  startDate?: string | null;
  endDate?: string | null;
}

export interface IResListQRCode {
  id: number;
  code: string;
  createdAt: string;
  useDate: string;
  expiry_date: string;
  type: string;
  is_active: boolean;
  status: string;
}

export interface IResData {
  total: number;
  items: IResListQRCode[];
}

export interface IFormExport {
  // fileId: number
  fileId: number;
}

export interface IParamsChangeStatus {
  ids: number[];
  isActive: boolean | null;
}

export interface ICallback {
  onSuccess: VoidFunction;
  onError: VoidFunction;
}

export interface IParamsSearch {
  textSearch: string;
  startDate: string | null;
  endDate: string | null;
}
