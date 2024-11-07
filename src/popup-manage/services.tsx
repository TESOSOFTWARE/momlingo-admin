import { API_HOME_POPUP } from '../common/constants/apis';
import axiosInstance from '../common/utils/axios';
import { IListPopupParams, IPopupForm, IPopupList, IResListPopup } from './interface';

export const createPopup = (data: IPopupForm) => {
  return axiosInstance.post(API_HOME_POPUP, data);
};

export const getListPopup = (params: IListPopupParams) => {
  return axiosInstance.get<unknown, IResListPopup>(`${API_HOME_POPUP}`, { params });
};

export const deletePopupById = (id: string) => {
  return axiosInstance.delete(`${API_HOME_POPUP}/${id}`);
};
export const getPopupById = (id: string) => {
  return axiosInstance.get<any, IPopupForm>(`${API_HOME_POPUP}/${id}`);
};

export const editPopup = (data: IPopupList) => {
  return axiosInstance.put(`${API_HOME_POPUP}`, data);
};
