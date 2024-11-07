import { API_CATEGORY } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IDataNewCategory } from './interface';

export const postCategory = (data: IDataNewCategory) =>
  axiosInstance.post(`${API_CATEGORY}`, data);
