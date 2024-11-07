export const headerCSVExport = [
  {
    label: 'Tên người dùng',
    key: 'user',
  },
  {
    label: 'Số điện thoại',
    key: 'phone',
  },
  {
    label: 'Giải nhận được',
    key: 'gameGiftName',
  },
  {
    label: 'Ngày trúng giải',
    key: 'createAt',
  },
  {
    label: 'Tên game',
    key: 'gameName',
  },
];

export const defaultValueFilter = {
  searchText: '',
  gameGiftId: undefined,
  startDate: undefined,
  endDate: undefined,
};

export const HEAD_TABLE_PROPS = [
  { id: 'user', label: 'Tên người dùng', align: 'center' },
  { id: 'phone', label: 'Số điện thoại', align: 'center' },
  { id: 'gameGiftName', label: 'Giải nhận được', align: 'center' },
  { id: 'createAt', label: 'Ngày trúng giải', align: 'center' },
  { id: 'gameName', label: 'Tên game', align: 'center' },
];
