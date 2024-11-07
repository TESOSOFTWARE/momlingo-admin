import { API_GET_LIST_FILE_IMPORT } from './../common/constants/apis';
import axiosInstance from '../common/utils/axios';
import { IParams, IResListFileImport } from './interfaces';

export const getListFileImport = (params: IParams) => {
  return axiosInstance.get<unknown, IResListFileImport>(API_GET_LIST_FILE_IMPORT, {
    params,
  });
};

export const retryImportFile = (id: number) => {
  return axiosInstance.post(`${API_GET_LIST_FILE_IMPORT}/${id}/retry`)
};
