import { API_POINT } from './../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IDetailPoint, IEditPoint } from './interface';

export const getPointById = (id: number) => {
  return axiosInstance.get<unknown, IDetailPoint>(`${API_POINT}/${id}`);
};

export const editPoint = ({ data, id }: { data: IEditPoint; id: number }) =>
  axiosInstance.patch(`${API_POINT}/${id}`, data);
