import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IHistoryGiftUserParams } from '../common/interfaces';
import { getHistoryGift } from '../common/services';

export const useGetHistoryGift = (params: IHistoryGiftUserParams) => {
  return {
    ...useQuery([QUERY_KEYS.HISTORY_GIFT, params], () => getHistoryGift(params), {})
  };
};
