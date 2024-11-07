import { Button, TableCell, TableRow, Chip } from '@mui/material';
import { IFileImport } from '../interfaces';
import { STATUS_FILE } from '../constants';
import { formatDate } from '../../common/constants/common.utils';
import { useRetryImportFile } from '../hooks/useRetryImportFile';
import useMessage from 'src/common/hooks/useMessage';
import { useTranslation } from 'react-i18next';

type Props = {
  row: IFileImport;
};

export function ImportFileTableRow({ row }: Props) {
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { t } = useTranslation();
  const { mutate } = useRetryImportFile({
    onSuccess: () => {
      showSuccessSnackbar(t('fileList.retrySuccess'));
    },
    onError: () => {
      showErrorSnackbar(t('fileList.retryFailed'));
    },
  });

  const handleRetry = () => {
    mutate(row?.id);
  };

  return (
    <>
      <TableRow hover>
        <TableCell align="center">{row?.id}</TableCell>
        <TableCell align="center">
          <Chip
            label={STATUS_FILE[row?.status].name}
            sx={{
              background: STATUS_FILE[row?.status].color,
              color: 'white',
              minWidth: 120,
              textTransform: 'uppercase',
              fontWeight: 700,
            }}
          />
        </TableCell>
        <TableCell align="center">{row?.resource}</TableCell>
        <TableCell align="center">{formatDate(row?.createdAt)}</TableCell>
        {row?.status === 'FAILED' ? (
          <TableCell align="center">
            <Button variant="contained" component="label" onClick={handleRetry}>
              Nhập lại
            </Button>
          </TableCell>
        ) : null}
      </TableRow>
    </>
  );
}
