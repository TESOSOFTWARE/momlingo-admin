import { API_TERM_POLICY } from '../../common/constants/apis';
import { DeleteMultipleResponse } from '../../common/constants/common.interfaces';
import axiosInstance from '../../common/utils/axios';
import {
  INewTermsPolicy,
  IResTermPolicies,
  IResTermPolicy,
  ISearchParams,
  IUpdateTermsPolicy,
} from './interface';

export const getListTermPolicy = (params: ISearchParams) => {
  return axiosInstance.get<any, IResTermPolicies>(API_TERM_POLICY, { params });
};

export const deleteSingleTermPolicy = (id: number) => {
  return axiosInstance.delete(`${API_TERM_POLICY}/${id}`);
};

export const deleteMultipleTermPolicy = (ids: number[]) => {
  return axiosInstance.delete<any, DeleteMultipleResponse>(API_TERM_POLICY, {
    data: { ids },
  });
};

export const createNewTermPolicy = (data: INewTermsPolicy) => {
  return axiosInstance.post(API_TERM_POLICY, data);
};

export const updateTermPolicy = (data: IUpdateTermsPolicy) => {
  return axiosInstance.patch(API_TERM_POLICY, data);
};

export const getOneTermPolicy = (id: number) => {
  return axiosInstance.get<any, IResTermPolicy>(`${API_TERM_POLICY}/${id}`);
};
