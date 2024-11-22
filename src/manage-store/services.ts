import { useMutation } from 'react-query';
import {
  API_EXTERNAL_REFERRER,
  API_EXTERNAL_REFERRER_HISTORY,
  API_IMPORT_EXTERNAL_REFERRER,
} from '../common/constants/apis';
import axiosInstance from '../common/utils/axios';
import {
  IExternalHistoryParams,
  IExternalReferrerDetail,
  IParamsFilter,
  IResGetListExternalReferrer,
  ISubmitCreateStore,
} from './interfaces';

export const getListExternalReferrer = (params: IParamsFilter) => {
  if (!params.from) delete params.from;
  if (!params.to) delete params.to;
  if (!params.name) delete params.name;
  if (!params.phoneNumber) delete params.phoneNumber;

  return axiosInstance.get<unknown, IResGetListExternalReferrer>(API_EXTERNAL_REFERRER, {
    params,
  });
};

export const createExternalReferrer = (data: ISubmitCreateStore) => {
  return axiosInstance.post(API_EXTERNAL_REFERRER, data);
};

export const editExternalReferrer = (data: ISubmitCreateStore) => {
  return axiosInstance.put(API_EXTERNAL_REFERRER, data);
};
export const importExternalReferrer = (id: number) => {
  return axiosInstance.post(API_IMPORT_EXTERNAL_REFERRER, { fileId: id });
};
export const getExternalReferrerByID = (id: number) => {
  return axiosInstance.get<unknown, IExternalReferrerDetail>(
    `${API_EXTERNAL_REFERRER}/${id}`
  );
};
export const requestExport = (searchParams: IParamsFilter) => {
  return axiosInstance.post(
    `${API_EXTERNAL_REFERRER}/request-export-list-store`,
    searchParams
  );
};
export const requestExportDetail = (id: number) => {
  return axiosInstance.post(`${API_EXTERNAL_REFERRER}/request-export-detail-store/${id}`);
};

export const deleteStore = (id: number) => {
  return axiosInstance.delete(`${API_EXTERNAL_REFERRER}/${id}`);
};

export const getExternalReferrerHistory = (params: IExternalHistoryParams) => {
  return axiosInstance.get<unknown, any>(API_EXTERNAL_REFERRER_HISTORY, { params });
};
