import { getListStore } from '../services';
import { useQuery, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { IParams } from '../interface';
import { dispatch } from '../../../common/redux/store';
import { setSearchParams } from '../storeInMap.slice';
export const useGetListStore = (searchParams: IParams) => {
  return {
    ...useQuery([QUERY_KEYS.LIST_STORE_IN_MAP, searchParams], () => getListStore(searchParams)),
  };
};
