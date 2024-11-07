export const TABLE_HEAD = [
  {
    id: 'image',
    label: 'Hình ảnh',
    align: 'left',
  },
  {
    id: 'title',
    label: 'Tiêu đề',
    align: 'left',
  },
  {
    id: 'router',
    label: 'Dẫn tới',
    align: 'left',
  },
  {
    id: 'ordinal',
    label: 'Ưu tiên',
    align: 'left',
  },
  {
    id: 'startDate',
    label: 'Ngày bắt đầu',
    align: 'left',
  },
  {
    id: 'endDate',
    label: 'Ngày kết thúc',
    align: 'left',
  },
  {
    id: 'status',
    label: 'Trạng thái',
    align: 'center',
  },
  {
    id: '',
    label: 'Tùy chọn',
    align: 'center',
  },
];
export const enum IStatus {
  ACTIVE = 'BẬT',
  IN_ACTIVE = 'TẮT',
}

export const typeLink = [
  { label: 'Đường dẫn từ app', value: 'ROUTER' },
  { label: 'Đường dẫn từ web', value: 'DEEP_LINK' },
];
