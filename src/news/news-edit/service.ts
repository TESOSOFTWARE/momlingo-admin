import { API_NEWS } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { INewsForm } from '../news-common/interface';
import { INews } from '../news-list/interface';
import { IDataFormEditNews } from './interface';

export const getNewsById = (id: number) => {
  return axiosInstance.get<unknown, INews>(`${API_NEWS}/${id}`);
};

export const editNews = (data: IDataFormEditNews) =>
  axiosInstance.put(`${API_NEWS}`, data);
