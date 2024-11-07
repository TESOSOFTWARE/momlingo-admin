import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';

import { getRelatedCacheKeys } from '../../common/utils/getRelatedCacheKeys';
import { ICallback } from '../interfaces';
import { activeDuplicateCode } from '../services';
import { useSelector } from 'react-redux';
import { searchDuplicateSelector } from '../historyScan.slice';
import { useGetListDuplicateScan } from './useGetListDuplicateScan';

export const useActiveDuplicateCode = (callback: ICallback) => {
  const queryClient = useQueryClient();
  const searchData = useSelector(searchDuplicateSelector);
  const { refetch } = useGetListDuplicateScan(searchData);
  return {
    ...useMutation(activeDuplicateCode, {
      onSuccess: () => {
        callback.onSuccess && callback.onSuccess();
        queryClient.invalidateQueries([QUERY_KEYS.GET_LIST_DUPLICATE_SCAN]);
      },
      onError: (data: any) => {
        callback.onError && callback.onError();
        queryClient.invalidateQueries([QUERY_KEYS.GET_LIST_DUPLICATE_SCAN]);
      },
    }),
  };
};
