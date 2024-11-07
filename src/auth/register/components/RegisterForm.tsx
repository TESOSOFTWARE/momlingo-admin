import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Container, IconButton, InputAdornment, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { FormProvider, RHFTextField } from 'src/common/components/hook-form';
import Iconify from 'src/common/components/Iconify';
import useMessage from 'src/common/hooks/useMessage';
import en from 'src/common/locales/en';
import { dispatch } from 'src/common/redux/store';
import { useRegister } from '../hooks/useRegister';
import { defaultValuesRegister } from '../register.constants';
import { IFormRegister } from '../register.interface';
import { setShowPassword, showPasswordSelector } from '../register.slice';
import { RegisterSchema } from '../schema/register.schema';
import { useNavigate } from 'react-router-dom';
import { PATH_AUTH } from '../../../common/routes/paths';

export default function RegisterForm() {
  const showPassword = useSelector(showPasswordSelector);
  const methods = useForm<IFormRegister>({
    resolver: yupResolver(RegisterSchema),
    defaultValues: defaultValuesRegister,
  });
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { mutate } = useRegister({
    onSuccess: () => {
      showSuccessSnackbar(en.showSuccessRegister);
    },
    onError: () => {
      showErrorSnackbar(en.showFailRegister);
    },
  });

  const onSubmit = (data: IFormRegister) => {
    const newDataRegister = {
      email: data.email,
      password: data.password,
    };
    mutate(newDataRegister, {
      onSuccess: () => {
        navigate(PATH_AUTH.emailConfirmation);
      },
    });
  };

  return (
    <>
      <Container maxWidth="sm">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <RHFTextField name="email" label="Email Address" />
            <RHFTextField
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => dispatch(setShowPassword(!showPassword))}
                      edge="end"
                    >
                      <Iconify
                        icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <LoadingButton
              loading={isSubmitting}
              type="submit"
              fullWidth={true}
              variant="contained"
              size="large"
            >
              Register
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Container>
    </>
  );
}
