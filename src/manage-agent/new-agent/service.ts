import { API_AGENT, API_CASL } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { INewAgent } from './interface';

export const getPolicy = () => axiosInstance.get(`${API_CASL}`);

export const newAgent = ({ data }: { data: INewAgent }) =>
  axiosInstance.post(`${API_AGENT}`, data);
