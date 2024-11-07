import {
  IFilterOption,
  IHistoryScan,
  IListHistoryScanParams,
  IResListHistoryScan,
} from './interfaces';

export const HISTORY_SCAN_TABLE_HEAD = [
  {
    id: 'id',
    label: 'ID',
    align: 'center',
  },
  {
    id: 'spoonCode',
    label: 'Mã muỗng đã quét',
    align: 'left',
  },
  {
    id: 'phone',
    label: 'Tài khoản quét',
    align: 'center',
  },
  {
    id: 'productGroup',
    label: 'Sản phẩm đã quét',
    align: 'center',
  },
  {
    id: 'point',
    label: 'Số xu quét',
    align: 'center',
  },
  {
    id: 'status',
    label: 'Trạng thái',
    align: 'center',
  },

  {
    id: 'timeScan',
    label: 'Thời gian quét',
    align: 'center',
  },
];

const mockHistoryScans = [
  {
    id: 1,
    code: 'ABC123',
    scanDate: '2022-03-01T10:30:00Z',
    status: 'SUCCESS',
    scanPoint: 1,
    productGroup: 'Electronics',
    weight: 1.5,
  },
  {
    id: 2,
    code: 'DEF456',
    scanDate: '2022-03-02T15:45:00Z',
    status: 'SUCCESS',
    scanPoint: 2,
    productGroup: 'Clothing',
    weight: 0.8,
  },
  {
    id: 3,
    code: 'GHI789',
    scanDate: '2022-03-03T09:15:00Z',
    status: 'FAILED',
    scanPoint: 1,
    productGroup: 'Home and Garden',
    weight: 2.2,
  },
];

export const mockResListHistoryScan = {
  items: mockHistoryScans,
  meta: {
    totalItems: 3,
    itemCount: 3,
    itemsPerPage: 10,
    totalPages: 1,
    currentPage: 1,
  },
};
export const DEFAULT_VALUES_FILTER_HISTORY_SCAN: IListHistoryScanParams = {
  startDate: null,
  endDate: null,
  productGroup: '',
  status: '',
  code: '',
  userId: undefined,
};

export enum StatusHistoryScan {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export const DUPLICATE_SCAN_TABLE_HEAD = [
  {
    id: 'id',
    label: 'ID',
    align: 'center',
  },
  {
    id: 'spoonCode',
    label: 'Mã muỗng đã quét',
    align: 'center',
  },
  {
    id: 'phone',
    label: 'Tài khoản quét',
    align: 'center',
  },
  // {
  //   id: 'status',
  //   label: 'Trạng thái',
  //   align: 'center',
  // },

  {
    id: 'timeScan',
    label: 'Thời gian quét mã',
    align: 'center',
  },

  {
    id: 'action',
    label: 'Tùy chọn',
    align: 'center',
  },
];

export enum StatusDuplicateScan {
  FAILED = 'FAILED',
  SUCCESS = 'SUCCESS',
}

export const DEFAULT_VALUES_FILTER_DUPLICATE_SCAN = {
  startDate: null,
  endDate: null,
  searchText: '',
  phoneNumber: '',
};
export const filterOptions: IFilterOption[] = [
  {
    label: '',
    value: '',
  },
  {
    label: 'SPOON',
    value: 'SPOON',
  },
  {
    label: 'SBPS',
    value: 'SBPS',
  },
];
