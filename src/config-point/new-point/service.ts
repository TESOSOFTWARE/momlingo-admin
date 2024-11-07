import {
  API_GET_PRODUCTGROUP_SPOON,
  API_GET_QUANTITY_SPOON,
  API_POINT,
} from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IDataProductGroup, IDataWeight } from '../../request-management/interfaces';
import { INewPoint, IParamsRequest } from './interface';

export const newPoint = ({ data }: { data: INewPoint }) =>
  axiosInstance.post(`${API_POINT}`, data);

export const getProductGroup = (params: IParamsRequest) => {
  return axiosInstance.get<unknown, IDataProductGroup>(API_GET_PRODUCTGROUP_SPOON, {
    params,
  });
};

export const getWeightSpoon = (params: IParamsRequest) => {
  return axiosInstance.get<unknown, IDataWeight>(API_GET_QUANTITY_SPOON, { params });
};
