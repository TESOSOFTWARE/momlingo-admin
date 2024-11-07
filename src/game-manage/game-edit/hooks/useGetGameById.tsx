import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { idFile } from '../../../request-management/request-list/list-slice';
import { getGameById } from '../../services';

export const useGetGameById = (id: number) => {
  return {
    ...useQuery([QUERY_KEYS.DETAIL_GAME, id], () => getGameById(id), {
      select: (data) => {
        return {
          id:data?.id,
          name:data?.name,
          status:data?.status,
          startDate:data?.startDate,
          endDate:data?.endDate,
          gameType:data?.gameType,
          imageId:data?.image?.url,
          image:data?.image,
          policyLink: data?.policyLink,
        }
      },
    }),
  };
};
