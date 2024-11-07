import { API_CASL } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IParamsCASL } from './interface';

export const getPolicy = (params: IParamsCASL) => {
  if (!params.searchText) delete params.searchText;
  return axiosInstance.get(`${API_CASL}`, { params: params });
};
