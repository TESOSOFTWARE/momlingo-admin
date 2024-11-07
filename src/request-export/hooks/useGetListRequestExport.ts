import { getListRequestExport } from './../services';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../common/constants/queryKeys.constant';
import { IParamsGetList } from '../interfaces';

export function useGetListRequestExport(params: IParamsGetList) {
  return {
    ...useQuery([QUERY_KEYS.REQUEST_EXPORT_LIST,params], () => getListRequestExport(params), {
      cacheTime: 0,
    }),
  };
}
