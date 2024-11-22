import i18n from '../../common/locales/i18n';

export const HEAD_LABELS = [
  { id: 'id', label: 'ID', align: 'left' },
  { id: 'name', label: i18n.t('event.list.table.header.name'), align: 'left' },
  { id: 'name', label: i18n.t('event.list.table.header.product'), align: 'left' },
  { id: 'startDate', label: i18n.t('event.list.table.header.startDate'), align: 'left' },
  { id: 'endDate', label: i18n.t('event.list.table.header.endDate'), align: 'left' },
  { id: 'status', label: i18n.t('event.list.table.header.status'), align: 'center' },
  { id: 'action', label: 'Tùy chọn', align: 'center' },
];

export enum TypeEvent {
  FIRST_SCAN = 'FIRST_SCAN',
  SECOND_SCAN = 'SECOND_SCAN',
}

export enum TypeEventReward {
  PERCENT_POINT = 'PERCENT_POINT',
  AMOUNT_POINT = 'AMOUNT_POINT',
  // COUPON = 'COUPON',
}

export const DEFAULT_VALUE_SEARCH_EVENT = {
  searchText: '',
};

export const DEFAULT_VALUES_EVENT = {
  name: '',
  startDate: null,
  endDate: null,
  systemConfigPointIds: [],
  type: '',
  eventReward: {
    type: '',
    value: 0,
  },
};
