export const GAME_GIFT_TABLE_HEAD = [
  {
    id: 'id',
    label: 'ID',
    align: 'center',
  },
  {
    id: 'name',
    label: 'Tên giải thưởng',
    align: 'left',
  },
  {
    id: 'ordinal',
    label: 'Thứ tự ưu tiên',
    align: 'center',
  },
  {
    id: 'status',
    label: 'Trạng thái',
    align: 'center',
  },
  {
    id: 'startDate',
    label: 'Ngày bắt đầu',
    align: 'center',
  },
  {
    id: 'endDate',
    label: 'Ngày kết thúc',
    align: 'center',
  },
  {
    id: '',
    label: 'Tùy chọn',
    align: 'center',
  },
];

export enum TypeGameConstraints {
  DEFAULT = 'DEFAULT',
  ALLOCATION = 'ALLOCATION',
  PROVINCE = 'PROVINCE',
}

export const DEFAULT_CONSTRAINTS = [
  {
    value: TypeGameConstraints.DEFAULT,
    name: 'Giải tỉnh thành ngẫu nhiên',
  },
  {
    value: TypeGameConstraints.ALLOCATION,
    name: 'Giải chỉ định người dùng may mắn',
  },
  {
    value: TypeGameConstraints.PROVINCE,
    name: 'Giải chỉ định theo tỉnh thành',
  }
]

export const DEFAULT_TYPE_PRIZE = [
  {
    label: 'Giải có sẵn',
    value: 'prizeAvailable',
  },
  {
    label: 'Nhập giải thưởng',
    value: 'prizeInput',

  }
]

export const DEFAULT_VALUE_GAME_GIFT= {
  constraintPhoneNumber: [],
  constraintProvince: [],
  type: TypeGameConstraints.DEFAULT,
  gameGiftProvinceQuantities: [],
  gameGiftProvinceConstraints: [],
  gameGiftAllocationConstraints: [],
  productId: null,
  productVariantId: null,
  startDate: null,
  endDate: null,
  isWinnable: false,
  status: false,
  ordinal: 0,
  posInImage:0,
  isWonMultiple:false,
        winRate:0,
  quantity: 0,
  gameId: 0,
  name: '',
  typePrize: 'prizeAvailable',
}

