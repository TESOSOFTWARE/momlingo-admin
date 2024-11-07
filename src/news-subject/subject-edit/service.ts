import { API_SUBJECT } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IDataEditSubject, ISubject } from './interface';

export const editSubject = (params: IDataEditSubject) =>
  axiosInstance.patch(`${API_SUBJECT}`, params);

export const getSubjectById = (id: number) => {
  return axiosInstance.get<unknown, ISubject>(`${API_SUBJECT}/${id}`);
};
