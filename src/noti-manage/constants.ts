import { IFilterOption } from '../winning-history/interface';

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
    id: 'src',
    label: 'Source',
    align: 'left',
  },
  {
    id: 'type',
    label: 'Loại',
    align: 'center',
  },
  {
    id: 'timeSent',
    label: 'Thời gian gửi',
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
export const TYPE_NOTI: IFilterOption[] = [
  {
    label: 'ADD_POINT',
    value: 'ADD_POINT',
  },
  {
    label: 'RANK',
    value: 'RANK',
  },
  {
    label: 'TRACK',
    value: 'TRACK',
  },
  {
    label: 'BIRTHDAY',
    value: 'BIRTHDAY',
  },
  {
    label: 'INFORMATION',
    value: 'INFORMATION',
  },
];

export enum TYPE_NOTIFICATION {
  ADD_POINT = 'ADD_POINT',
  RANK = 'RANK',
  TRACK = 'TRACK',
  BIRTHDAY = 'BIRTHDAY',
  INFORMATION = 'INFORMATION',
  SPEND_POINT = 'SPEND_POINT',
  REFUND_POINT = 'REFUND_POINT',
}

export const nextCodeTierRank: { [key: string]: string } = {
  MEMBER: 'TITAN',
  TITAN: 'GOLD',
  GOLD: 'PLATINUM',
  PLATINUM: 'Không có',
};

export const typeLink = [
  { label: 'Đường dẫn từ app', value: 'ROUTER' },
  { label: 'Đường dẫn từ web', value: 'DEEP_LINK' },
];

export const DEFAULT_FORM_CREATE_NOTI = {
  title: '',
  content: '',
  type: '',
  senderId: 0,
  routeType: typeLink[0].value,
  timeSent: '',
  link_mobile: '',
  link_web: '',
  deepLink: '',
  groupUserIds: [],
  shortContent: '',
  source: '',
};

export enum sourceType {
  INTERNAL= 'INTERNAL',
  SALE_FORCE = 'SALE_FORCE',
}

export const TABLE_SALE_FORCE_LABEL = [
  {
    id: 'id',
    label: 'ID',
    align: 'center',
  },
  {
    id: 'campID',
    label: 'CampaignMemberID',
    align: 'center',
  },
  {
    id: 'notiID',
    label: 'NotiID',
    align: 'center',
  },
  {
    id: 'customerID',
    label: 'CustomerID',
    align: 'center',
  },
  

]