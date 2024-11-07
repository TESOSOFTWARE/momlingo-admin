import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Container, Stack, Button, InputAdornment } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFTextField } from 'src/common/components/hook-form';
import Iconify from 'src/common/components/Iconify';
import { dispatch, useSelector } from 'src/common/redux/store';
import { defaultValueSearch } from '../../../request-management/request-list/list-constants';
import vn from 'src/common/locales/vn';
import { useTranslation } from 'react-i18next';
import { setSearchForm } from '../storeInMap.slice';

type Props = {
  onSetPage: (value: number) => void;
};

export default function StoreFilter({ onSetPage }: Props) {
  const { t } = useTranslation();
  const methods = useForm<{ name: string }>({
    defaultValues: {
      name: '',
    },
  });
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = methods;

  const onSubmit = (data: { name: string }) => {
    const dataSearch = data.name;
    onSetPage(0);
    dispatch(setSearchForm(dataSearch));
  };
  const handleClickClear = () => {
    reset({
      name: '',
    });
    dispatch(setSearchForm(''));
  };
  return (
    <Container>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={2} sx={{ paddingBottom: 3 }}>
          <Stack direction="row" spacing={1}>
            <RHFTextField
              size="small"
              name="name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify
                      icon={'eva:search-fill'}
                      sx={{ color: 'text.disabled', width: 20, height: 20 }}
                    />
                  </InputAdornment>
                ),
              }}
              placeholder="Tìm kiếm theo tên"
            />
            <LoadingButton
              size="small"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{ minWidth: '100px!important' }}
              startIcon={<Iconify icon="material-symbols:filter-alt" />}
            >
              {vn.filter}
            </LoadingButton>
            <Button
              size="small"
              color="inherit"
              sx={{ minWidth: '100px!important' }}
              variant="contained"
              onClick={handleClickClear}
              startIcon={<Iconify icon="ph:x-bold" />}
            >
              {vn.cancel}
            </Button>
          </Stack>
        </Stack>
      </FormProvider>
    </Container>
  );
}
