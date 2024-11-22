import { useMutation, useQuery, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { editBabyTrackerList, removeBabyTrackerList } from '../baby-tracker-service';
import { UpdateBabyTrackerParams } from '../baby-tracker-interface';

export function useUpdateBabyTracker() {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, UpdateBabyTrackerParams>(
    // Chấp nhận đối tượng có dạng `{ week, data }`
    (param: UpdateBabyTrackerParams) => editBabyTrackerList(param.week, param.data),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([QUERY_KEYS.LIST_BABY_TRACKERS]);
        console.log('Data updated successfully:', data);
      },
      onError: (error) => {
        console.error('Failed to update baby tracker:', error);
      },
    }
  );
}
