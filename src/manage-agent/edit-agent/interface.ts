export interface IAvatar {
  id: number;
  key: string;
  type: string;
  url: string;
  size: number;
}

export interface IGroupPolicy {
  id: number;
  name: string;
  key: string;
  description: string;
  userId: number;
  createdAt: string;
  status: string;
  type: string;
}

export interface IUser {
  id: number;
  type: string;
  groupPolicies: IGroupPolicy[];
}

export interface IDetailAgent {
  id: number;
  name: string | null;
  email: string;
  rank: string;
  status: string;
  address: string | null;
  phoneNumber: string | null;
  avatar: IAvatar | null;
  user: IUser;
}

export interface IShowAgent {
  id: number;
  name: string;
  email: string;
  rank: string;
  status: string;
  address: string;
  phoneNumber: string;
  avatar: IAvatar;
  policy: { label: string; value: number }[];
}
export enum EnumStatus {
  UNVERIFIED = 'UNVERIFIED',
  VERIFIED = 'VERIFIED',
  APPROVED = 'APPROVED',
  REFUSED = 'REFUSED',
  BLOCKED = 'BLOCKED',
}

export interface IEditAgent {
  id: number;
  status: EnumStatus | string;
  groupPolicyIds: number[];
}
