import axiosInstance from 'src/common/utils/axios';
import { API_EXTERNAL, API_VARIANT } from '../../common/constants/apis';
import { IExternalProduct, IParamsExternal, IProductVariant } from './interface';

export const postVariant = (data: IProductVariant) =>
  axiosInstance.post(`${API_VARIANT}`, data);

export const getExternalProduct = (param: IParamsExternal) => {
  if (!param.searchText) delete param.searchText;
  if (!param.types) delete param.types;
  if (param.types === 'All') delete param.types;
  return axiosInstance.get<unknown, IExternalProduct>(API_EXTERNAL, { params: param });
};
