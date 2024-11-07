import { API_SUBJECT } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IDeleteParams, ISubjectList, ISubjectParams } from './interface';

export const getListSubject = async (params: ISubjectParams) => {
  //   if (!params.searchText) delete params.searchText;
  return axiosInstance.get<unknown, ISubjectList>(`${API_SUBJECT}`, {
    params: {
      page: params.page,
      limit: params.limit,
    },
  });
};

export const deleteSubject = (params: IDeleteParams) =>
  axiosInstance.delete(`${API_SUBJECT}`, {
    data: params,
  });
