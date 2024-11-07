import { useMutation, useQuery, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { getBabyTrackerByWeek } from '../baby-tracker-service';
import { UpdateBabyTrackerParams } from '../baby-tracker-interface';


export function useGetBabyTrackerWeek(week: string) {
  return useQuery(
    ['babyTracker', week], // Query key, cần phải duy trì sự khác biệt cho mỗi tuần
    () => getBabyTrackerByWeek(week), // Hàm lấy dữ liệu
    {
      enabled: !!week, // Chỉ gọi query khi có tham số `week`
      onSuccess: (data) => {
        console.log('Data fetched successfully:', data);
      },
      onError: (error) => {
        console.error('Error fetching data:', error);
      },
    }
  );
}
