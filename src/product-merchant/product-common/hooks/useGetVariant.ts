import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { IListVariantParams } from '../../../product-variant/new-variant/interface';
import { getVariant } from '../service';

export function useGetVariant(params: IListVariantParams) {
  return {
    ...useQuery([QUERY_KEYS.LIST_PRODUCT_VARIANT, params], () => getVariant(params)),
  };
}
