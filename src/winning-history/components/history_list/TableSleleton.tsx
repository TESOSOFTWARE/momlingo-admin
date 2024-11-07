import { TableRow, TableCell, Skeleton } from '@mui/material';

type Props = {
  isLoading: boolean;
};

export default function TableSleleton({ isLoading }: Props) {
  return (
    <TableRow>
      {isLoading ? (
        <>
          <TableCell align="left">
            <Skeleton />
          </TableCell>
          <TableCell align="left">
            <Skeleton />
          </TableCell>
          <TableCell align="left">
            <Skeleton />
          </TableCell>
          <TableCell align="left">
            <Skeleton />
          </TableCell>
          <TableCell align="left">
            <Skeleton />
          </TableCell>
          <TableCell align="left">
            <Skeleton />
          </TableCell>
        </>
      ) : (
        <TableCell colSpan={12} sx={{ p: 0 }} />
      )}
    </TableRow>
  );
}
