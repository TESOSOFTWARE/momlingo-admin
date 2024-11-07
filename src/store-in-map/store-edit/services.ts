import axiosInstance from 'src/common/utils/axios';
import { API_STORE_IN_MAP } from '../../common/constants/apis';
import { IStoreItem } from '../common/interface';

export const getStoreById = (id: number) => {
  return axiosInstance.get<any, IStoreItem>(`${API_STORE_IN_MAP}/${id}`);
};

export const updateStore = (data: IStoreItem) => {
  return axiosInstance.put(`${API_STORE_IN_MAP}`, data);
};
