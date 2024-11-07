import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { getBabyTrackerList } from '../baby-tracker-service';
import { PregnancyWeekInfo } from '../baby-tracker-interface';

export function useGetBabyTracker() {
  return useQuery<PregnancyWeekInfo[]>(
    [QUERY_KEYS.LIST_BABY_TRACKERS], 
    getBabyTrackerList, 
    {
      onSuccess: (data) => {
        console.log('Dữ liệu baby tracker:', data);
      },
      onError: (error) => {
        console.error('Lỗi khi lấy dữ liệu:', error);
      },
      refetchOnWindowFocus: false, 
      staleTime: 300000, 
      cacheTime: 600000, 
    }
  );
}