import { API_PRODUCT } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IDetailProduct } from '../product-common/interface';
import { IEditProduct } from './edit-interface';

export const editProduct = ({ data }: { data: IEditProduct }) =>
  axiosInstance.put(`${API_PRODUCT}`, data);

export const getProductById = (id: number) => {
  return axiosInstance.get<unknown, IDetailProduct>(`${API_PRODUCT}/${id}`);
};
