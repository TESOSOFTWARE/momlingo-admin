import { API_MOBILE_ROUTE, API_NOTI } from '../common/constants/apis';
import axiosInstance from '../common/utils/axios';
import {
  IDataDelete,
  IDataFormCreateNoti,
  IDataFormEditNoti,
  INotiForm,
  IParams,
  IResNotifications,
  IResRoute,
} from './interface';

export const createNotifications = (data: IDataFormCreateNoti) => {
  return axiosInstance.post(API_NOTI, data);
};

export const getListNotifications = (params: IParams) => {
  return axiosInstance.get<unknown, IResNotifications>(`${API_NOTI}`, { params });
};

export const deleteNotificationsById = (params: IDataDelete) => {
  return axiosInstance.delete(`${API_NOTI}/multiple`, { data: params });
};
export const getNotificationsById = (id: number) => {
  return axiosInstance.get<any, INotiForm>(`${API_NOTI}/${id}`);
};

export const editNotifications = (params: IDataFormEditNoti) => {
  return axiosInstance.put(`${API_NOTI}/${params.id}`, params.data);
};

export const getMobileRoute = () => {
  return axiosInstance.get<unknown, IResRoute[]>(API_MOBILE_ROUTE);
};
