import { API_EVENT, API_POINT } from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import { DeleteMultipleResponse } from '../../common/constants/common.interfaces';
import {
  IDeleteEvent,
  IEvent,
  IFormDataEvent,
  IParamsEvent,
  IParamsSystemConfigPoint,
  IResListEvent,
} from './interfaces';
import { IListPoint } from '../../config-point/list-point/interface';

export const getListEvent = (params: IParamsEvent) => {
  // if(params.searchText === undefined) delete params.searchText;
  return axiosInstance.get<unknown, IResListEvent>(API_EVENT, { params });
};

export const getEventById = (id: number) => {
  return axiosInstance.get<unknown, IEvent>(`${API_EVENT}/${id}`);
};
export const deleteEvent = (data: IDeleteEvent) => {
  return axiosInstance.delete(`${API_EVENT}/multiple`, { data: data });
};

export const getListSystemConfigPoint = (params: IParamsSystemConfigPoint) => {
  return axiosInstance.get<unknown, IListPoint>(`${API_POINT}`, { params });
};

export const createEvent = (data: IFormDataEvent) => {
  return axiosInstance.post(`${API_EVENT}`, data);
};

export const editEvent = (data: IFormDataEvent) => {
  return axiosInstance.put(`${API_EVENT}`, data);
};
