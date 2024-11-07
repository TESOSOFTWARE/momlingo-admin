import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IListPopupParams, IPopupForm } from '../../interface';
import { getListPopup } from '../../services';

export function useGetListPopup(params: IListPopupParams) {
  return {
    ...useQuery([QUERY_KEYS.LIST_POPUP, params], () => getListPopup(params), {
      cacheTime: 0,
    }),
  };
}
