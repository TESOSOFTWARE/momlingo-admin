import { Button, TableCell, TableRow, Chip } from '@mui/material';
import { IRequestExportItem } from '../../interfaces';
import { useRetryRequestExport } from '../../hooks/useRetryRequestExport';
import useMessage from 'src/common/hooks/useMessage';

type Props = {
  row: IRequestExportItem;
};

export const RequestExportTableRow = ({ row }: Props) => {
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { mutate } = useRetryRequestExport({
    onSuccess: () => {
      showSuccessSnackbar('Xuất file thành công');
    },
    onError: () => {
      showErrorSnackbar('Xuất file thất bại');
    },
  });

  const handleRetry = () => {
    mutate(row?.id);
  };

  return (
    <>
      <TableRow hover>
        <TableCell align="center">{row.id}</TableCell>
        <TableCell align="center">
          <Chip
            label={row.status}
            color={row.status === 'COMPLETED' ? 'success' : 'error'}
          />
        </TableCell>
        <TableCell align="center">{row.resource}</TableCell>
        <TableCell align="center">{row.fileName}</TableCell>
        <TableCell align="center">
          {row.file ? (
            <Button variant="contained" component="label">
              <a
                href={row.file?.url}
                download
                style={{
                  color: 'white',
                  fontStyle: 'normal',
                }}
              >
                Download csv
              </a>
            </Button>
          ) : (
            row.status === 'FAILED' && (
              <Button
                variant="contained"
                component="label"
                color="warning"
                onClick={handleRetry}
              >
                <span
                  style={{
                    color: 'white',
                    fontStyle: 'normal',
                    textDecoration: 'underline',
                  }}
                >
                  Retry
                </span>
              </Button>
            )
          )}
        </TableCell>
      </TableRow>
    </>
  );
};
