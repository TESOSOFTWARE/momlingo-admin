import { useQuery } from 'react-query';
import { getChildTrackerByWeek } from '../services';

export function useGetBabyTrackerWeek(week: string) {
  return useQuery(
    ['babyTracker', week], // Query key, cần phải duy trì sự khác biệt cho mỗi tuần
    () => getChildTrackerByWeek(week), // Hàm lấy dữ liệu
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
