import {
  API_CATEGORY,
  API_CUSTOMER_PRODUCT,
  API_HOME_CONFIG,
  API_MOBILE_ROUTE,
} from 'src/common/constants/apis';
import axiosInstance from '../common/utils/axios';
import { IHomeConfigDataResponse } from './interface';
import { GetEventParams } from '../code-manage/code-create/create.interface';

export const editHomeSections = (newData: any) => {
  return axiosInstance.put(API_HOME_CONFIG, newData);
};
export const getCategoryList = (params: GetEventParams) => {
  return axiosInstance.get(API_CATEGORY, { params });
};
export const getMobileRoute = () => {
  return axiosInstance.get<unknown, { [key: string]: string }[]>(API_MOBILE_ROUTE);
};
export const getHomeConfigData = () => {
  return axiosInstance.get<IHomeConfigDataResponse>(API_HOME_CONFIG);
};
export const getCustomerProductData = (categoryId: number) => {
  return axiosInstance.get<any>(API_CUSTOMER_PRODUCT, {
    params: { categoryIds: categoryId },
  });
};
