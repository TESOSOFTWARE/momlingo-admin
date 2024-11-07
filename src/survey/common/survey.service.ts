import axiosInstance from 'src/common/utils/axios';
import { API_SURVEY } from '../../common/constants/apis';
import { IResSurveys, ISurVeyForm, ISurveySearchParam } from './survey.interface';

export const deleteSurveyById = (id: number) => {
  return axiosInstance.delete(`${API_SURVEY}/${id}`);
};

export const getListSurveys = (params: ISurveySearchParam) => {
  return axiosInstance.get<any, IResSurveys>(API_SURVEY, { params });
};
export const createSurvey = (data: ISurVeyForm) => {
  return axiosInstance.post(API_SURVEY, data);
};

export const getSurveyById = (id: number) => {
  return axiosInstance.get<unknown, ISurVeyForm>(`${API_SURVEY}/${id}`);
};

export const editSurvey = ({ data, id }: { data: any; id: number }) => {
  return axiosInstance.put(`${API_SURVEY}/${id}`, data);
};
