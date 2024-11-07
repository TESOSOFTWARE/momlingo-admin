import { id } from 'date-fns/locale';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { ICodeCallback } from '../../code-common/interface';
import { getEventById } from '../edit.service';

export const useGetEventById = ({
  eventId,
  callback,
}: {
  eventId: number;
  callback: ICodeCallback;
}) =>
  useQuery([QUERY_KEYS.EVENT_DETAIL, eventId], () => getEventById(eventId), {
    onSuccess() {},
    onError() {
      callback.onError && callback.onError();
    },
  });
