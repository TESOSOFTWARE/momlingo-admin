import { API_STORE_IN_MAP } from './../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IDataStoreDelete, IParams, IResStoreList } from './interface';

export const getListStore = (params: IParams) => {
  return axiosInstance.get<any, IResStoreList>(API_STORE_IN_MAP, { params });
};

export const deleteMultiStore = (data: IDataStoreDelete) => {
  return axiosInstance.delete(API_STORE_IN_MAP, { data });
};
export const requestExport = (searchParams:IParams) => {
  return axiosInstance.post(`${API_STORE_IN_MAP}/request-export`,searchParams);
};

export const requestImport = (id: number) => {
  return axiosInstance.post(`${API_STORE_IN_MAP}/request-import`, {fileId:id});
};