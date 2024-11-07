import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IEditParams } from '../edit.interface';
import { getCodeEdit } from '../edit.service';

export function useGetEditCode(params: IEditParams) {
  return {
    ...useQuery([QUERY_KEYS.GET_EDIT_CODE, params], () => getCodeEdit(params)),
  };
}
