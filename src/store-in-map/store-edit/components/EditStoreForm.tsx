import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button, Paper, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useMessage from '../../../common/hooks/useMessage';
import { INewStore, IStoreItem } from '../../common/interface';
import { NewStoreSchema } from '../../common/schema';
import { useGetStoreById } from '../hooks/useGetStoreById';
import { FormProvider, RHFTextField } from '../../../common/components/hook-form';
import Iconify from '../../../common/components/Iconify';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import { useUpdateStore } from '../hooks/useUpdateStore';
import { PATH_DASHBOARD } from '../../../common/routes/paths';

export default function EditStoreForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const methods = useForm<IStoreItem>({ resolver: yupResolver(NewStoreSchema) });
  const { handleSubmit, reset } = methods;

  const { id } = useParams();
  const idStore = parseInt(id as string);

  const { data: dataStoreDetail } = useGetStoreById(idStore);

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { mutate, isLoading } = useUpdateStore({
    onSuccess: () => {
      showSuccessSnackbar(t('storeInMap.edit.successBar'));
      navigate(PATH_DASHBOARD.storeInMap.list);
    },
    onError: () => showErrorSnackbar(t('storeInMap.edit.errorBar')),
  });

  const onSubmit = (data: IStoreItem) => {
    mutate(data);
  };

  useEffect(() => {
    if (dataStoreDetail) reset(dataStoreDetail);
  }, [dataStoreDetail]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Stack spacing={3}>
          <RHFTextField
            name="name"
            label="Tên cửa hàng"
            InputLabelProps={{ shrink: true }}
          />
          <RHFTextField
            name="address"
            label="Địa chỉ"
            InputLabelProps={{ shrink: true }}
          />
           <RHFTextField
            name="long"
            label="Kinh độ"
            InputLabelProps={{ shrink: true }}
          />
           <RHFTextField
            name="lat"
            label="Vĩ độ"
            InputLabelProps={{ shrink: true }}
          />
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
          startIcon={<EditIcon />}
        >
          {t('edit')}
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
  );
}
