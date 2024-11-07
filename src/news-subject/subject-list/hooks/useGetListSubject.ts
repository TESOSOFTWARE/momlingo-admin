import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getListSubject } from '../service';
import { ISubjectList, ISubjectParams } from '../interface';

export const useGetListSubject = (params: ISubjectParams) => {
  return {
    ...useQuery([QUERY_KEYS.LIST_NEWS_SUBJECT, params], () => getListSubject(params), {
    }),
  };
};
