import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IParamsListCategories } from '../common/interface';
import { getMusicById } from '../common/services';

export function useGetMusicById(id: number) {
  return {
    ...useQuery([QUERY_KEYS.LIST_MUSIC, id], () => getMusicById(id), {
      cacheTime: 0,
    }),
  };
}
