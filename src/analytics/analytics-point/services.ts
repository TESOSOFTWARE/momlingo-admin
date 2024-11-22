import {
  API_CATEGORY,
  API_GET_LIST_USER,
  API_STATISTIC_POINT,
} from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { ISearchForm } from '../interface';
import { IResCircleChart, IResLineChart } from './interfaces';

export const getStatisticPointCircleChart = (params: any) => {
  return axiosInstance.get<unknown, IResCircleChart>(`${API_STATISTIC_POINT}/overview`, {
    params,
  });
};

export const getStatisticPointLineChart = (params: any) => {
  return axiosInstance.get<unknown, IResLineChart[]>(
    `${API_STATISTIC_POINT}/line-chart`,
    { params }
  );
};

export const requestExportPoint = (params: ISearchForm) => {
  return axiosInstance.post(`${API_STATISTIC_POINT}/request-export`, params);
};
