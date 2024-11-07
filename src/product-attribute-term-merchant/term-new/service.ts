import axiosInstance from '../../common/utils/axios';
import { API_PRODUCT_ATTRIBUTE_TERM_MERCHANT } from './../../common/constants/apis';
import { IAttributeTerm } from './interface';

export const postAttributeTerm = ({ data }: { data: IAttributeTerm }) =>
  axiosInstance.post(`${API_PRODUCT_ATTRIBUTE_TERM_MERCHANT}`, data);
