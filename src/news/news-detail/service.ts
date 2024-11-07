import { API_NEWS } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IDetailNews } from './interface';

export const getNewsById = (id: number) => {
  return axiosInstance.get<unknown, IDetailNews>(`${API_NEWS}/${id}`);
};
