import { IFilterOption } from '../winning-history/interface';

export const TABLE_HEAD = [
  {
    id: 'name',
    label: 'Tên',
    align: 'left',
  },
  {
    id: 'description',
    label: 'Mô tả',
    align: 'left',
  },
  {
    id: 'status',
    label: 'Trang thái',
    align: 'center',
  },

  {
    id: 'code',
    label: 'Thứ hạng tiếp theo',
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
