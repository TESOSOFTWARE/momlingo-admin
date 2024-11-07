import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IParamsUserSurvey } from '../../common/interface';
import { getListUserSurvey } from '../../common/service';

export const useGetListUsersSurvey = (
  searchParams: IParamsUserSurvey,
  surveyId: number
) => {
  return {
    ...useQuery([QUERY_KEYS.USER_SURVEY, searchParams, surveyId], () =>
      getListUserSurvey(searchParams, surveyId)
    ),
  };
};
