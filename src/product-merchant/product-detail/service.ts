import { API_PRODUCT } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IDetailProduct } from './interface';

export const getProductById = (id: number) => {
  return axiosInstance.get<unknown, IDetailProduct>(`${API_PRODUCT}/${id}`);
};
