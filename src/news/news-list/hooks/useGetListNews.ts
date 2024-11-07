import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { INewsParams } from '../interface';
import { getListNews } from './../service';

export const useGetListNews = (params: INewsParams) => {
  return {
    ...useQuery([QUERY_KEYS.LIST_NEWS, params], () => getListNews(params), {
      cacheTime: 0,
    }),
  };
};
