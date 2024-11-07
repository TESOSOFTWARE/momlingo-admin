export const DEFAULT_PAGE_SIZE = 5;
export const DEFAULT_LIMIT_SIZE = 20;

export const GROUP_USER_TABLE_HEAD = [
  {
    id: 'id',
    label: 'ID',
    align: 'left',
  },
  {
    id: 'name',
    label: 'Họ và tên',
    align: 'left',
  },
  {
    id: 'desc',
    label: 'Mô tả',
    align: 'left',
  },
  {
    id: 'status',
    label: 'Trạng thái',
    align: 'left',
  },
  {
    id: '',
    label: 'Tùy chọn',
    align: 'center',
  },
];

export const DEFAULT_VALUE_GROUP_USER = {
  nameGroup: '',
  description: '',
  status: false,
  ids: [],
  isCheckAll: false,
};

export enum GroupUserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'BANNED',
}
export enum UserRank {
  MEMBER = 'MEMBER',
  TITAN = 'TITAN',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM',
}

export const PICK_USER_TABLE_HEAD = [
  {
    id: 'name',
    label: 'Họ và tên',
    align: 'left',
  },
  {
    id: 'phoneNumber',
    label: 'Số điện thoại',
    align: 'left',
  },
  {
    id: 'username',
    label: 'Email',
    align: 'left',
  },
  {
    id: 'rank',
    label: 'Hạng thành viên',
    align: 'center',
  },
  {
    id: 'birth',
    label: 'Ngày sinh',
    align: 'left',
  },
  {
    id: 'status',
    label: 'Trạng thái tài khoản',
    align: 'center',
  },
  {
    id: 'blockAccount',
    label: 'Trạng thái tích xu',
    align: 'center',
  },
];
