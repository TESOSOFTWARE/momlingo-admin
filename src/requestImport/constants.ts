import { IStatusFile } from './interfaces';

export const TABLE_HEAD = [
  {
    id: 'id',
    label: 'ID',
    align: 'center',
  },
  {
    id: 'status',
    label: 'Trạng thái',  
    align: 'center',
  },
  {
    id: 'resource',
    label: 'Resource',
    align: 'center',
  },
  {
    id: 'creatAt',
    label: 'Ngày nhập',
    align: 'center',
  },
  {
    id: '',
    align: 'center',
    label: 'Tùy chọn',
  },
];

export const STATUS_FILE: IStatusFile = {
  WAITING: {
    name: 'Đang chờ',
    color: 'orange',
  },
  COMPLETED: {
    name: 'Thành công',
    color: 'green',
  },
  FAILED: {
    name: 'Thất bại',
    color: 'red',
  },
};
