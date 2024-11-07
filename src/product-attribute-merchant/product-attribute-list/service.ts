import { API_PRODUCT_ATTRIBUTE_MERCHANT } from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import { IProductAttribute } from './../product-attribute-create/interface/interface';
import {
  IDataProductAttribute,
  IParamsDelete,
  IProductAttributeParams,
} from './interface/interface';

export const getListProductAttribute = (params: IProductAttributeParams) => {
  return axiosInstance.get<unknown, IDataProductAttribute>(
    `${API_PRODUCT_ATTRIBUTE_MERCHANT}`,
    { params }
  );
};

export const postProductAttribute = (data: IProductAttribute) => {
  return axiosInstance.post(`${API_PRODUCT_ATTRIBUTE_MERCHANT}`, data);
};

export const deleteProductAttribute = (params: IParamsDelete) => {
  return axiosInstance.delete(`${API_PRODUCT_ATTRIBUTE_MERCHANT}/multiple`, {
    data: params,
  });
};
