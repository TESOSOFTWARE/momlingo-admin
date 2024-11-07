export interface IParamsStatisticScan {
  startDate?: string | null;
  endDate?: string | null;
  provinceKeys?: any;
}
export interface IFormSearchStatisticScan {
  startDate?: string | null;
  endDate?: string | null;
  provinceId?: number[];
}

export interface IResLineChart {
  data: {
    [key: string]: any;
    date: string;
    ALL: number;
  };
}

export interface IResCircleChart {
  data: {
    [key: string]: number;
  };
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

export interface IRequestExportParams {
  provinceId: number;
  startDate?: string | null;
  endDate?: string | null;
}

export type ICallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export interface IPropsTableRow {
  row: IResLineChart;
  ordinal: number;
}
