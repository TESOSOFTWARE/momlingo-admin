import { API_POINT } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { INewPoint } from './interface';

export const newPoint = ({ data }: { data: INewPoint }) =>
  axiosInstance.post(`${API_POINT}`, data);
