import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IListQRCodeParams } from '../interfaces';
import { getListQRCode } from '../services';

export function useGetListQRCode(params: IListQRCodeParams) {
  return {
    ...useQuery(
      [QUERY_KEYS.QR_CODE_LIST, params],
      () =>
        getListQRCode(
          params.page,
          params.limit,
          params.searchText,
          params.startDate,
          params.endDate
        ),
      { cacheTime: 0 }
    ),
  };
}
