import { Button, Card, Stack, TextField, MenuItem } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LoadingButton } from '@mui/lab';
import { Controller, useForm } from 'react-hook-form';
import { FormProvider, RHFTextField } from 'src/common/components/hook-form';
import Iconify from 'src/common/components/Iconify';
import { dispatch } from '../../../common/redux/store';
import { useTranslation } from 'react-i18next';
import { IFormSearchStatisticScan, IParamsStatisticScan } from '../interfaces';
import { setProvincePicked, setSearchData } from '../statisticScan.slice';
import { DEFAULT_VALUE_SEARCH_STATISTIC_SCAN } from '../constants';
import RHFMultipleSelect from '../../../common/components/hook-form/RHFMultipleSelect';
import { useGetProvinceScan } from '../hooks/useGetProvinceScan';
import RHFSearchSelect from '../../../common/components/hook-form/RHFSelectSearch';

export default function FilterStatisticScan() {
  const { t } = useTranslation();
  const methods = useForm<IFormSearchStatisticScan>({
    defaultValues: DEFAULT_VALUE_SEARCH_STATISTIC_SCAN,
  });
  const {
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = methods;

  const onSubmit = (data: any) => {
    const dataFilter: IParamsStatisticScan = {
      provinceKeys: ['ALL', 'UNKNOWN', ...data.provinceId.map((item: any) => item.id)],
      startDate: data.startDate,
      endDate: data.endDate,
    };
    dispatch(setSearchData(dataFilter));
    dispatch(setProvincePicked(data?.provinceId));
  };

  const handleClickDelete = () => {
    reset({
      startDate: null,
      endDate: null,
      provinceId: [],
    });
    dispatch(
      setSearchData({
        startDate: null,
        endDate: null,
        provinceKeys: ['ALL', 'UNKNOWN'],
      })
    );
  };

  const { data: listProvince } = useGetProvinceScan({
    type: 'PROVINCE',
    page: 1,
    limit: 100,
  });
  const provinceData = listProvince?.items || [];
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={2} padding={2}>
          <RHFSearchSelect
            multiple={true}
            name="provinceId"
            options={provinceData}
            labelProp="name"
            valueProp="id"
            label="Tỉnh thành"
          />
          <Stack direction="row" spacing={3}>
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
