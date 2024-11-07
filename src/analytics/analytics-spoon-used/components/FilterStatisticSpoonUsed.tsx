import { Button, Card, Stack, TextField, MenuItem } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LoadingButton } from '@mui/lab';
import { Controller, useForm } from 'react-hook-form';
import { FormProvider, RHFTextField } from 'src/common/components/hook-form';
import Iconify from 'src/common/components/Iconify';
import { dispatch } from '../../../common/redux/store';
import { useTranslation } from 'react-i18next';
import { IParamsStatisticSpoon } from '../interfaces';
import { DEFAULT_VALUE_SEARCH_STATISTIC_SPOON } from '../constants';
import { setSearchData } from '../statisticSpoonUsed.slice';
import { LabelStyle } from '../../../config-home/components/banners-section/BannerConfig';

export default function FilterStatisticSpoonUsed() {
  const { t } = useTranslation();
  const methods = useForm<IParamsStatisticSpoon>({
    defaultValues: DEFAULT_VALUE_SEARCH_STATISTIC_SPOON,
  });
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = (data: any) => {
    const dataFilter: IParamsStatisticSpoon = {
      status: 'USED',
      startDate: data.startDate,
      endDate: data.endDate,
    };
    dispatch(setSearchData(dataFilter));
  };

  const handleClickClear = () => {
    reset(DEFAULT_VALUE_SEARCH_STATISTIC_SPOON);
    dispatch(setSearchData(DEFAULT_VALUE_SEARCH_STATISTIC_SPOON));
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" justifyContent="center" spacing={2}>
          <LabelStyle>Lọc cho tổng quan & chi tiết</LabelStyle>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <Stack position="relative" width="100%">
                <DateTimePicker
                  {...field}
                  label={t('Request_startDate')}
                  inputFormat="dd/MM/yyyy HH:mm:ss"
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      {...params}
                      fullWidth
                      helperText={errors.startDate && errors.startDate?.message}
                      error={!!errors.startDate}
                      type="number"
                    />
                  )}
                />
              </Stack>
            )}
          />

          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <Stack position="relative" width="100%">
                <DateTimePicker
                  {...field}
                  label={t('Request_endDate')}
                  inputFormat="dd/MM/yyyy HH:mm:ss"
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      {...params}
                      fullWidth
                      helperText={errors.endDate && errors.endDate?.message}
                      error={!!errors.endDate}
                      type="number"
                    />
                  )}
                />
              </Stack>
            )}
          />
          <LoadingButton
            size="small"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{ minWidth: '100px!important' }}
            startIcon={<Iconify icon="material-symbols:filter-alt" />}
          >
            {t('filter')}
          </LoadingButton>
          <Button
            size="small"
            color="inherit"
            sx={{ minWidth: '100px!important' }}
            variant="contained"
            onClick={handleClickClear}
            startIcon={<Iconify icon="ph:x-bold" />}
          >
            {t('clear')}
          </Button>
        </Stack>
      </FormProvider>
    </>
  );
}
