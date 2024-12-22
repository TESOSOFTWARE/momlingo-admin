import { IStatusAccount } from './interfaces';

export const DEFAULT_VALUE_SEARCH_USER = {
  name: '',
  phoneNumber: '',
  email: '',
  tierCode: '',
  accountStatus: '',
};

export const DEFAULT_VALUE_SEARCH_INTRODUCE = {
  referrerName: '',
  phoneNumber: '',
  minReferralDate: null,
  maxReferralDate: null,
};

export const DEFAULT_PAGE_SIZE = 5;
export const DEFAULT_LIMIT_SIZE = 20;

export const USER_TABLE_HEAD = [
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
    id: 'email',
    label: 'Email',
    align: 'left',
  },
  {
    id: 'role',
    label: 'Quyền',
    align: 'center',
  },
  // {
  //   id: 'birth',
  //   label: 'Ngày sinh',
  //   align: 'left',
  // },

  // {
  //   id: 'lastLogin',
  //   label: 'Ngày truy cập gần nhất',
  //   align: 'center',
  // },
  // {
  //   id: 'lastCoin',
  //   label: 'Ngày tích xu cuối',
  //   align: 'left',
  // },
  {
    id: 'status',
    label: 'Trạng thái tài khoản',
    align: 'center',
  },
  // {
  //   id: 'blockAccount',
  //   label: 'Trạng thái tích xu',
  //   align: 'center',
  // },
  {
    id: '',
    label: 'Tùy chọn',
    align: 'center',
  },
];
export const INTRODUCE_USER_TABLE_HEAD = [
  {
    id: 'name',
    label: 'Người giới thiệu',
    align: 'left',
  },
  {
    id: 'phoneNumber',
    label: 'Số điện thoại',
    align: 'left',
  },
  {
    id: 'nameIntroduced',
    label: 'Người được giới thiệu',
    align: 'left',
  },
  {
    id: 'phoneIntroduced',
    label: 'Số điện thoại',
    align: 'center',
  },
  {
    id: 'time',
    label: 'Thời gian',
    align: 'left',
  },
  {
    id: 'introducedIsCoin',
    label: 'Tích xu',
    align: 'left',
  },
];
export const DATA_LIST_USER = [
  {
    id: 1,
    name: 'Nguyen Van A',
    phoneNumber: '104124124',
    email: 'sonicsay21@gmail.com',
    tierCode: 'Platinum',
    lastScanDate: '2023-03-02T17:00:00.000Z',
    lastVisited: '2023-03-02T17:00:00.000Z',
    status: 'ACTIVE',
    blockAccount: false,
    address: '',
    birthDate: '03/05/2001',
    userPoint: {
      totalPoints: 0,
    },
  },
];
export const DEFAULT_VALUE_USER_BY_ID = {
  id: 0,
  name: '',
  phoneNumber: '',
  email: '',
  status: '',
  address: '',
  provinceId: {
    id: 0,
    name: '',
  },
  districtId: {
    id: 0,
    name: '',
  },
  wardId: {
    id: 0,
    name: '',
  },
  birthDate: '',
  tierCode: '',
  lastScanDate: '',
  lastVisitDate: '',
  lackRankPoint: 0,
  totalPoints: 0,
  blockAccount: false,
  createdAt: '',
  gender: '',
  blockAddPoint: false,
};

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED',
}
export enum UserRank {
  MEMBER = 'MEMBER',
  TITAN = 'TITAN',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM',
}

export const StatusAccountProps: IStatusAccount = {
  ACTIVE: {
    name: 'Hoạt động',
    color: 'green',
  },
  INACTIVE: {
    name: 'Khóa',
    color: 'red',
  },
};

export const USER_STATUS = [
  {
    name: 'Hoạt động',
    value: UserStatus.ACTIVE,
  },
  {
    name: 'Khóa',
    value: UserStatus.BLOCKED,
  },
];

export enum UserGender {
  MALE = 'male',
  FEMALE = 'female',
}

export const TYPE_GENDER = [
  {
    label: 'Nam',
    value: UserGender.MALE,
  },
  {
    label: 'Nữ',
    value: UserGender.FEMALE,
  },
];
