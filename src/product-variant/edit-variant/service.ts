import { API_VARIANT } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IEditProductVariant, IDataVariantDetail } from './interface';

export const getVariantById = (id: number) =>
  axiosInstance.get<unknown, IDataVariantDetail>(`${API_VARIANT}/${id}`);

export const putVariant = ({ data }: { data: IEditProductVariant }) =>
  axiosInstance.put(`${API_VARIANT}`, data);
