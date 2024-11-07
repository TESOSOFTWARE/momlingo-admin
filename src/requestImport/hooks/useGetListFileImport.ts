import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../common/constants/queryKeys.constant';
import { IParams } from '../interfaces';
import { getListFileImport } from '../services';

export function useGetListFileImport(params: IParams) {
  return {
    ...useQuery([QUERY_KEYS.REQUEST_IMPORT_LIST, params], () => getListFileImport(params), {
    }),
  };
}
