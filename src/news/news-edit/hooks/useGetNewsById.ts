import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { INewsCallback, INewsForm } from '../../news-common/interface';
import { getNewsById } from '../service';

export const useGetNewsById = (id: number) => {
  return {
    ...useQuery([QUERY_KEYS.GET_NEWS_BY_ID, id], () => getNewsById(id), {
      cacheTime: 0,
    }),
  };
};
