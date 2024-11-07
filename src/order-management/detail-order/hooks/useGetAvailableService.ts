import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { getAvailableService } from './../service';

export const useGetAvailableService = ({
  toDistrict,
  fromDistrict,
}: {
  toDistrict: number;
  fromDistrict: number;
}) =>
  useQuery(
    [QUERY_KEYS.GET_SERVICES],
    () => getAvailableService(toDistrict, fromDistrict),
    { enabled: false }
  );
