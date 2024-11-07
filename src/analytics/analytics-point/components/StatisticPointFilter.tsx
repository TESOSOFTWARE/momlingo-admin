import { Button, Card, Stack, TextField, MenuItem } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LoadingButton } from '@mui/lab';
import { Controller, useForm } from 'react-hook-form';
import { FormProvider, RHFTextField } from 'src/common/components/hook-form';
import Iconify from 'src/common/components/Iconify';
import { dispatch } from '../../../common/redux/store';
import RHFMultipleSelect from '../../../common/components/hook-form/RHFMultipleSelect';
import { useTranslation } from 'react-i18next';
import { IParamsStatisticPoint } from '../interfaces';
import { DEFAULT_VALUE_SEARCH_STATISTIC_POINT } from '../constants';
import { setSearchData } from '../statisticPoint.slice';

export default function FilterStatisticPoint() {
  const { t } = useTranslation();
  const methods = useForm<IParamsStatisticPoint>({
    defaultValues: DEFAULT_VALUE_SEARCH_STATISTIC_POINT,
  });
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = (data: any) => {
    const dataFilter: IParamsStatisticPoint = {
      startDate: data.startDate,
      endDate: data.endDate,
    };
    dispatch(setSearchData(dataFilter));
  };

  const handleClickDelete = () => {
    reset(DEFAULT_VALUE_SEARCH_STATISTIC_POINT);
    dispatch(setSearchData(DEFAULT_VALUE_SEARCH_STATISTIC_POINT));
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={2} padding={2} width={{md: '50%', sm: '100%'}}>
          <Stack direction="row" spacing={3} >
            <Controller
              name="startDate"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Stack position="relative" width="100%">
                  <DateTimePicker
                    {...field}
                    label={'Ngày bắt đầu'}
                    inputFormat="dd-MM-yyyy hh:mm a"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        helperText={errors.startDate && errors.startDate?.message}
                        error={!!errors.startDate}
                      />
                    )}
                  />
                </Stack>
              )}
            />

            <Controller
              name="endDate"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Stack position="relative" width="100%">
                  <DateTimePicker
                    {...field}
                    label={'Ngày kết thúc'}
                    inputFormat="dd-MM-yyyy hh:mm a"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        helperText={errors.endDate && errors.endDate?.message}
                        error={!!errors.endDate}
                      />
                    )}
                  />
                </Stack>
              )}
            />
          </Stack>

          <Stack
            direction="row"
            spacing={3}
            sx={{ display: 'flex', justifyContent: 'flex-start' }}
          >
            <LoadingButton
              variant="contained"
              startIcon={<Iconify icon="humbleicons:search" />}
              type="submit"
            >
              {t('filter')}
            </LoadingButton>
            <Button
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="ic:baseline-clear" />}
              onClick={handleClickDelete}
            >
              {t('clear')}
            </Button>
          </Stack>
        </Stack>
      </FormProvider>
    </>
  );
}

