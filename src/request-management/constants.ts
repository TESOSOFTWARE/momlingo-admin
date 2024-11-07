export const defaultValuesSpoonCode = {
  productGroup: '',
  weight: 0,
  quantity: '',
  spoonType: '',
  useDate: '',
  type: 'SPOON',
};

export const defaultValuesSBPSCode = {
  code: '',
  quantity: 0,
  isActive: false,
  useDate: '',
  type: 'SBPS',
};

export const DEFAULT_PAGE_SIZE = 1;
export const DEFAULT_LIMIT_SIZE = 20;
export const TYPE_REQUEST = {
  spoon: 'SPOON',
  sbps: 'SBPS',
};

export const TABLE_HEAD = [
  {
    id: 'id',
    label: 'ID',
    align: 'left',
  },
  {
    id: 'code',
    label: 'Mã QR',
    align: 'left',
  },
  {
    id: 'createdAt',
    label: 'Thời gian sản xuất',
    align: 'left',
  },
  {
    id: 'type',
    label: 'Loại',
    align: 'left',
  },
  {
    id: 'is_active',
    label: 'Active',
    align: 'left',
  },
  {
    id: 'status',
    label: 'Trạng thái',
    align: 'left',
  },
];

export const DEFAULT_VALUE_FILTER_QR_CODE = {
  textSearch: '',
  startDate: null,
  endDate: null,
};

export enum SpoonType {
  M11 = 'M11',
  M8 = 'M8',
  M12 = 'M12',
}
