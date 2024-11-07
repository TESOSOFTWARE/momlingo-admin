import { CodeStatus } from '../code-common/interface';

export interface IPropsTableRow {
  row: IFormCode;
  selected: boolean;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
  onEditRow: VoidFunction;
}

export interface IFormCode {
  code: string;
  status: CodeStatus;
  useTime: number;
  createdAt: string;
}

export interface IResCode {
  items: [IFormCode];
  meta: {
    itemCount: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface ICodeParams {
  searchText?: string;
  searchType?: string;
  status?: CodeStatus;
  startDate?: String;
  page?: number;
  limit?: number;
}

export interface ISearchForm {
  searchText: string | undefined;
  searchType: string | undefined;
  status?: CodeStatus | string | undefined;
  startDate?: string | null;
  endDate?: string | null;
}

export interface ISearchData {
  searchText: string | undefined;
  searchType: string | undefined;
  status?: string | undefined;
  startDate?: string | null;
  endDate?: string | null;
}
