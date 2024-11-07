import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { FormProvider, RHFTextField } from 'src/common/components/hook-form';
import { useForm } from 'react-hook-form';

import dayjs from 'dayjs';
import { FORMAT_DATE_FILTER } from 'src/common/constants/common.constants';
import { IFormExport } from '../../interfaces';
import { exportQRCodeManage } from '../../services';
import { QRNewSchema } from '../../schema';
import { yupResolver } from '@hookform/resolvers/yup';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ExportModal({ open, onClose }: Props) {
  const methods = useForm<IFormExport>({
    resolver: yupResolver(QRNewSchema),
    defaultValues: { fileId: 0 },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    setValue,
  } = methods;

  const onSubmit = async (data: IFormExport) => {
    const dataResult = exportQRCodeManage(data.fileId)
      .then((res) => {
        const fileLink = document.createElement('a');

        const blob = new Blob([res?.data], {
          type: 'text/plain;charset=utf-8;',
        });

        const fileName = `${dayjs().format(FORMAT_DATE_FILTER)}-qr-sbps.csv`;
        fileLink.href = window.URL.createObjectURL(blob);
        fileLink.download = fileName;
        fileLink.click();
        onClose();
        setValue('fileId', 0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOnClose = () => {
    setValue('fileId', 0);
    onClose();
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm" onClose={handleOnClose}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Export QR Code</DialogTitle>
        <DialogContent sx={{ width: '100%' }}>
          <DialogContentText sx={{ marginBottom: '10px' }}>
            Please enter fileId
          </DialogContentText>
          <RHFTextField
            name={'fileId'}
            autoFocus
            label="FileId"
            type="text"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained">
            Download
          </Button>
          <Button onClick={handleOnClose} variant="contained" color="inherit">
            Cancel
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
