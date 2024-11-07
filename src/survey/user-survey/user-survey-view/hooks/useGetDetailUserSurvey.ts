import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IParamsUserSurvey } from '../../common/interface';
import { getDetailUserSurvey, getListUserSurvey } from '../../common/service';
import { IParamsDetailUserSurvey } from '../interface';

export const useGetDetailUsersSurvey = (searchParams: IParamsDetailUserSurvey) => {
  return {
    ...useQuery([QUERY_KEYS.DETAIL_USER_SURVEY, searchParams], () =>
      getDetailUserSurvey(searchParams)
    ),
  };
};
