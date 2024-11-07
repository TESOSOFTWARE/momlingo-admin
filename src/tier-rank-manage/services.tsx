import { API_TIER_RANK } from '../common/constants/apis';
import axiosInstance from '../common/utils/axios';
import {
  IListTierRankParams,
  ITierRankForm,
  ITierRankList,
  IResListTierRank,
} from './interface';

export const createTierRank = (data: ITierRankForm) => {
  return axiosInstance.post(API_TIER_RANK, data);
};

export const getListTierRank = (params: IListTierRankParams) => {
  return axiosInstance.get<unknown, IResListTierRank>(`${API_TIER_RANK}`, { params });
};

export const deleteTierRankById = (id: number) => {
  return axiosInstance.delete(`${API_TIER_RANK}/${id}`);
};
export const getTierRankById = (id: number) => {
  return axiosInstance.get<any, ITierRankForm>(`${API_TIER_RANK}/${id}`);
};

export const editTierRank = ({ data, id }: { data: ITierRankForm; id: number }) => {
  return axiosInstance.patch(`${API_TIER_RANK}/${id}`, data);
};
