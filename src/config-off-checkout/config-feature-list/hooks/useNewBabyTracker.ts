import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { UpdateBabyTrackerParams } from '../baby-tracker-interface';
import { newBabyTrackerList } from '../baby-tracker-service';

export function useNewBabyTracker() {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, any>(
    // Chấp nhận đối tượng có dạng `{ week, data }`
    (param: any) => newBabyTrackerList(param),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([QUERY_KEYS.LIST_BABY_TRACKERS]);
        console.log('Add new baby tracker successfully:', data);
      },
      onError: (error) => {
        console.error('Failed to add new baby tracker:', error);
      },
    }
  );
}
