import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { getGiftList } from '../services';

export const useGetGiftList = (page: number) => {
  return useQuery([QUERY_KEYS.GET_GIFT_LIST, page], () => getGiftList(page));
};
