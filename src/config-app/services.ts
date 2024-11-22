import { API_CONFIG_APP } from '../common/constants/apis';
import axiosInstance from '../common/utils/axios';
import { IConfigApp, IDataEditConfigApp, IResConfigApp } from './interfaces';

export const getListConfigApp = (params?: any) => {
  return axiosInstance.get<unknown, IConfigApp[]>(API_CONFIG_APP, { params });
};

export const editConfigApp = (data: IDataEditConfigApp) => {
  return axiosInstance.patch(`${API_CONFIG_APP}/${data?.id}`, data?.data);
};
