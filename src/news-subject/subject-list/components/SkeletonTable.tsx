import { Skeleton, TableCell, TableRow } from '@mui/material';

type Props = {
  isLoading: boolean;
  row: number;
};
export default function TableSkeleton({ isLoading, row }: Props) {
  return (
    <>
      {Array.from(Array(row)).map((index) => {
        return (
          <TableRow key={index}>
            {isLoading ? (
              <>
                {' '}
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
      })}
    </>
  );
}
