import { API_GET_HISTORY_DOWNLOAD, API_GET_REQUEST } from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import { IListHistoryDownloadParams, IResHistoryDownload } from './interface';

export const getListHistoryDownload = (params: IListHistoryDownloadParams) => {
  return axiosInstance.get<unknown, IResHistoryDownload>(`${API_GET_HISTORY_DOWNLOAD}`, {
    params,
  });
};
