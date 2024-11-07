import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { getShop } from '../service';

export const useGetShop = () => useQuery([QUERY_KEYS.GET_SHOP], () => getShop());
