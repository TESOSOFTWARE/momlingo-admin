import { API_NEWS } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IDataFormNews, ISubmitData } from './interface';

export const createNews = (data: IDataFormNews) => {
  return axiosInstance.post(API_NEWS, data);
};
