import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IParamsListCategories } from '../common/interface';
import { getMusicCategory } from '../common/services';

export function useGetMusicCategory() {
  return {
    ...useQuery([QUERY_KEYS.LIST_MUSIC], () => getMusicCategory(), {
      cacheTime: 0,
    }),
  };
}
