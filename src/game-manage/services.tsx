import { API_GAME, API_TYPE_GAME } from '../common/constants/apis';
import axiosInstance from '../common/utils/axios';
import {
  IListGameParams,
  IGameForm,
  IGameList,
  IResListGame,
  IGetGameIDForm,
} from './interface';

export const createGame = (data: IGameForm) => {
  return axiosInstance.post(API_GAME, data);
};

export const getListGame = (params: IListGameParams) => {
  if(params.searchText === undefined) delete params.searchText;
  return axiosInstance.get<unknown, IResListGame>(`${API_GAME}`, { params });
};

export const getTypeGame = (params: IListGameParams) => {
  return axiosInstance.get<unknown, IResListGame>(`${API_TYPE_GAME}`, { params });
};

export const deleteGameById = (id: number) => {
  return axiosInstance.delete(`${API_GAME}/${id}`);
};
// SUA
export const getGameById = (id: number) => {
  return axiosInstance.get<any, IGetGameIDForm>(`${API_GAME}/${id}`);
};

export const editGame = (data:IGameForm) => {
  return axiosInstance.put(`${API_GAME}`, data);
};
