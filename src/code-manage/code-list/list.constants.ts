export const HEAD_TABLE_PROPS = [
  { id: 'code', label: 'Code', align: 'center' },
  { id: 'useTime', label: 'Use Time', align: 'center' },
  { id: 'createdAt', label: 'Create At', align: 'center' },
  { id: 'status', label: 'Status', align: 'center' },
  { label: '' },
];

export const Search_Type = [
  { value: undefined, label: 'ALL' },
  { value: 'PHONE_NUMBER', label: 'Phone Number' },
  { value: 'GIFT_NAME', label: 'Gift Name' },
  { value: 'EVENT_ID', label: 'Event Id' },
  { value: 'CODE', label: 'Code' },
];

export const defaulValuesSearchCode = {
  searchText: undefined,
  searchType: undefined,
  startDate: null,
  endDate: null,
  status: undefined,
  type: undefined,
  code: undefined,
};

export const defaulValuesTypeSeacrch = {
  searchText: '',
  searchType: 'All',
  startDate: null,
  endDate: null,
  status: 'ALL',
};
