import { API_SUBJECT } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IDataNewSubject } from './interface';

export const createSubject = (data: IDataNewSubject) =>
  axiosInstance.post(`${API_SUBJECT}`, data);
