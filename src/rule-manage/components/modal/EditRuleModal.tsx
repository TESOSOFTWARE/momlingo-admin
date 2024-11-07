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
import {
  IFormChangeRuleConfig,
  IFormRuleConfigItem,
  IRuleConfig,
} from '../../interfaces';
import useShowSnackbar from '../../../common/hooks/useMessage';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaChangeRuleConfig } from '../../shema';
import { useEditRuleConfig } from '../../hooks/useEditRuleConfig';
import {
  RHFSwitch,
  RHFTextField,
  FormProvider,
} from '../../../common/components/hook-form';
import {
  listRuleConfigSelector,
  ruleConfigRowItemsSelector,
  setIsOpenConfirmModal,
} from '../../rule.slice';
import { DEFAULT_MAIN_COLOR } from '../../../common/constants/common.constants';

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  configRuleList?: any;
};
export default function RuleConfigModal(prop: ConfirmModalProps) {
  const { isOpen, onClose } = prop;
  const { showSuccessSnackbar, showErrorSnackbar } = useShowSnackbar();
  const { t } = useTranslation();
  const methods = useForm<any>({
    // resolver: yupResolver(schemaChangeRuleConfig),
    defaultValues: {
      desc: '',
      status: false,
    },
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
  const { mutate, isSuccess } = useEditRuleConfig({
    onSuccess: () => {
      showSuccessSnackbar(t('featureConfig.editSuccess'));
    },
    onError: () => {
      showErrorSnackbar(t('featureConfig.editError'));
    },
  });

  const configRuleList = useSelector(listRuleConfigSelector);
  const rule = useSelector(ruleConfigRowItemsSelector);
  // console.log('333', rule);

  useEffect(() => {
    reset(rule);
    Object?.keys(rule?.values).forEach((rule1) => {
      setValue(rule1, rule?.values[rule1]);
    })
  }, [rule]);

  const onSubmitForm = (data: any) => {
    const dataValue = {
      ...data,
    };
    delete dataValue.desc;
    delete dataValue.status;
    delete dataValue.code;
    delete dataValue.values;

    Object?.values(dataValue).forEach((item) => {
      return parseInt(item as string);
    });

    const dataRule = {
      ...configRuleList,
      [rule?.code]: {
        desc: data?.desc,
        status: data?.status,
        values: {
          ...dataValue,
        },
      },
    };
    const dataEdit = {
      ruleConfig: dataRule,
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
          <DialogTitle sx={{ textTransform: 'capitalize' }}>
            {t('ruleManage.detail')}
          </DialogTitle>
          <DialogContent sx={{ marginTop: '20px' }}>
            <Stack spacing={3}>
              <DialogContentText>
                {t('ruleManage.detail')}: {rule?.code}
              </DialogContentText>
              <RHFTextField label={t('ruleManage.desc')} name="desc" />

              <RHFSwitch
                label={t('ruleManage.status')}
                name="status"
                checked={rule?.status}
              />
              <Stack
                spacing={2}
                padding={2}
                sx={{
                  borderRadius: '8px',
                  boxShadow: 10,
                  background: `linear-gradient(to right bottom, white, ${DEFAULT_MAIN_COLOR})`,
                }}
              >
                {Object?.keys(rule?.values || {})?.map((ruleItem) => (
                  <RHFTextField
                    key={ruleItem}
                    label={ruleItem}
                    name={ruleItem}
                    type='number'
                  />
                ))}
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} variant="contained" color="inherit">
              {t('ruleManage.cancel')}
            </Button>
            <Button type="submit" variant="contained">
              {t('ruleManage.save')}
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
}
