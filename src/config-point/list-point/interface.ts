export interface IPropsTableRow {
  row: IPoint;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
}

export interface IPoint {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  version: number;
  id: number;
  code: string;
  point: string;
  type: string;
  description: string | null;
  isActive: boolean;
  productGroup: string;
  weight: number;
}

export interface IPointParams {
  searchText?: string;
  type?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
}

export interface IListPoint {
  items: IPoint[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface IListSlice {
  filterCode: IDataSearch;
  isPopupDel: boolean;
  delPoint: IDeletePoint;
}

export interface IListFilter {
  searchText?: string;
  type: string | undefined;
  isActive: string | undefined;
}

export interface IDataSearch {
  searchText?: string;
  type: string | undefined;
  isActive: boolean | undefined;
}

export interface IDeletePoint {
  ids: number[];
}
