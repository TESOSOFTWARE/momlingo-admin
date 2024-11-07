import { getListGift } from '../../common/services';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IGetListParams } from '../../common/interface';

export function useGetGift(params: IGetListParams) {
  return {
    ...useQuery([QUERY_KEYS.LIST_EVENT, params], () => getListGift(params), {
      cacheTime: 0,
    }),
  };
}
