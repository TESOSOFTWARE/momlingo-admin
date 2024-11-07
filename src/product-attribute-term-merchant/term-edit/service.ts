import { API_PRODUCT_ATTRIBUTE_TERM_MERCHANT } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IProductAttributeTerm, IPutAttributeTerm } from './interface';

export const getTermById = (id: number) =>
  axiosInstance.get<unknown, IProductAttributeTerm>(
    `${API_PRODUCT_ATTRIBUTE_TERM_MERCHANT}/${id}`
  );

export const putTerm = ({ data }: { data: IPutAttributeTerm }) =>
  axiosInstance.put(`${API_PRODUCT_ATTRIBUTE_TERM_MERCHANT}`, data);
