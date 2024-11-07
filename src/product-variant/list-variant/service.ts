import { API_VARIANT } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IListVariantParams } from '../new-variant/interface';
import { IDeleteProp, IListVariant } from './interface';

export const getVariant = (params: IListVariantParams) =>
  axiosInstance.get<unknown, IListVariant>(`${API_VARIANT}`, { params });

export const deleteVariant = (params: IDeleteProp) => {
  return axiosInstance.delete(`${API_VARIANT}/multiple`, { data: params });
};
