import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { ISurveySearchParam } from '../../common/survey.interface';
import { getListSurveys } from '../../common/survey.service';

export const useGetListSurveys = (searchParams: ISurveySearchParam) => {
  return {
    ...useQuery([QUERY_KEYS.LIST_SURVEYS, searchParams], () =>
      getListSurveys(searchParams)
    ),
  };
};
