// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { IconButton, InputAdornment, Stack, Typography } from '@mui/material';
// components
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { dispatch, useDispatch } from 'src/common/redux/store';
import { PATH_AUTH, PATH_DASHBOARD } from 'src/common/routes/paths';
import {
  FormProvider,
  RHFCheckbox,
  RHFTextField,
} from '../../../common/components/hook-form';
import Iconify from '../../../common/components/Iconify';
import { defaultValues } from '../constants';
import { useAuthlogin } from '../hook/useLogin';
import { IFormLoginValuesProps } from '../interface/interface';
import {
  setShowPassword,
  showPasswordSelector,
  setEmail,
  setPolicies,
} from '../login.slice';
import { LoginSchema } from '../schema/login.schema';
import { Link } from 'react-router-dom';
import { setMerchantInfo } from 'src/profile/common/reducers/merchant-profile.slice';
import { useGetMerchantInfo } from '../hook/useGetMerchantInfo';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import { setLogin } from '../auth.slice';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const { useDeepCompareEffect } = useDeepEffect();
  const showPassword = useSelector(showPasswordSelector);
  const dispatch = useDispatch();
  const methods = useForm<IFormLoginValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;
  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = () => {
    enqueueSnackbar('Đăng nhập thành công', {
      variant: 'success',
      autoHideDuration: 1000,
    });
  };
  const onError = () => {
    enqueueSnackbar('Đăng nhập thất bại ! xin kiểm tra lại thông tin', {
      variant: 'error',
    });
  };

  const { mutate, isSuccess } = useAuthlogin({ onSuccess, onError });

  useDeepCompareEffect(() => {
    if (isSuccess) {
      dispatch(setLogin(true));
      navigate(PATH_DASHBOARD.root);
    }
  }, [isSuccess]);

  const onSubmit = (data: IFormLoginValuesProps) => {
    dispatch(setEmail(data.email));
    mutate({ email: data.email, password: data.password });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email" />
        <RHFTextField
          name="password"
          label="Mật khẩu"
          type={showPassword ? 'text' : 'password'}
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
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <RHFCheckbox name="remember" label="Ghi nhớ đăng nhập" />
        {/* <Typography sx={{ fontSize: '13px' }}>
          <Link to={PATH_AUTH.forgotPassword}>Forgot Password</Link>
        </Typography> */}
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Đăng nhập
      </LoadingButton>
    </FormProvider>
  );
}
