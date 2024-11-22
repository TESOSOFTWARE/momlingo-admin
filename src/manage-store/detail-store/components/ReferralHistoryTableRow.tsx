import { TableCell, TableRow } from '@mui/material';
import { IHistoriesExternalTableRow } from '../../interfaces';
import { formatDate } from '../../../common/constants/common.utils';

export const ReferralHistoryTableRow = ({ row }: IHistoriesExternalTableRow) => {
  return (
    <>
      <TableRow hover>
        <TableCell align="center">{row?.id}</TableCell>
        <TableCell align="left">{row?.user?.customer?.phoneNumber}</TableCell>
        <TableCell align="left">{row?.user?.customer?.name}</TableCell>
        <TableCell align="center">{formatDate(row?.createdAt)}</TableCell>
        <TableCell align="center">
          {row?.firstScan?.createdAt ? formatDate(row?.firstScan?.createdAt) : 'Chưa có'}
        </TableCell>
      </TableRow>
    </>
  );
};
