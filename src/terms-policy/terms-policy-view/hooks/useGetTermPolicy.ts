import { useQuery, useQueryClient } from 'react-query';
import { ITermPolicyCallback } from '../../common/type';
import { createNewTermPolicy, getOneTermPolicy } from '../../common/service';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { IResTermPolicy, ITermPolicyTransform } from '../../common/interface';

export const useGetTermPolicy = (id: number) => {
  return {
    ...useQuery([QUERY_KEYS.TERM_POLICY, id], () => getOneTermPolicy(id), {
      select: (data: IResTermPolicy): ITermPolicyTransform => {
        return {
          id: data.id,
          status: data.status,
          type: data.type,
          createdAt: data.createdAt,
          termsPolicyDetailId: data.termsPolicyDetails[0].id,
          lang: data.termsPolicyDetails[0].lang,
          name: data.termsPolicyDetails[0].name,
          content: data.termsPolicyDetails[0].content,
          updatedAt: data.termsPolicyDetails[0].updatedAt,
          iconUrl: data.icon.url,
          iconId: data.icon.id,
        };
      },
    }),
  };
};
