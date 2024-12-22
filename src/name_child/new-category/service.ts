import { API_CATEGORY, API_LIST_NAME_CHILD } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IDataNewCategory } from './interface';

export const postCategory = (data: IDataNewCategory) =>
  axiosInstance.post(`${API_CATEGORY}`, data);
export const postName = (data: any) => axiosInstance.post(`${API_LIST_NAME_CHILD}`, data);
