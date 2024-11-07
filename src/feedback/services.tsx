import { API_FEEDBACK } from '../common/constants/apis';
import axiosInstance from '../common/utils/axios';
import { IListFeedbackParams, IResListFeedback } from './interface';


export const getListFeedback = (params: IListFeedbackParams) => {
  return axiosInstance.get<unknown, IResListFeedback>(`${API_FEEDBACK}`, { params });
};


export const requestExport = (params: IListFeedbackParams) => {
  return axiosInstance.get(`${API_FEEDBACK}/export`,{params});
};