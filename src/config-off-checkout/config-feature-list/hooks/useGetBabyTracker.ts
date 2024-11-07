import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { getBabyTrackerList } from '../baby-tracker-service';
import { PregnancyWeekInfo } from '../baby-tracker-interface';


export function useGetBabyTracker() {
  return useQuery<PregnancyWeekInfo[]>(
    [QUERY_KEYS.LIST_BABY_TRACKERS], // Query key
    getBabyTrackerList, // Hàm lấy dữ liệu
    {
      onSuccess: (data) => {
        console.log('Dữ liệu baby tracker:', data);
      },
      onError: (error) => {
        console.error('Lỗi khi lấy dữ liệu:', error);
      },
      refetchOnWindowFocus: false, // Không tự động gọi lại khi focus vào tab
      staleTime: 300000, // Thời gian giữ dữ liệu mới (5 phút)
      cacheTime: 600000, // Thời gian lưu trữ dữ liệu trong bộ nhớ cache (10 phút)
    }
  );
}