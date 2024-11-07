import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import {
  IListTermPolicyTransform,
  IResTermPolicies,
  ISearchParams,
  ITermPolicyTransform,
} from '../../common/interface';
import { getListTermPolicy } from '../../common/service';

export function useGetListTermPolicy(params: ISearchParams) {
  return {
    ...useQuery([QUERY_KEYS.LIST_TERM_POLICY, params], () => getListTermPolicy(params), {
      select: (data: IResTermPolicies): IListTermPolicyTransform => {
        return {
          items: data?.items.map((item) => {
            return {
              id: item.id,
              name: item?.termsPolicyDetails[0].name,
              status: item.status,
              type: item.type,
              createdAt: item.createdAt,
              lang: item?.termsPolicyDetails[0].lang,
              updatedAt: item?.termsPolicyDetails[0].updatedAt,
            };
          }),
          meta: data.meta,
        };
      },
    }),
  };
}
