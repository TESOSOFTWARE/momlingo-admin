export interface IDataListHistory {
  id: number;
  gameGift: {
    id: number;
    name: string;
  };
  customer: {
    id: number;
    phoneNumber: string;
    name: string;
  };
  createdAt: string;
  game: {
    id: number;
    name: string;
  };
}

export interface IParamsListHistory {
  page?: number;
  limit?: number;
  gameGiftId?: number;
  searchText?: string;
  startDate?: string | null;
  endDate?: string | null;
}

export interface IResHistoryWinning {
  items: IDataListHistory[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
  links: {
    first: string;
    previous: string;
    next: string;
    last: string;
  };
}

export interface InitialState {
  dataSearch: IParamsListHistory;
  isOpenModalRequestExport: boolean;
}

export interface IPropTableRow {
  row: IDataListHistory;
}

export type ICallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};
