import { getRequestById } from '../service';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { ICallback } from '../interface';

export const useGetRequestById = ({
  fileId,
  callback,
}: {
  fileId: number;
  callback: ICallback;
}) => useQuery([QUERY_KEYS.REQUEST_BY_ID, fileId], () => getRequestById(fileId));
