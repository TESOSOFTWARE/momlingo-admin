import { EnumRequiredNote } from './interface';
export const TABLE_HEAD_PHYSICAL = [
  { id: 'thumbnail', label: '' },
  { id: 'name', label: 'Sản phẩm', align: 'center' },
  { id: 'quantity', label: 'Số lượng', align: 'center' },
  { id: 'point', label: 'Giá xu', align: 'center' },
  { id: 'price', label: 'Giá tiền', align: 'center' },
  { id: 'total', label: 'Tổng tiền', align: 'center' },
  { label: '' }
];

export const TABLE_HEAD_VOUCHER = [
  // { id: 'thumbnail', label: '' },
  { id: 'name', label: 'Sản phẩm', align: 'center' },
  { id: 'quantity', label: 'Số lượng', align: 'center' },
  // { id: 'point', label: 'Giá xu', align: 'center' },
  { id: 'transId', label: 'Transaction Id', align: 'center' },
  { id: 'status', label: 'Trạng thái', align: 'center' },
  { id: 'usedTime', label: 'Thời gian sử dụng mã', align: 'center' },
  { id: 'exp', label: 'Hạn sử dụng mã', align: 'center' },
  // { id: 'option', label: '' }
];

export const Required_Note = [
  { value: 'CHOTHUHANG', label: 'Cho Xem Hàng' },
  { value: 'CHOXEMHANGKHONGTHU', label: 'Cho Xem Hàng Không Thử' },
  { value: 'KHONGCHOXEMHANG', label: 'Không Cho Xem Hàng' }
];

export const defaultDelivery = {
  to_name: '',
  to_phone: '',
  to_address: '',
  to_ward_name: '',
  to_district_name: '',
  to_province_name: '',
  weight: 0,
  length: 0,
  width: 0,
  height: 0,
  service_id: 0,
  payment_type_id: 0,
  required_note: Required_Note[0].value,
  items: [
    {
      name: '',
      quantity: 0,
      code: '',
      price: 0,
      length: 0,
      width: 0,
      height: 0
    }
  ],
  name: '',
  quantity: 0
};

export const DEFAULT_REFUND_FORM ={
  refundPoint: 0,
  content: '',
}