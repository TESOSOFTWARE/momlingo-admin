import { API_GET_REQUEST, API_LIMIT_SPOON } from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import { IListRequestParams, IResRequest } from './list-interface';

export const getListRequest = (params: IListRequestParams) => {
  return axiosInstance.get<unknown, IResRequest>(`${API_GET_REQUEST}`, { params });
};
export const exportQRCode = (fileId: number) => {
  return axiosInstance({
    url: `/merchant/download-file/${fileId}`,
    method: 'GET',
  });
};
export const getLimitSpoonCode = () => {
  return axiosInstance.get<unknown, { value: string }[]>(`${API_LIMIT_SPOON}`);
};
export const editLimitSpoonCode = (limit: number) => {
  return axiosInstance.post(`${API_LIMIT_SPOON}/${limit}`);
};
