import { API_CATEGORY, API_GET_LIST_USER } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import {
  ICategories,
  IDataEditCategory,
  IParamsDeleteCategory,
  IParamsListCategories,
  IResListCategories,
} from './interface';

export const getListCategories = (params: IParamsListCategories) => {
  return axiosInstance.get<unknown, IResListCategories>(API_CATEGORY, { params });
};

export const deleteMultiCategory = (params: IParamsDeleteCategory) => {
  return axiosInstance.delete(API_CATEGORY, { data: params });
};

export const editCategory = (params: IDataEditCategory) =>
  axiosInstance.patch(`${API_CATEGORY}`, params);

export const getCategoryById = (id: number) => {
  return axiosInstance.get<unknown, ICategories>(`${API_CATEGORY}/${id}`);
};
