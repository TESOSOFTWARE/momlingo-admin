import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { IListTermParams } from '../interface';
import { getAttributeTerm } from '../service';

export const useGetAttributeTerm = (params: IListTermParams) => {
  return {
    ...useQuery([QUERY_KEYS.LIST_PRODUCT_ATTRIBUTE_TERM, params], () =>
      getAttributeTerm(params)
    ),
  };
};
