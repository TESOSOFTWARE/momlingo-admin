import { API_STATISTIC_SPOON } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IResCircleChart, IResLineChart, IParamsStatisticSpoon } from './interfaces';

export const getStatisticCircleChart = (params: IParamsStatisticSpoon) => {
  return axiosInstance.get<unknown, IResCircleChart>(`${API_STATISTIC_SPOON}/overview`, {
    params,
  });
};

export const getStatisticLineChart = (params: IParamsStatisticSpoon) => {
  return axiosInstance.get<unknown, IResLineChart[]>(
    `${API_STATISTIC_SPOON}/line-chart`,
    { params }
  );
};

export const requestExport = (params: IParamsStatisticSpoon) => {
  return axiosInstance.post(`${API_STATISTIC_SPOON}/request-export`, params);
};


