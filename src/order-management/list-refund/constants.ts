export const REFUNDED_TABLE_HEAD = [
  { id: 'id', label: 'ID', align: 'center' },
  { id: 'phone', label: 'Số điện thoại', align: 'center' },
  { id: 'name', label: 'Tên khách hàng', align: 'left' },
  { id: 'time', label: 'Thời gian đặt hàng', align: 'center' },
  { id: 'refundCoin', label: 'Số xu hoàn ', align: 'center' },
  { id: 'timeRefund', label: 'Thời gian hoàn xu', align: 'center' },
  { id: 'type', label: 'Loại', align: 'center' },
  { id: '', label: 'Tùy chọn', align: 'center' },
];

export const DEFAULT_VALUE_SEARCH_REFUNDED_ORDER = {
  startDate: null,
  endDate: null,
  name: '',
  orderId: 0,
  type: '',
};

export const DEFAULT_REFUND_FORM_VALUE = {
  id: 0,
  phoneNumber: '',
  createdAtOrder: '',
  refundPoint: 0,
  refundDate: '',
  contentRefund: '',
  name: '',
  type: '',
};

export const DEFAULT_VALUE_EXPORT_REFUNDED_ORDER = {
  startDate: '',
  endDate: '',
  name: '',
  orderId: 0,
};

export const TYPE_REFUND = ['PHYSICAL', 'VOUCHER'];
