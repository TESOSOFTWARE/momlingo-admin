import { API_PRODUCT_ATTRIBUTE_TERM_MERCHANT } from './../../common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import { IAttributeTermList, IDeleteParams, IListTermParams } from './interface';

export const getAttributeTerm = (params: IListTermParams) =>
  axiosInstance.get<unknown, IAttributeTermList>(
    `${API_PRODUCT_ATTRIBUTE_TERM_MERCHANT}`,
    { params }
  );

export const deleteTerm = (params: IDeleteParams) => {
  return axiosInstance.delete(`${API_PRODUCT_ATTRIBUTE_TERM_MERCHANT}/multiple`, {
    data: params,
  });
};
