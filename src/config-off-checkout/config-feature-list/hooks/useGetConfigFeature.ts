import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { IConfigFeatureList } from '../config-feature-interface';
import { getConfigFeature } from '../config-feature-service';

export function useGetConfigFeature() {
  return {
    ...useQuery([QUERY_KEYS.LIST_CONFIG_FEATURE], () => getConfigFeature(), {
      select: (data) => data.featureConfig,
    }),
  };
}
