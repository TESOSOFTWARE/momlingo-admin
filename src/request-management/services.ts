import {
  IDataCodeSBPS,
  IDataProductGroup,
  IDataWeight,
  IFormCreateSBPS,
  IFormCreateSpoon,
  IFormParamsCreateSpoon,
  IListQRCodeParams,
  IParamsChangeStatus,
  IParamsRequest,
  IResData,
} from './interfaces';
import {
  API_CREATE_REQUEST_CODE,
  API_GET_PRODUCTGROUP_SPOON,
  API_QR_CODE,
  API_GET_QUANTITY_SPOON,
  API_GET_SBPS_CODE,
} from '../common/constants/apis';
import axiosInstance from '../common/utils/axios';
import { TYPE_REQUEST } from './constants';

export const createSpoonCode = (data: IFormParamsCreateSpoon) => {
  return axiosInstance.post(API_CREATE_REQUEST_CODE, data);
};

export const createSBPSCode = (data: IFormCreateSBPS) => {
  return axiosInstance.post(API_CREATE_REQUEST_CODE, data);
};

export const getSBPSCode = (params: IParamsRequest) => {
  params.type = TYPE_REQUEST.sbps;
  return axiosInstance.get<unknown, IDataCodeSBPS>(API_GET_SBPS_CODE, { params });
};

export const getProductGroup = (params: IParamsRequest) => {
  return axiosInstance.get<unknown, IDataProductGroup>(API_GET_PRODUCTGROUP_SPOON, {
    params,
  });
};

export const getWeightSpoon = (params: IParamsRequest) => {
  return axiosInstance.get<unknown, IDataWeight>(API_GET_QUANTITY_SPOON, { params });
};

export const getListQRCode = (
  page: number,
  limit: number,
  searchText?: string,
  startDate?: string | null,
  endDate?: string | null
) => {
  const params: IListQRCodeParams = {
    page,
    limit,
    searchText,
    startDate,
    endDate,
  };

  if (searchText === '') delete params.searchText;
  else params.searchText = searchText;

  if (!startDate) delete params.startDate;
  else params.startDate = startDate;

  if (!endDate) delete params.endDate;
  else params.endDate = endDate;

  return axiosInstance.get<unknown, IResData>(`${API_QR_CODE}`, { params });
};

export const changeStatus = (params: IParamsChangeStatus) => {
  return axiosInstance.patch(`${API_QR_CODE}`, params);
};

export const exportQRCodeManage = (fileId: number) => {
  // return await axiosInstance.post(`${API_EXPORT_QR_CODE}`, {prefix},{ headers: { responseType: 'blob' },})
  const data = { fileId };
  return axiosInstance({
    url: `${API_QR_CODE}`,
    method: 'POST',
    data: { fileId },
    responseType: 'blob',
  });
};
