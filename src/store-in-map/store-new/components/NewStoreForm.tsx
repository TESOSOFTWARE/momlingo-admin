import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button, Paper, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormProvider, RHFTextField } from '../../../common/components/hook-form';
import Iconify from '../../../common/components/Iconify';
import useMessage from '../../../common/hooks/useMessage';
import { usePostStore } from '../hooks/usePostStore';
import { NewStoreSchema } from '../../common/schema';
import { INewStore } from '../../common/interface';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../common/routes/paths';

export default function NewStoreForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const methods = useForm<INewStore>({
    resolver: yupResolver(NewStoreSchema),
  });
  const { handleSubmit } = methods;

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { mutate, isLoading } = usePostStore({
    onSuccess: () => {
      showSuccessSnackbar(t('storeInMap.new.successBar'));
      navigate(PATH_DASHBOARD.storeInMap.list);
    },
    onError: () => showErrorSnackbar(t('storeInMap.new.errorBar')),
  });
  const onSubmit = (data: INewStore) => {
    const newData: INewStore = {
      name: data.name,
      address: data.address,
      lat: data.lat,
      long: data.long,
    };
    mutate(newData);
  };
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Stack spacing={3}>
            <RHFTextField name="name" label="Tên cửa hàng" />
            <RHFTextField name="address" label="Địa chỉ" />
            <RHFTextField type="number" name="long" label="Kinh độ" />
            <RHFTextField type="number" name="lat" label="Vĩ độ" />
          </Stack>
        </Paper>
        <Stack
          direction={'row'}
          spacing={3}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: 3,
            marginRight: 5,
          }}
        >
          <LoadingButton
            loading={isLoading}
            type="submit"
            variant="contained"
            startIcon={<Iconify icon="material-symbols:add-circle-outline-rounded" />}
          >
            {t('create')}
          </LoadingButton>
          <Button
            color={'inherit'}
            variant="contained"
            startIcon={<Iconify icon="material-symbols:cancel-outline-rounded" />}
            onClick={() => {
              navigate(PATH_DASHBOARD.storeInMap.list);
            }}
          >
            {t('cancel')}
          </Button>
        </Stack>
      </FormProvider>
    </>
  );
}
