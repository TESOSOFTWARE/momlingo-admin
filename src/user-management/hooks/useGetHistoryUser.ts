import { useQuery } from "react-query";
import { QUERY_KEYS } from "../../common/constants/queryKeys.constant";
import { IListUserIntroduceParams } from "../interfaces";
import { getListUserIntroduce } from "../services";

export function useGetHistoryUser(params: IListUserIntroduceParams) {
    return {
      ...useQuery([QUERY_KEYS.LIST_USER_INTRODUCE, params], () => getListUserIntroduce(params), {
        cacheTime: 0,
      }),
    };
  }