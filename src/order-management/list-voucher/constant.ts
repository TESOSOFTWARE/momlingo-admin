export const TABLE_HEAD = [
  { id: 'id', label: 'Id đơn hàng', align: 'center' },
  { id: 'phone', label: 'Số điện thoại', align: 'center' },
  { id: 'createAt', label: 'Ngày đặt', align: 'center' },
  { id: 'expressDeliveryCode', label: 'Mã giao hàng', align: 'center' },
  { id: 'orderStatus', label: 'Trạng thái', align: 'center' },
  { label: '' }
];
export const TABLE_HEAD_ON_HOLD = [
  { id: 'id', label: 'Id đơn hàng', align: 'center' },
  { id: 'phone', label: 'Số điện thoại', align: 'center' },
  { id: 'createAt', label: 'Ngày đặt', align: 'center' },
  { id: 'expressDeliveryCode', label: 'Mã giao hàng', align: 'center' },
  { id: 'orderStatus', label: 'Trạng thái', align: 'center' },
  { label: '' },
  { label: '' }
];

export const OrderStatusLabel = [
  { label: 'All', value: undefined },
  { label: 'Processing', value: 'PROCESSING', color: '#2EA9FF' },
  { label: 'On Hold', value: 'ON_HOLD', color: '#7975A9' },
  { label: 'Completed', value: 'COMPLETED', color: '#00AB55' },
  { label: 'Cancelled', value: 'CANCELLED', color: '#FF9CB5' }
];

export const defaultValueFilter = {
  startDate: undefined,
  endDate: undefined,
  phone: undefined,
  orderId: undefined,
  status: undefined,
  userId: undefined,
  type: 'VOUCHER'
};
