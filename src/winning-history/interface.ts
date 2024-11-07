export interface IHeadType {
  id: string;
  label: string;
}

export interface IDataTest {
  id: string;
  user: string;
  phone: string;
  gift: string;
  time: string;
  code: string;
}

export interface IFilterOption {
  label: string;
  value: string;
}

export interface IFormFilter {
  filterOption: string;
  textSearch: string;
}

export type StateProps = {
  textSearch: string;
  filterOption: string;
};

export interface IParamsListHistory {
  page: number;
  limit: number;
  searchText?: string;
  searchType?: string;
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
}

export interface IDataListHistory {
  id: number;
  eventGiftId: number;
  giftId: 0;
  gift: {
    id: number;
    name: string;
  };
  eventCode: {
    code: string;
    event: {
      merchant: {
        id: number;
        name: string;
        email: string;
        phoneNumber: 'string';
      };
      eventCode: {
        expiresAt: string;
      };
    };
  };
}
