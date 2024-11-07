import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { ICodeParams } from '../list.interface';
import { getCode } from '../list.service';

export function useGetCode(params: ICodeParams) {
  return {
    ...useQuery([QUERY_KEYS.LIST_CODE, params], () => getCode(params)),
  };
}
