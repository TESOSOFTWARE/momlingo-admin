import { IFilterOption } from '../winning-history/interface';

export const TABLE_HEAD = [
  {
    id: 'image',
    label: 'Hình ảnh',
    align: 'left',
  },
  {
    id: 'name',
    label: 'Tên',
    align: 'left',
  },
  {
    id: 'startDate',
    label: 'Ngày bắt đầu',
    align: 'center',
  },
  {
    id: 'endDate',
    label: 'Ngày kết thúc',
    align: 'center',
  },
  {
    id: 'gameType',
    label: 'Loại trò chơi',
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
export const TYPE_CODE: IFilterOption[] = [
  {
    label: '',
    value: '',
  },
  {
    label: 'MEMBER',
    value: 'MEMBER',
  },
  {
    label: 'TITAN',
    value: 'TITAN',
  },
  {
    label: 'GOLD',
    value: 'GOLD',
  },
  {
    label: 'PLATINUM',
    value: 'PLATINUM',
  },
];

export const nextCodeTierRank: { [key: string]: string } = {
  MEMBER: 'TITAN',
  TITAN: 'GOLD',
  GOLD: 'PLATINUM',
  PLATINUM: 'Không có',
};
