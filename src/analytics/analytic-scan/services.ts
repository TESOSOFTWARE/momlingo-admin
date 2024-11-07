import { API_GET_ADDRESS, API_STATISTIC_SCAN } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { AddressData, AddressParams } from '../../order-management/edit-order/interface';
import {
  IParamsStatisticScan,
  IProvinceParams,
  IRequestExportParams,
  IResCircleChart,
  IResLineChart,
  IResProvince,
} from './interfaces';

export const getStatisticCircleChart = (params: IParamsStatisticScan) => {
  if (params?.endDate === null) delete params.endDate;
  if (params?.startDate === null) delete params.startDate;

  return axiosInstance.get<unknown, IResCircleChart>(`${API_STATISTIC_SCAN}/overview`, {
    params,
  });
};

export const getStatisticLineChart = (params: IParamsStatisticScan) => {
  return axiosInstance.get<unknown, IResLineChart[]>(`${API_STATISTIC_SCAN}/line-chart`, {
    params,
  });
};

export const getProvinceScan = (params: IProvinceParams) => {
  return axiosInstance.get<unknown, IResProvince>(API_GET_ADDRESS, { params });
};

export const requestExportScan = (params: IRequestExportParams) => {
  if (!params.startDate) delete params.startDate;
  if (!params.endDate) delete params.endDate;
  return axiosInstance.post(`${API_STATISTIC_SCAN}/request-export`, params);
};
