import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { ISubjectParams } from '../../news-subject/subject-list/interface';
import { getNewsSubject } from '../news-common/service';

export const useGetSubject = (params: ISubjectParams) => {
  return {
    ...useQuery([QUERY_KEYS.LIST_NEWS_SUBJECT, params], () => getNewsSubject(params), {
      cacheTime: 0,
    }),
  };
};
