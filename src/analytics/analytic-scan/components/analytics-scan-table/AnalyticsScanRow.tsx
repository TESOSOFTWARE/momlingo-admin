import { TableCell, TableRow } from '@mui/material';
import { IPropsTableRow } from '../../interfaces';

function AnalyticsScanRow({ row, ordinal }: IPropsTableRow) {
  const { data } = row;
  return (
    <TableRow hover>
      <TableCell align="center">{ordinal}</TableCell>
      <TableCell align="center">{data.date}</TableCell>
      <TableCell align="center">{data.ALL}</TableCell>
    </TableRow>
  );
}

export default AnalyticsScanRow;
