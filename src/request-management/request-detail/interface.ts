export interface IRequestDetail {
  id: number;
  name: string;
  approvedDate: string | null;
  addPointCodeQuantity: number;
  status: string;
  addPointCodeQuantityCreated: number;
  rejectDescription: string | null;
  factory: string;
  type: string;
  description: string;
  sku: string;
  weight: number;
  manufactureDate: string;
  isActive: boolean;
  accRequestId: number | null;
  nameUserRequest: string;
  userApproveId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  version: number;
  userApprove: {
    merchant: {
      email: string;
    };
  };
}
interface userRequestDownload {
  id: number;
  userApproveId: number;
  status: string;
  rejectDescription: string;
}
export interface IPropsTableRowApproveFileForUser {
  row: userRequestDownload;
}

export interface ICallback {
  onSuccess: VoidFunction;
  onError: VoidFunction;
}
export interface IDataRes {
  response: {
    data: {
      statusCode: number;
      message: string;
    };
  };
}

export enum IStatus {
  NOT_APPROVE = 'WAITING_APPROVE',
  APPROVED = 'SUCCESS',
  REJECTED = 'REJECTED',
}

export interface paramsReject {
  [key: string]: number | string | undefined;
}
export type popUpReject = {
  rejectDes: string;
};

export type ISliceDetail = {
  isPopup: boolean;
  rejectDescription: string;
  isRejectDownload: boolean;
};
