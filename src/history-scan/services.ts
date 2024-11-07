import axiosInstance from '../common/utils/axios';
import {
  API_DUPLICATE_SCAN,
  API_GET_LIST_USER,
  API_HISTORY_SCAN,
} from '../common/constants/apis';
import {
  IListHistoryScanParams,
  IParamsActiveCode,
  IParamsDuplicateScan,
  IResDuplicateScan,
  IResListHistoryScan,
} from './interfaces';

export const getListHistoryScan = (params: IListHistoryScanParams) => {
  return axiosInstance.get<unknown, IResListHistoryScan>(API_HISTORY_SCAN, { params });
};

export const getListDuplicateScan = (params: IParamsDuplicateScan) => {
  return axiosInstance.get<unknown, IResDuplicateScan>(API_DUPLICATE_SCAN, { params });
};

export const activeDuplicateCode = (params: IParamsActiveCode) => {
  return axiosInstance.patch(`${API_DUPLICATE_SCAN}/${params?.id}`, params?.data);
};

export const exportListHistoryScan = (data: IListHistoryScanParams) => {
  return axiosInstance.post(`${API_HISTORY_SCAN}/request-export`, data);
};

export const exportListDuplicateCode = (data: IParamsDuplicateScan) => {
  return axiosInstance.post(`${API_DUPLICATE_SCAN}/request-export`, data);
};
