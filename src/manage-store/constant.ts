export const HEAD_LABELS = [
  {
    id: 'id',
    label: 'ID',
    align: 'center',
  },
  {
    id: 'code',
    label: 'Mã cửa hàng',
    align: 'center',
  },
  {
    id: 'name',
    label: 'Tên cửa hàng',
    align: 'left',
  },
  {
    id: 'address',
    label: 'Địa chỉ',
    align: 'left',
  },
  {
    id: 'phone',
    label: 'Số điện thoại',
    align: 'left',
  },
  {
    id: 'referral_code',
    label: 'Mã giới thiệu',
    align: 'center',
  },
  {
    id: 'count_enter_referral',
    label: 'Số lượng user nhập mã giới thiệu',
    align: 'center',
  },
  {
    id: 'count_enter_accumulated_point',
    label: 'Số lượng user tích xu',
    align: 'center',
  },
  {
    id: '',
    label: 'Tùy chọn',
    align: 'center',
  },
];

export const DETAIL_HEAD_LABELS = [
  {
    id: 'id',
    label: 'ID',
    align: 'center',
  },
  {
    id: 'phone_customer',
    label: 'SĐT khách hàng',
    align: 'left',
  },
  {
    id: 'name',
    label: 'Tên khách hàng',
    align: 'left',
  },
  {
    id: 'time_input_code',
    label: 'Thời gian nhập mã giới thiệu',
    align: 'center',
  },
  {
    id: 'lastScanPoint',
    label: 'Thời gian tích điểm đầu tiên',
    align: 'center',
  },
];
export const dataListStore = [
  {
    id: 1,
    code: 'code1123',
    name: 'test1',
    address: 'address1',
    phone: '0525489657',
    referral_code: 'ABC1324',
    count_enter_referral: 12,
    count_accumulated_point: 24,
  },
  {
    id: 2,
    code: 'code3453',
    name: 'test2',
    address: 'address2',
    phone: '0985247896',
    referral_code: 'ABC3445',
    count_enter_referral: 23,
    count_accumulated_point: 67,
  },
  {
    id: 3,
    code: 'code7896',
    name: 'test3',
    address: 'address3',
    phone: '0789456123',
    referral_code: 'ABC8954',
    count_enter_referral: 45,
    count_accumulated_point: 90,
  },
];

export const dataHistoryReferralHistory = [
  {
    id: 1,
    phone: '0985214785',
    status: 'ON',
    status_first_point: 'SUCCESS',
    time_encode: '26/03/2023 13:30',
    time_first_points: '26/03/2023 14:30',
  },
  {
    id: 2,
    phone: '0232145698',
    status: 'OFF',
    status_first_point: 'SUCCESS',
    time_encode: '27/03/2023 14:30',
    time_first_points: '26/03/2023 15:30',
  },
  {
    id: 3,
    phone: '0123456789',
    status: 'ON',
    status_first_point: 'SUCCESS',
    time_encode: '28/03/2023 14:10',
    time_first_points: '29/03/2023 15:20',
  },
];

export const typeSearch = [
  {
    label: 'NAME',
    value: 'NAME',
  },
  {
    label: 'PHONE',
    value: 'PHONE',
  },
];
