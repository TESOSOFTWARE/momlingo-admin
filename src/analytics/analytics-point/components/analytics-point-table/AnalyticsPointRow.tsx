import { TableCell, TableRow } from '@mui/material';
import { IPropsTableRow } from '../../interfaces';

function AnalyticsPointRow({ row, ordinal }: IPropsTableRow) {
  const { total, date } = row;
  return (
    <TableRow hover>
      <TableCell align="center">{ordinal}</TableCell>
      <TableCell align="center">{date}</TableCell>
      <TableCell align="center">{total}</TableCell>
    </TableRow>
  );
}

export default AnalyticsPointRow;
