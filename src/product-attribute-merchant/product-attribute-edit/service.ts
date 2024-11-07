import { API_PRODUCT_ATTRIBUTE_MERCHANT } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IProductAttribute, IPutAttribute } from './interface';

export const getAttributeById = (id: number) =>
  axiosInstance.get<unknown, IProductAttribute>(
    `${API_PRODUCT_ATTRIBUTE_MERCHANT}/${id}`
  );

export const putAttribute = ({ data }: { data: IPutAttribute }) =>
  axiosInstance.put(`${API_PRODUCT_ATTRIBUTE_MERCHANT}`, data);
