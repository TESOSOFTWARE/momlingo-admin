import { TableCell, TableRow } from '@mui/material';
import { IPropTableRow } from '../../interface';
import { fDateTime24h } from '../../../../common/utils/formatTime';

function GameWinHistoryTableRow({ row }: IPropTableRow) {
  const { createdAt, customer, game, gameGift } = row;
  return (
    <TableRow hover>
      <TableCell align="center">{customer.name}</TableCell>
      <TableCell align="center">{customer.phoneNumber}</TableCell>
      <TableCell align="center">{gameGift.name}</TableCell>
      <TableCell align="center">{fDateTime24h(createdAt)}</TableCell>
      <TableCell align="center">{game.name}</TableCell>
    </TableRow>
  );
}

export default GameWinHistoryTableRow;
