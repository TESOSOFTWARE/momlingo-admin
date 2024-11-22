import { useMutation, useQuery, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { removeBabyTrackerList } from '../baby-tracker-service';

export function useRemoveBabyTracker() {
  const queryClient = useQueryClient();

  return useMutation(
    (param: string) => removeBabyTrackerList(param), // Now correctly returns a Promise
    {
      onSuccess: () => {
        // Invalidate the list of baby trackers to refetch the data after deletion
        queryClient.invalidateQueries([QUERY_KEYS.LIST_BABY_TRACKERS]);
        console.log('Item removed successfully');
      },
      onError: (error) => {
        console.error('Failed to remove baby tracker:', error);
      },
    }
  );
}
