export const TABLE_HEAD = [
  {
    id: 'id',
    label: 'ID',
    align: 'left',
  },
  {
    id: 'name',
    label: 'Tên',
    align: 'left',
  },
  {
    id: 'phone',
    label: 'Số điện thoại',
    align: 'left',
  },
  {
    id: 'createdDate',
    label: 'Ngày góp ',
    align: 'left',
  },
  {
    id: 'type',
    label: 'Loại',
    align: 'left',
  },
  {
    id: 'rating',
    label: 'Số sao',
    align: 'center',
  },
  {
    id: 'content',
    label: 'Nội dung',
    align: 'center',
  },
];

export const typeFeedback: {
  [key: string]: string;
}[] = [
  {
    label: '',
    value: '',
  },
  {
    label: 'Tích xu',
    value: 'ADD_POINT',
  },
  {
    label: 'Đổi quà',
    value: 'EXCHANGE_GIFT',
  },
  {
    label: 'Vòng quay',
    value: 'WHEEL',
  },
];
export const typeFeedbackTable: {
  [key: string]: string;
} = {
  ADD_POINT: 'Tích xu',
  EXCHANGE_GIFT: 'Đổi quà',
  WHEEL: 'Vòng quay',
};
