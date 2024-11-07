import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  FormHelperText,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormProvider, RHFTextField } from '../../../common/components/hook-form';
import Iconify from '../../../common/components/Iconify';
import useMessage from '../../../common/hooks/useMessage';
import { dispatch } from '../../../common/redux/store';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { RHFSelectPagitnationPolicy } from '../../common/components/RHFSelectPaginationPolicy';
import { getPolicy } from '../../common/service';
import { useNewAgent } from '../hooks/useNewAgent';
import { IDataNewAgent, INewAgent } from '../interface';
import { newAgentSchema } from '../schema/schema';
import {
  isConfirmPassword,
  isShowPassword,
  setShowConfirmPassword,
  setShowPassword,
} from '../slice';

export default function NewAgentForm() {
  const methods = useForm<IDataNewAgent>({
    resolver: yupResolver(newAgentSchema),
  });

  const navigation = useNavigate();
  const { t } = useTranslation();

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { mutate, isLoading } = useNewAgent({
    onSuccess: () => {
      showSuccessSnackbar('Tạo mới Admin thành công');
      navigation(PATH_DASHBOARD.manageAgent.list);
    },
    onError: () => showErrorSnackbar('Tạo mới Admin thất bại'),
  });

  const onSubmit = (data: IDataNewAgent) => {
    const newData: INewAgent = {
      email: data.email,
      password: data.confirmPassword,
      groupPolicyIds: data.groupPolicyIds.map((item) => item.value),
    };
    mutate({ data: newData });
  };

  const showPassword = useSelector(isShowPassword);
  const confirmPassword = useSelector(isConfirmPassword);
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Stack direction="column" spacing={3}>
          <RHFTextField
            name="email"
            label={t('manageAgent.new.labelEmail')}
            type={'email'}
          />
          <RHFTextField
            name="newPassword"
            type={showPassword ? 'text' : 'password'}
            label={t('manageAgent.new.labelPassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => dispatch(setShowPassword(!showPassword))}
                    edge="end"
                  >
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <RHFTextField
            name="confirmPassword"
            type={confirmPassword ? 'text' : 'password'}
            label={t('manageAgent.new.labelConfirmPassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => dispatch(setShowConfirmPassword(!confirmPassword))}
                    edge="end"
                  >
                    <Iconify
                      icon={confirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Stack direction="column" spacing={1}>
            <RHFSelectPagitnationPolicy
              name={'groupPolicyIds'}
              getAsyncData={getPolicy}
              placeholder={t('manageAgent.new.labelGrPolicy')}
              error={errors}
            />
            <FormHelperText sx={{ color: 'red', paddingLeft: '17px' }}>
              {errors?.groupPolicyIds?.message}
            </FormHelperText>
          </Stack>
        </Stack>

        <Stack
          direction="row"
          spacing={3}
          sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 3 }}
        >
          <LoadingButton
            variant="contained"
            startIcon={<Iconify icon="ic:outline-person-add-alt" />}
            type="submit"
            loading={isLoading}
          >
            {t('create')}
          </LoadingButton>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="ph:x-circle" />}
            onClick={() => navigation(PATH_DASHBOARD.manageAgent.list)}
          >
            {t('cancel')}
          </Button>
        </Stack>
      </Paper>
    </FormProvider>
  );
}
