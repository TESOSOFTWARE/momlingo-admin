import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IProductAttributeParams } from '../interface/interface';
import { getListProductAttribute } from '../service';

export function useGetProductAttribute(params: IProductAttributeParams) {
  return {
    ...useQuery(
      [QUERY_KEYS.LIST_PRODUCT_ATTRIBUTE, params],
      () => getListProductAttribute(params),
      {
        select: (data) => data,
      }
    ),
  };
}
