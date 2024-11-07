import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getPopupById } from '../../services';

export const useGetPopupById = (id: string) => {
  return {
    ...useQuery([QUERY_KEYS.DETAIL_POPUP, id], () => getPopupById(id), {
      select: (data) => data,
    }),
  };
};
