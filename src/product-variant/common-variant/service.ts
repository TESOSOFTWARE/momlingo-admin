import {
  API_PRODUCT_ATTRIBUTE_MERCHANT,
  API_PRODUCT_ATTRIBUTE_TERM_MERCHANT,
} from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import {
  IAttributeParams,
  IAttributeTermList,
  IListAttribute,
  ITermParams,
} from './interface';

export const getAttribute = (params: IAttributeParams) => {
  return axiosInstance.get<unknown, IListAttribute>(`${API_PRODUCT_ATTRIBUTE_MERCHANT}`, {
    params,
  });
};
export const getAttributeTerm = (params: ITermParams) => {
  return axiosInstance.get<unknown, IAttributeTermList>(
    `${API_PRODUCT_ATTRIBUTE_TERM_MERCHANT}`,
    { params }
  );
};
