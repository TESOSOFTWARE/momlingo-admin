// @mui
import { TableRow, TableCell, Skeleton } from '@mui/material';

// ----------------------------------------------------------------------
type Props = {
  isNotFound: boolean;
};
export default function ProductListSkeleton({ isNotFound }: Props) {
  return (
    <>
      <TableRow>
        {isNotFound ? (
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
            <TableCell align="left">
              <Skeleton />
            </TableCell>
          </>
        ) : (
          <TableCell colSpan={12} sx={{ p: 0 }} />
        )}
      </TableRow>
    </>
  );
}
