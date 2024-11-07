import { API_DELETE_GROUP_USER, API_GROUP_USER } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import {
  IDataFormGroupUser,
  IDataFormGroupUserAll,
  IFormCreateGroupUser,
  IGroupUser,
  IParamsDeleteMultiple,
  IParamsEditGroupUser,
  IParamsEditGroupUserAll,
  IParamsGroupUser,
  IResListGroupUser,
} from './interfaces';

export const getListGroupUser = (params: IParamsGroupUser) => {
  return axiosInstance.get<unknown, IResListGroupUser>(API_GROUP_USER, { params });
};

export const deleteMultiGroupUser = (params: IParamsDeleteMultiple) => {
  return axiosInstance.delete(API_DELETE_GROUP_USER, { data: params });
};

export const createGroupUser = (data: IDataFormGroupUser) => {
  return axiosInstance.post(API_GROUP_USER, data);
};

export const createGroupUserAll = (data: IDataFormGroupUserAll) => {
  return axiosInstance.post(`${API_GROUP_USER}/all`, data);
};

export const editGroupUser = (data: IParamsEditGroupUser) => {
  return axiosInstance.put(`${API_GROUP_USER}/${data?.id}`, data?.data);
};

export const editGroupUserPickAll = (data: IParamsEditGroupUserAll) => {
  return axiosInstance.put(`${API_GROUP_USER}/all/${data?.id}`, data?.data);
};



export const getGroupUserById = (params: number) => {
  return axiosInstance.get<unknown, IGroupUser>(`${API_GROUP_USER}/${params}`);
};
