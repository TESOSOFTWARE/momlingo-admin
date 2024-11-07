import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getSubjectById } from '../service';

export function useGetSubjectById(id: number) {
  return {
    ...useQuery([QUERY_KEYS.GET_NEWS_SUBJECT_BY_ID, id], () => getSubjectById(id), {
      cacheTime: 0,
    }),
  };
}
