import {
  IListUserIntroduceParams,
  IListUserParams,
  IParamsChangeBlockAccount,
  IParamsEditUser,
  IProvinceParams,
  IResListUser,
  IResListUserIntroduce,
  IResProvince,
  IUser,
} from './interfaces';
import axiosInstance from '../common/utils/axios';
import { API_GET_ADDRESS_MERCHANT, API_GET_LIST_USER, API_GET_LIST_USER_INTRODUCE } from '../common/constants/apis';

// export const getListUserOld = (params: IListUserParams) => {
//   return axiosInstance.get<unknown, IResListUser>(API_GET_LIST_USER, { params });
// };
export const getListUser = (params: IListUserParams) => {
  return axiosInstance.get<unknown, IResListUser>(API_GET_LIST_USER, { params });
};
export const getListUserIntroduce = (params: IListUserIntroduceParams) => {
  return axiosInstance.get<unknown, IResListUserIntroduce>(API_GET_LIST_USER_INTRODUCE, {
    params,
  });
};
export const getUserById = (id: number) => {
  return axiosInstance.get<unknown, IUser>(`${API_GET_LIST_USER}/${id}`);
};

export const changeUserStatusAddPoint = (params: IParamsChangeBlockAccount) => {
  return axiosInstance.patch(`${API_GET_LIST_USER}/${params.id}/block-add-point`, {
    blockAddPoint: params.blockAddPoint,
  });
};

export const changeUserStatusAccount = (params: IParamsChangeBlockAccount) => {
  return axiosInstance.patch(`${API_GET_LIST_USER}/${params.id}/block-acc`, {
    blockAccount: params.blockAccount,
  });
};

export const editUser = (params: IParamsEditUser) => {
  return axiosInstance.patch(`${API_GET_LIST_USER}/${params.id}`, { ...params?.data });
};

export const requestExportListUser = (params: IListUserParams) => {
  return axiosInstance.post(`${API_GET_LIST_USER}/request-export`, params);
};


export const getProvinceScan = (params: IProvinceParams) => {
  return axiosInstance.get<unknown, IResProvince>(API_GET_ADDRESS_MERCHANT, { params });
};


export const requestExport = (searchParams:IListUserIntroduceParams) => {
  return axiosInstance.post(`${API_GET_LIST_USER_INTRODUCE}/request-export`,searchParams);
};