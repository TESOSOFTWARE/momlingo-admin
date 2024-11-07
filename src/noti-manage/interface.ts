import { CustomFile } from '../common/components/upload';

export interface INotiForm {
  id: number;
  title: string;
  content: string;
  timeSent: string;
  type: string;
  senderId: number;
  metaData: any;
  routeType?: string;
  link_mobile?: string;
  link_web?: string;
  deepLink?: string;
  groupUserIds: number[];
  shortContent: string;
  source: string;
  notiToUserGroups: INotiToUserGroups[];
  sfNotiCustomers: ISfNotiCustomers[];
}
export interface ISfNotiCustomers{
  id: number;
  campaignMemberId: string;
  notiId: number;
  customerId: number;
}

export interface INotiToUserGroups {
  id:number;
  notiId: number;
  userGroupId: number;
  noti: any;
  userGroup: {
    id: number;
    name: string;
    description: string;
    status: string;
    ownerId: number;
  };
}
export interface INotifications {
  source: string;
  id: number;
  title: string;
  content: string;
  timeSent: string;
  type: string;
  senderId: number;
  metaData: any;
  shortContent: string;
}
export type ICallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export interface IResNotifications {
  items: INotifications[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface IParams {
  page?: number;
  limit?: number;
}
export interface IPropsTableRow {
  row: INotifications;
  selected: boolean;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
  onEditRow: VoidFunction;
}

export type StateProps = {
  confirmModal: {
    callback: VoidFunction;
    isOpen: boolean;
    text: string;
  };
  searchPoliciesText: string;
  isOpenModal: boolean;
  selectedRowId: number[];
};

export interface IDataDelete {
  ids: number[];
}

export interface IResRoute {
  // [key: string]:{
  name: string;
  route: string;
  // }
}

export interface IDataFormCreateNoti {
  groupUserIds: number[];
  title: string;
  content: string;
  deepLink?: string;
  timeSent: string;
  type: string;
  shortContent: string;
}

export interface IDataFormEditNoti {
  id?: number;
  data: {
    groupUserIds: number[];
    title: string;
    content: string;
    deepLink?: string;
    timeSent: string;
    type: string;
    shortContent: string;
  };
}

export interface IPropsSaleForceTable {
  row: ISfNotiCustomers;
}