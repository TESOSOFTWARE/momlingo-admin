import {
  API_CATEGORY,
  API_GET_LIST_USER,
  API_LIST_MUSIC_CATEGORY,
  API_LIST_MUSIC_TOOL,
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

export const getListMusic = (params: IParamsListCategories) => {
  return axiosInstance.get<unknown, IResListCategories>(API_LIST_MUSIC_TOOL, { params });
};
export const getMusicCategory = () => {
  return axiosInstance.get<unknown, IResListCategories>(API_LIST_MUSIC_CATEGORY);
};
export const deleteMultiCategory = (params: IParamsDeleteCategory) => {
  return axiosInstance.delete(API_CATEGORY, { data: params });
};

export const editMusic = (params: any) =>
  axiosInstance.put(`${API_LIST_MUSIC_TOOL}/${params?.id}`, params);

export const getMusicById = (id: number) => {
  return axiosInstance.get<unknown, any>(`${API_LIST_MUSIC_TOOL}/${id}`);
};
