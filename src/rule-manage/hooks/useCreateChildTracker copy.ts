import { useMutation, useQueryClient } from 'react-query';
import { UpdateChildTrackerParams } from '../interfaces';
import { newChildTrackerByWeek } from '../services';
import { QUERY_KEYS } from '../../common/constants/queryKeys.constant';

export function useCreateChildTracker({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, UpdateChildTrackerParams>(
    // Mutation function which expects UpdateChildTrackerParams as argument
    (param: UpdateChildTrackerParams) => newChildTrackerByWeek(param.week, param),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([QUERY_KEYS.LIST_CHILD_TRACKERS]);
        onSuccess();
        console.log('Data updated successfully:', data);
      },
      onError: (error) => {
        onError();
        console.error('Failed to update child tracker:', error);
      },
    }
  );
}
