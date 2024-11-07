import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getSurveyById } from '../../common/survey.service';

export const useGetSurveyById = (id: number) => {
  return {
    ...useQuery([QUERY_KEYS.GIFT_DETAIL, id], () => getSurveyById(id), {
      select: (data) => data,
    }),
  };
};
