import { API_GAME_CONFIG_PLAYTIME, API_POINT } from '../../common/constants/apis';
import { DeleteMultipleResponse } from '../../common/constants/common.interfaces';
import axiosInstance from '../../common/utils/axios';
import { IListPoint } from '../../config-point/list-point/interface';
import {
  IFormCreateConfig,
  IFormEditConfig,
  IGamePlayTime,
  IParamsSearch,
  IResListGamePlayTime,
  ISearchProductGroup,
} from './interface';

export const getListGamePlayTimeConfig = (params: IParamsSearch) => {
  return axiosInstance.get<any, IResListGamePlayTime>(API_GAME_CONFIG_PLAYTIME, {
    params,
  });
};
export const getGamePlayTimeConfigById = (id: number) => {
  return axiosInstance.get<any, IGamePlayTime>(`${API_GAME_CONFIG_PLAYTIME}/${id}`);
};

export const deleteSingleGamePlayTimeConfig = (id: number) => {
  return axiosInstance.delete(`${API_GAME_CONFIG_PLAYTIME}/${id}`);
};

export const deleteMultipleGamePlaytimeConfig = (ids: number[]) => {
  return axiosInstance.delete<any, DeleteMultipleResponse>(API_GAME_CONFIG_PLAYTIME, {
    data: ids,
  });
};

export const detailGamePlaytimeConfig = (id: number) => {
  return axiosInstance.get(`${API_GAME_CONFIG_PLAYTIME}/${id}`);
};

export const editGamePlaytimeConfig = (data: IFormEditConfig) => {
  return axiosInstance.put(API_GAME_CONFIG_PLAYTIME, data);
};

export const createGamePlaytimeConfig = (data: IFormCreateConfig) => {
  return axiosInstance.post(API_GAME_CONFIG_PLAYTIME, data);
};

export const getListProductGroup = (params: ISearchProductGroup, pageParam: number) => {
  params.page = pageParam;
  return axiosInstance.get<any, IListPoint>(API_POINT, { params });
};
