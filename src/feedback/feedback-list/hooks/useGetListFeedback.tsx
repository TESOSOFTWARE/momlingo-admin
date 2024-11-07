import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IListFeedbackParams } from '../../interface';
import { getListFeedback } from '../../services';

export function useGetListFeedback(params: IListFeedbackParams) {
  return {
    ...useQuery([QUERY_KEYS.LIST_FEEDBACK, params], () => getListFeedback(params), {
      cacheTime: 0,
    }),
  };
}
