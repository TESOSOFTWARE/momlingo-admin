import { API_PRODUCT } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IDeleteParams, IProductList, IProductParams } from './product-interface';

export const getProduct = async (params: IProductParams) => {
  if (!params.searchText) delete params.searchText;
  return axiosInstance.get<unknown, IProductList>(`${API_PRODUCT}`, {
    params: {
      searchText: params.searchText,
      searchType: params.searchType,
      productStatus: params.productStatus,
      taxStatus: params.taxStatus,
      productType: params.productType,
      page: params.page,
      limit: params.limit,
    },
  });
};

export const deleteProduct = (params: IDeleteParams) =>
  axiosInstance.delete(`${API_PRODUCT}/multiple`, {
    data: params,
  });
