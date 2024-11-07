export interface IPropTableRow {
  row: IAgent;
  selected: boolean;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
  onEditRow: VoidFunction;
}

export interface ICallback {
  onSuccess: VoidFunction;
  onError: VoidFunction;
}

export enum EnumAvatarType {
  png = 'png',
  jpg = 'jpg',
  jpeg = 'jpge',
  pdf = 'pdf',
  mp3 = 'mp3',
  mp4 = 'mp4',
  wav = 'wav',
}

export enum EnumStatus {
  UNVERIFIED = 'UNVERIFIED',
  VERIFIED = 'VERIFIED',
  APPROVED = 'APPROVED',
  REFUSED = 'REFUSED',
  BLOCKED = 'BLOCKED',
}

export enum EnumRank {
  BASIC = 'BASIC',
}

export interface IAvatar {
  id: number;
  key: string;
  type: EnumAvatarType;
  size: number;
  uploaderId: number;
  url: string;
}

export interface IAgent {
  id: number;
  name: string | null;
  email: string;
  status: EnumStatus;
  address: string | null;
  phoneNumber: string | null;
  merchantId: number;
  avatar: IAvatar | null;
  user: number | null;
}

export interface IListAgent {
  items: IAgent[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface IListAgentParams {
  status?: EnumStatus | string;
  searchText?: string;
  page?: number;
  limit?: number;
}

export interface IListAgentSlice {
  dataFilter: IListAgentParams;
  isDeletePopup: boolean;
  idDelete: IDeleteId;
}

export interface IDeleteId {
  ids: number[];
}
