import { API_REQUEST_EXPORT } from './../common/constants/apis';
import axiosInstance from '../common/utils/axios';
import { IParamsGetList, IResRequestExport, IRequestExportItem } from './interfaces';

export const getListRequestExport = (params: IParamsGetList) => {
  return axiosInstance.get<unknown, IResRequestExport>(API_REQUEST_EXPORT, { params });
};

export const getItemRequestExport = (id: number) => {
  return axiosInstance.get<unknown, IRequestExportItem>(`${API_REQUEST_EXPORT}/${id}`);
};

export const retryRequestExport = (id: number) => {
  return axiosInstance.post(`${API_REQUEST_EXPORT}/${id}/retry`);
};
