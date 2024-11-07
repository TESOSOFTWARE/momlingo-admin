import { API_MERCHANT_WINNING_HISTORY } from './../common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import { IParamsListHistory, IResHistoryWinning } from './interface';

export function getListWinningHistory(params: IParamsListHistory) {
  return axiosInstance.get<unknown, IResHistoryWinning>(API_MERCHANT_WINNING_HISTORY, {
    params,
  });
}
