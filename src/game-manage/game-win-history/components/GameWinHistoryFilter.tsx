import { Button, Card, Stack, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LoadingButton } from '@mui/lab';
import { Controller, useForm } from 'react-hook-form';
import { FormProvider, RHFTextField } from 'src/common/components/hook-form';
import Iconify from 'src/common/components/Iconify';
import { dispatch } from '../../../common/redux/store';
import { defaultValueFilter } from '../constant';
import { setDataFilter } from '../slice';
import { useTranslation } from 'react-i18next';
import { IParamsListHistory } from '../interface';

type Props = {
  onSetPage: (value: number) => void;
};

function GameWinHistoryFilter({ onSetPage }: Props) {
  const { t } = useTranslation();
  const methods = useForm<IParamsListHistory>({
    defaultValues: defaultValueFilter,
  });
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = (data: IParamsListHistory) => {
    const dataFilter: IParamsListHistory = {
      gameGiftId: data.gameGiftId,
      searchText: data.searchText,
      startDate: data.startDate,
      endDate: data.endDate,
    };
    onSetPage(0);
    dispatch(setDataFilter(dataFilter));
  };

  const handleClickDelete = () => {
    reset({
      gameGiftId: 0,
      searchText: undefined,
      startDate: null,
      endDate: null,
    });
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Card
          sx={{
            padding: '30px 20px 20px 20px',
            borderRadius: '0px',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
          }}
        >
          <Stack direction="column" spacing={2}>
            <Stack direction="row" spacing={3}>
              <Stack spacing={1} flex={1}>
                <RHFTextField
                  name="gameGiftId"
                  label={t('gameManage.win_history.labelGameGiftId')}
                  type="number"
                />
              </Stack>
              <Stack spacing={1} flex={1}>
                <RHFTextField
                  name="searchText"
                  label={t('gameManage.win_history.labelSearchText')}
                  type="string"
                />
              </Stack>
            </Stack>

            <Stack direction="row" spacing={3}>
              <Controller
                name="startDate"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Stack position="relative" width="100%">
                    <DateTimePicker
                      {...field}
                      label={t('gameManage.win_history.labelStartDate')}
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
                      label={t('gameManage.win_history.labelEndDate')}
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
              sx={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <LoadingButton
                variant="contained"
                startIcon={<Iconify icon="humbleicons:search" />}
                type="submit"
              >
                {t('gameManage.win_history.search')}
              </LoadingButton>
              <Button
                variant="contained"
                color="inherit"
                startIcon={<Iconify icon="tabler:trash-x-filled" />}
                onClick={handleClickDelete}
              >
                {t('gameManage.win_history.clear')}
              </Button>
            </Stack>
          </Stack>
        </Card>
      </FormProvider>
    </>
  );
}

export default GameWinHistoryFilter;
