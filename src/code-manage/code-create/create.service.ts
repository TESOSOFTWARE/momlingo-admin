import { API_CODE_POST, API_EVENT } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { GetEventParams, GetEventRes, PostCreateCode } from './create.interface';

export const getEvent = async (params: GetEventParams) => {
  return axiosInstance.get<any, GetEventRes>(API_EVENT, { params });
};

export const postCode = ({ data }: { data: PostCreateCode }) =>
  axiosInstance.post(`${API_CODE_POST}`, data);
