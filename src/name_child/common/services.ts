import {
  API_CATEGORY,
  API_GET_LIST_USER,
  API_LIST_NAME_CHILD,
} from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import {
  ICategories,
  IDataEditCategory,
  IParamsDeleteCategory,
  IParamsListCategories,
  IResListCategories,
} from './interface';

export const getListName = (params: IParamsListCategories) => {
  return axiosInstance.get<unknown, IResListCategories>(API_LIST_NAME_CHILD, { params });
};

export const deleteMultiCategory = (params: IParamsDeleteCategory) => {
  return axiosInstance.delete(API_CATEGORY, { data: params });
};

export const deleteMultiName = (id: string) => {
  return axiosInstance.delete(`${API_LIST_NAME_CHILD}/${id}`);
};

export const editCategory = (params: IDataEditCategory) =>
  axiosInstance.patch(`${API_CATEGORY}`, params);

export const editNameById = (params: any) =>
  axiosInstance.put(`${API_LIST_NAME_CHILD}/${params?.id}`, params);

export const getCategoryById = (id: number) => {
  return axiosInstance.get<unknown, ICategories>(`${API_CATEGORY}/${id}`);
};
export const getNameById = (id: number) => {
  return axiosInstance.get<unknown, any>(`${API_LIST_NAME_CHILD}/${id}`);
};
