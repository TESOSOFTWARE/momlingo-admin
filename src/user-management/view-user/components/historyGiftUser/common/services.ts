
import { API_ORDER_MANAGEMENT } from '../../../../../common/constants/apis';
import axiosInstance from '../../../../../common/utils/axios';
import { IHistoryGiftUserList, IHistoryGiftUserParams } from './interfaces';

export const getHistoryGift = (params: IHistoryGiftUserParams) =>
  axiosInstance.get<unknown, IHistoryGiftUserList>(`${API_ORDER_MANAGEMENT}`, {params});
