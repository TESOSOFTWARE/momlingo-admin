import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Container,
  InputAdornment,
  Paper,
  Stack,
  TextField,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, RHFSelect, RHFTextField } from 'src/common/components/hook-form';
import Iconify from 'src/common/components/Iconify';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import useDeepEffect from '../../../common/hooks/useDeepEffect';
import en from '../../../common/locales/en';
import { dispatch, useSelector } from '../../../common/redux/store';
import {
  setDataEditCode,
  setIsOpenQRCodeModal,
  setPopup,
} from '../../code-common/code.slice';
import { statusCode } from '../../code-common/constants';
import { fDayDMY_HMA } from '../../code-common/utils/formatTime';
import { Type_Get_Code } from '../edit.constant';
import { IEditCode, IEditParams } from '../edit.interface';
import { useGetEditCode } from '../hooks/useGetEditCode';
import { CodeEditSchema } from '../schema/edit.schema';
import ConfirmEdit from './ConfirmEdit';
import EventName from './EventName';
import { useTranslation } from 'react-i18next';
import QRCodeModal from './QRCodeModal';

export default function CodeEditForm() {
  const { useDeepCompareEffect } = useDeepEffect();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const methods = useForm<IEditCode>({
    resolver: yupResolver(CodeEditSchema),
  });
  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = methods;

  const params = useParams();
  const codeIndex = params?.code as string;

  const editParams: IEditParams = {
    searchText: codeIndex,
    searchType: Type_Get_Code,
    page: 1,
    limit: 20,
  };

  const { data } = useGetEditCode({ ...editParams });

  const listCodeDetail = data?.items[0];
  const idEvent = listCodeDetail?.eventId || 0;
  const isOpenQRCodeModal = useSelector((state) => state.codeRelease.isOpenQRCodeModal);

  useDeepCompareEffect(() => {
    if (listCodeDetail) {
      reset({
        code: listCodeDetail.code,
        useTime: listCodeDetail.useTime,
        createdAt: listCodeDetail.createdAt,
        status: listCodeDetail.status,
        expiresAt: fDayDMY_HMA(listCodeDetail.expiresAt),
      });
    }
  }, [listCodeDetail]);

  const onSubmit = (data: IEditCode) => {
    const dataEdit = {
      code: data.code,
      status: data.status,
      useTime: data.useTime,
    };
    dispatch(setDataEditCode(dataEdit));
    dispatch(setPopup(true));
  };
  return (
    <Paper elevation={3} sx={{ marginRight: '40px' }}>
      <Container>
        <ConfirmEdit />
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3} pt={4} pb={4}>
            <EventName eventId={idEvent} />
            <Stack direction="row" spacing={3}>
              <RHFTextField
                disabled
                label={en.code}
                name="code"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <Iconify
                        icon={'fluent-mdl2:field-read-only'}
                        sx={{
                          color: 'text.disabled',
                          width: 20,
                          height: 20,
                          marginRight: '10px',
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
              <RHFSelect name="status" label={en.status} sx={{ maxWidth: '300px' }}>
                {statusCode.map((option) => (
                  <option key={option} value={option}>
                    {option === 'ACTIVE' ? `${en.active}` : `${en.inactive}`}
                  </option>
                ))}
              </RHFSelect>
            </Stack>

            <Stack direction="row" spacing={3}>
              <Controller
                name="createdAt"
                control={control}
                render={({ field }) => (
                  <Stack position="relative" width="100%">
                    <DateTimePicker
                      {...field}
                      disabled
                      label={en.createdDay}
                      inputFormat="dd-MM-yyyy HH:mm a"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Iconify
                                  icon={'fluent-mdl2:field-read-only'}
                                  sx={{
                                    color: 'text.disabled',
                                    width: 20,
                                    height: 20,
                                    marginRight: '10px',
                                  }}
                                />
                                <Iconify
                                  icon={'simple-line-icons:calender'}
                                  sx={{ width: 20, height: 20 }}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />
                  </Stack>
                )}
              />
              <RHFTextField
                name="useTime"
                label={en.useTime}
                InputLabelProps={{ shrink: true }}
                sx={{ maxWidth: '300px' }}
              />
            </Stack>
            <RHFTextField
              label={t('expiresAt')}
              name="expiresAt"
              disabled
              InputLabelProps={{ shrink: true }}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <Iconify
                      icon={'fluent-mdl2:field-read-only'}
                      sx={{
                        color: 'text.disabled',
                        width: 20,
                        height: 20,
                        marginRight: '10px',
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />

            <Stack direction="row" spacing={3} justifyContent="flex-end">
              <Button
                variant="contained"
                color="inherit"
                onClick={() => {
                  navigate(PATH_DASHBOARD.code.list);
                }}
              >
                {en.cancel}
              </Button>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {en.Save}
              </LoadingButton>
            </Stack>
          </Stack>
        </FormProvider>
      </Container>
      {isOpenQRCodeModal && (
        <QRCodeModal
          isOpen={isOpenQRCodeModal}
          onClose={() => {
            dispatch(setIsOpenQRCodeModal(false));
          }}
        />
      )}
    </Paper>
  );
}
