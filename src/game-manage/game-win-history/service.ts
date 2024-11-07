import axiosInstance from 'src/common/utils/axios';
import { IParamsListHistory, IResHistoryWinning } from './interface';
import { API_GAME_WIN_HISTORY } from '../../common/constants/apis';

export function getListGameWinHistory(params: IParamsListHistory) {
  return axiosInstance.get<unknown, IResHistoryWinning>(API_GAME_WIN_HISTORY, {
    params,
  });
}

export const requestExportListGameWinHistory = (params: IParamsListHistory) => {
  return axiosInstance.post(`${API_GAME_WIN_HISTORY}/request-export`, params);
};
