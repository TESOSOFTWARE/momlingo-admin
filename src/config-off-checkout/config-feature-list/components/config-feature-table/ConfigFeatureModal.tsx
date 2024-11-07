import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';
import {
  FormProvider,
  RHFSwitch,
  RHFTextField,
} from '../../../../common/components/hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DEFAULT_VALUE_FEATURE_CONFIG } from '../../constants';
import { schemaChangeFeatureConfig } from '../../shema';
import {
  IConfigFeatureItem,
  IConfigFeatureListForm,
  IFormChangeFeatureConfig,
} from '../../config-feature-interface';
import { Controller, useForm } from 'react-hook-form';
import { Stack, Button } from '@mui/material';
import useMessage from '../../../../common/hooks/useMessage';
import { useEditConfigFeature } from '../../hooks/useEditConfigFeature';
import { useDispatch, useSelector } from 'react-redux';
import {
  featureConfigRowItemsSelector,
  setIsOpenConfirmModal,
} from '../../config-feature-slice';
import { useEffect } from 'react';

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  rowCode: string;
  nameFeature: string;
  status: boolean;
  configFeatureList?: IConfigFeatureListForm;
};
export default function ConfirmChangeConfigFeatureModal(prop: ConfirmModalProps) {
  const { isOpen, onClose, rowCode, nameFeature, status } = prop;
  let { configFeatureList } = prop;
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { t } = useTranslation();
  const methods = useForm<IFormChangeFeatureConfig>({
    resolver: yupResolver(schemaChangeFeatureConfig),
    defaultValues: DEFAULT_VALUE_FEATURE_CONFIG,
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
  const { mutate, isSuccess } = useEditConfigFeature({
    onSuccess: () => {
      showSuccessSnackbar(t('featureConfig.editSuccess'));
    },
    onError: () => {
      showErrorSnackbar(t('featureConfig.editError'));
    },
  });
  const feature = useSelector(featureConfigRowItemsSelector);
  useEffect(() => {
    setValue('name', feature?.desc);
    setValue('status', feature?.status);
  }, [feature]);

  const onSubmitForm = (data: any) => {
    configFeatureList = {
      ...configFeatureList,
      [feature?.code]: {
        desc: data?.name,
        status: data?.status,
      },
    };
    const dataEdit = {
      featureConfig: configFeatureList,
    };

    mutate(dataEdit);
    dispatch(setIsOpenConfirmModal(false));
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
          <DialogTitle>{t('featureConfig.modal.title')}</DialogTitle>
          <DialogContent sx={{ marginTop: '20px' }}>
            <Stack spacing={3}>
              <DialogContentText>
                {t('featureConfig.modal.description')}
              </DialogContentText>
              <RHFTextField label={t('featureConfig.modal.name')} name="name" />
              <RHFSwitch
                label={t('featureConfig.modal.status')}
                name="status"
                checked={feature?.status}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} variant="contained" color="inherit">
              {t('featureConfig.button.cancel')}
            </Button>
            <Button type="submit" variant="contained">
              {t('featureConfig.button.edit')}
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
}
