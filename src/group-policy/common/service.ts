import { API_GROUP_POLICY, API_POLICIES } from '../../common/constants/apis';
import { DeleteMultipleResponse } from '../../common/constants/common.interfaces';
import axiosInstance from '../../common/utils/axios';
import {
  IResGroupPolicies,
  IResPolicies,
  ISearchParams,
  ISearchPoliciesParams,
  CreateGroupPolicyForm,
  IGroupPolicy,
  IEditGroupPolicy,
} from './interface';

export const getListGroupPolicy = (params: ISearchParams) => {
  return axiosInstance.get<any, IResGroupPolicies>(API_GROUP_POLICY, { params });
};

export const deleteSingleGroupPolicy = (id: number) => {
  return axiosInstance.delete(`${API_GROUP_POLICY}/${id}`);
};

export const deleteMultipleGroupPolicy = async (ids: number[]) => {
  return axiosInstance.delete<any, DeleteMultipleResponse>(API_GROUP_POLICY, {
    data: { ids },
  });
};

export const getListPolicies = (params: ISearchPoliciesParams, pageParams: number) => {
  params.page = pageParams;
  return axiosInstance.get<any, IResPolicies>(API_POLICIES, { params });
};

export const createGroupPolicy = (data: CreateGroupPolicyForm) => {
  return axiosInstance.post(API_GROUP_POLICY, data);
};

export const getGroupPolicyById = (id: number) => {
  return axiosInstance.get<any, IGroupPolicy>(`${API_GROUP_POLICY}/${id}`);
};

export const editGroupPolicy = (data: IEditGroupPolicy) => {
  return axiosInstance.put(API_GROUP_POLICY, data);
};
