import { Button, Card, Stack, TextField, MenuItem } from '@mui/material';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import { LoadingButton } from '@mui/lab';
import { Controller, useForm } from 'react-hook-form';
import { FormProvider, RHFTextField } from 'src/common/components/hook-form';
import Iconify from 'src/common/components/Iconify';
import { dispatch } from '../../../common/redux/store';
import { INewsParams } from '../interface';
import { defaultValueFilter } from '../constant';
import { dataFilter, setDataFilter } from '../slice';
import RHFMultipleSelect from '../../../common/components/hook-form/RHFMultipleSelect';
import { useTranslation } from 'react-i18next';
import { subjectFilter } from '../../news-common/constant';
import { RHFSelectPagitnationMultiple } from '../../../common/components/hook-form/RHFSelectPaginationMutiple';
import { getNewsSubject } from '../../news-common/service';
import { useGetSubject } from '../../hooks/useGetSubject';

type Props = {
  onSetPage: (value: number) => void;
};

function NewsFilter({ onSetPage }: Props) {
  const { t } = useTranslation();
  const methods = useForm<INewsParams>({
    defaultValues: defaultValueFilter,
  });
  const {
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = (data: INewsParams) => {
    const dataFilter: INewsParams = {
      title: data.title,
      subjectIds: data.subjectIds,
      fromDate: data.fromDate,
      toDate: data.toDate,
    };
    onSetPage(0);
    dispatch(setDataFilter(dataFilter));
  };

  const handleClickDelete = () => {
    reset({
      title: '',
      subjectIds: [],
      fromDate: null,
      toDate: null,
    });
    dispatch(setDataFilter(defaultValueFilter));
  };

  const { data, isLoading } = useGetSubject({
    page: undefined,
    limit: undefined,
  });

  const listSubject = data?.items || [];

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={2} padding={2}>
          <Stack direction="row" spacing={3}>
            <RHFTextField name="title" label={t('news.list.labelTitle')} type="string" />
            <RHFMultipleSelect
              name="subjectIds"
              fullWidth
              label={t('news.list.labelSubject')}
              SelectProps={{ native: false, multiple: true }}
            >
              <MenuItem value="" disabled />
              {listSubject?.map((subject) => (
                <MenuItem key={subject?.id} value={subject?.id}>
                  {subject?.subjectDetails[0]?.name}
                </MenuItem>
              ))}
            </RHFMultipleSelect>
          </Stack>

          <Stack direction="row" spacing={3}>
            <Controller
              name="fromDate"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Stack position="relative" width="100%">
                  <DatePicker
                    {...field}
                    label={'Ngày bắt đầu'}
                    inputFormat="dd-MM-yyyy"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        helperText={errors.fromDate && errors.fromDate?.message}
                        error={!!errors.fromDate}
                      />
                    )}
                  />
                </Stack>
              )}
            />

            <Controller
              name="toDate"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Stack position="relative" width="100%">
                  <DatePicker
                    {...field}
                    label={'Ngày kết thúc'}
                    inputFormat="dd-MM-yyyy"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        helperText={errors.toDate && errors.toDate?.message}
                        error={!!errors.toDate}
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
              {t('news.list.search')}
            </LoadingButton>
            <Button
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="ic:baseline-clear" />}
              onClick={handleClickDelete}
            >
              {t('news.list.clear')}
            </Button>
          </Stack>
        </Stack>
      </FormProvider>
    </>
  );
}

export default NewsFilter;
