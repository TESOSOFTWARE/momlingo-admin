import { API_CATEGORY, API_LIST_MUSIC_TOOL } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IDataNewCategory } from './interface';

export const postCategory = (data: any) =>
  axiosInstance.post(`${API_LIST_MUSIC_TOOL}`, data);
