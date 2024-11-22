import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';

import { Controller, useForm } from 'react-hook-form';
import { Stack, Button } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import useShowSnackbar from '../../../common/hooks/useMessage';
import { IConfigApp } from '../../interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaConfigApp } from '../../schema';
import { DEFAULT_VALUE_CONFIG_APP } from '../../constants';
import { useEditConfigApp } from '../../hooks/useEditConfigApp';
import { pickedRowSelector, setIsOpenModal } from '../../configApp.slice';
import {
  FormProvider,
  RHFSwitch,
  RHFTextField,
} from '../../../common/components/hook-form';

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
};

export default function EditConfigAppModal(prop: ConfirmModalProps) {
  const { isOpen, onClose } = prop;
  const { showSuccessSnackbar, showErrorSnackbar } = useShowSnackbar();
  const { t } = useTranslation();

  const methods = useForm<IConfigApp>({
    resolver: yupResolver(schemaConfigApp),
    defaultValues: DEFAULT_VALUE_CONFIG_APP,
  });
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    getValues,
    formState: { isSubmitting, errors },
  } = methods;
  const dispatch = useDispatch();
  const { mutate, isSuccess } = useEditConfigApp({
    onSuccess: () => {
      showSuccessSnackbar('Chỉnh sửa thành công !');
    },
    onError: () => {
      showErrorSnackbar('Chỉnh sửa thất bại !');
    },
  });
  const itemConfigApp = useSelector(pickedRowSelector);

  useEffect(() => {
    setValue('mobileVersion', itemConfigApp?.mobileVersion);
  }, [itemConfigApp]);

  const onSubmitForm = (data: any) => {
    const dataEdit = {
      id: itemConfigApp.id,
      data: {
        mobileVersion: data?.mobileVersion,
        deviceType: itemConfigApp?.deviceType,
      },
    };
    mutate(dataEdit);
    dispatch(setIsOpenModal(false));
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={onClose}
        BackdropProps={{
          sx: {
            opacity: '0.1!important',
            background: 'black!important',
          },
        }}
        PaperProps={{
          elevation: 0,
          sx: { boxShadow: 0 },
        }}
        maxWidth="md"
        sx={{
          width: '100%',
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              minWidth: '200px', // Set your width here
            },
          },
        }}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmitForm)}>
          <DialogTitle>{t('configApp.modal.title')}</DialogTitle>
          <DialogContent sx={{ marginTop: '20px' }}>
            <Stack spacing={3}>
              <DialogContentText>
                {t('configApp.os')}: {itemConfigApp?.deviceType}
              </DialogContentText>
              <RHFTextField
                label={t('configApp.version')}
                type="number"
                name="mobileVersion"
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} variant="contained" color="inherit">
              {t('cancel')}
            </Button>
            <Button type="submit" variant="contained">
              {t('edit')}
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
}
