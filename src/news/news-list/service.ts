import { API_NEWS } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IDeleteParams, INewsParams, IResNewsList } from './interface';

export const getListNews = async (params: INewsParams) => {
  return axiosInstance.get<unknown, IResNewsList>(`${API_NEWS}`, { params });
};
export const deleteNews = (params: IDeleteParams) =>
  axiosInstance.delete(`${API_NEWS}`, {
    data: params,
  });
