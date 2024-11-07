import { API_AGENT } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IDeleteId, IListAgent, IListAgentParams } from './interface';

export const getAgent = (params: IListAgentParams) => {
  if (!params.searchText) delete params.searchText;
  return axiosInstance.get<unknown, IListAgent>(`${API_AGENT}`, { params });
};

export const deleteAgent = (params: IDeleteId) => {
  return axiosInstance.delete<unknown, IDeleteId>(`${API_AGENT}`, { data: params });
};
