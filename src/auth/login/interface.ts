export type IAuth = {
  email: string;
  password: string;
};

export type ILoginCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export type FormValuesProps = {
  email: string;
};

export type IForgotPassword = {
  email: string;
};

export interface IResForgotPass {
  meta: {
    status: number;
    msg: string;
  };
  response: boolean;
}

export interface AdminProps {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatarUrl?: string;
  phoneNumber?: string;
  deviceId?: string;
  deviceToken?: string;
  deviceType?: string;
  role?: string;
  loginType?: string;
  lan?: string;
  gender?: string;
  createdAt?: Date;
  updatedAt?: Date;
  partner?: any;
  childrenAsMother?: any;
  childrenAsFather?: any;
  children?: any;
  accessToken: string;
}
export interface IResLogin {
  accessToken: string;
  refreshToken: string;
  user: AdminProps;
}

export interface IResInfo {
  isRootAccount: boolean;
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: number;
  address?: string;
  status: string;
  rank: string;
  createdAt: Date;
  user: IUserLogin;
}
export interface IUserLogin {
  id: number;
  type: string;
  groupPolicies: IGroupPolicies[];
}
export interface IGroupPolicies {
  id: number;
  name: string;
  key: string;
  description: string;
  userId: number;
  createdAt: string;
  status: string;
  type: string;
  policies: IPolicies[];
}

export interface IPolicies {
  id: number;
  name: string;
  action: DEFAULT_ACTION;
  resource: DEFAULT_SUBJECT;
  actionAbility: string;
}

export type DEFAULT_ACTION = 'manage' | 'create' | 'read' | 'update' | 'delete';

export type DEFAULT_SUBJECT =
  | 'all'
  | 'admin'
  | 'merchant'
  | 'customer'
  | 'group_policy'
  | 'gift'
  | 'event'
  | 'event_code'
  | 'product'
  | 'file_request'
  | 'user_request_download'
  | 'cron_job'
  | 'agent'
  | 'cart'
  | 'order'
  | 'category'
  | 'tag'
  | 'survey'
  | 'system_config'
  | 'secret'
  | 'system_config_point'
  | 'add_point_code'
  | 'export'
  | 'tier_config';

export interface IRules {
  action: string;
  resource: string;
  name: string;
  id: number;
  actionAbility: string;
}
