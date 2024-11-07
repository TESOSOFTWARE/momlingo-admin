import {
  API_APPROVE_DOWNLOAD_FILE,
  API_GET_REQUEST,
  API_POST_APPROVED,
  API_POST_REJECT,
  API_REJECT_DOWNLOAD,
  API_REQUEST_DOWNLOAD_FILE,
} from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import { IRequestDetail, paramsReject } from './interface';

export const getRequestById = (fileId: number) => {
  return axiosInstance.get<unknown, IRequestDetail>(`${API_GET_REQUEST}/${fileId}`);
};

export const postApprove = (id: number) => {
  return axiosInstance.post(`${API_POST_APPROVED}/${id}`);
};
export const postReject = (params: paramsReject) => {
  return axiosInstance.post(API_POST_REJECT, params);
};
export const rejectDownload = (params: paramsReject) => {
  return axiosInstance.post(API_REJECT_DOWNLOAD, params);
};
export const approveDownload = (idApprove: number) => {
  return axiosInstance.post(`${API_APPROVE_DOWNLOAD_FILE}/${idApprove}`);
};
export const requestDownload = (idRequest: number) => {
  return axiosInstance.post(`${API_REQUEST_DOWNLOAD_FILE}/${idRequest}`);
};
