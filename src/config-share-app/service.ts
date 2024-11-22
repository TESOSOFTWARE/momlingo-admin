import { API_MOBILE_ROUTE, API_SHARE_APP_CONFIG } from '../common/constants/apis';
import axiosInstance from '../common/utils/axios';
import { IDataRequest, IResMobileRoutes, IResShareAppConfig } from './interface';

export const getShareAppConfig = () => {
  return axiosInstance.get<any, IResShareAppConfig>(API_SHARE_APP_CONFIG);
};

export const getMobileRoutes = () => {
  return axiosInstance.get<any, IResMobileRoutes>(API_MOBILE_ROUTE);
};

export const editShareAppConfig = (data: IDataRequest[]) => {
  return axiosInstance.put(API_SHARE_APP_CONFIG, {
    sections: [...data],
  });
};
