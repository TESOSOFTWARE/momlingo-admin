import { LoadingButton } from '@mui/lab';
import { Button, Card, Stack, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from '../../../common/components/hook-form';
import Iconify from '../../../common/components/Iconify';
import { dispatch } from '../../../common/redux/store';
import { defaultValueFilter, OrderStatusLabel } from '../constant';
import { IOrderParams } from '../interface';
import { dataFilter, setDataFilter, setValue } from '../slice';
import { EnumType } from '../../common/interface';
import { useEffect } from 'react';

type Props = {
  onSetPage: (value: number) => void;
};

export default function OrderFilter({ onSetPage }: Props) {
  const methods = useForm<IOrderParams>({
    defaultValues: defaultValueFilter,
  });
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = methods;

  useEffect(() => {
    reset({
      orderId: 0,
      startDate: null,
      endDate: null,
      phone: '',
      status: 'All',
    });
    dispatch(setDataFilter(defaultValueFilter));
  }, []);

  const onSubmit = (data: IOrderParams) => {
    const dataFilter: IOrderParams = {
      status: data.status,
      startDate: data.startDate,
      endDate: data.endDate,
      phone: data.phone,
      orderId: data.orderId,
      type: EnumType.PHYSICAL,
    };
    onSetPage(0);
    dispatch(setDataFilter(dataFilter));
  };
  const handleClickDelete = () => {
    reset({
      orderId: 0,
      startDate: null,
      endDate: null,
      phone: '',
      status: 'All',
    });
    dispatch(setDataFilter(defaultValueFilter));
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
              <RHFTextField
                name="orderId"
                label="Id Đơn hàng"
                size="small"
                type="number"
              />
              <RHFTextField name="phone" label="Số điện thoại" size="small" />
              <RHFSelect name="status" label="Trạng thái" size="small">
                {OrderStatusLabel.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </RHFSelect>
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
                      label={'Ngày bắt đầu'}
                      inputFormat="dd-MM-yyyy hh:mm a"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          helperText={errors.startDate && errors.startDate?.message}
                          error={!!errors.startDate}
                          size="small"
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
                          size="small"
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
                Tìm kiếm
              </LoadingButton>
              <Button
                variant="contained"
                color="inherit"
                startIcon={<Iconify icon="tabler:trash-x-filled" />}
                onClick={handleClickDelete}
              >
                Hủy
              </Button>
            </Stack>
          </Stack>
        </Card>
      </FormProvider>
    </>
  );
}
