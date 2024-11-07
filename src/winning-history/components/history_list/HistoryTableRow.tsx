import { TableCell, TableRow } from '@mui/material';
import { IDataListHistory, IDataTest } from 'src/winning-history/interface';

type Props = {
  data: IDataListHistory;
};

export default function HistoryTableRow({ data }: Props) {
  return (
    <>
      <TableRow hover>
        <TableCell align="left">{data?.id}</TableCell>
        <TableCell align="left">{data?.eventCode.event.merchant.email || ''}</TableCell>
        <TableCell align="left">
          {data?.eventCode.event.merchant.phoneNumber || ''}
        </TableCell>
        <TableCell align="left">{data?.gift.name}</TableCell>
        <TableCell align="left">{data?.eventCode.event.eventCode.expiresAt}</TableCell>
        <TableCell align="left">{data?.eventCode.code}</TableCell>
      </TableRow>
    </>
  );
}
