import { API_AGENT } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IDetailAgent, IEditAgent } from './interface';

export const getAgentById = (id: number) =>
  axiosInstance.get<unknown, IDetailAgent>(`${API_AGENT}/${id}`);

export const putAgent = ({ data }: { data: IEditAgent }) =>
  axiosInstance.put(`${API_AGENT}`, data);
