import axiosInstance from '../../common/utils/axios';
import { INewStore } from '../common/interface';
import { API_STORE_IN_MAP } from './../../common/constants/apis';

export const postStore = (data: INewStore) =>
  axiosInstance.post(`${API_STORE_IN_MAP}`, data);
