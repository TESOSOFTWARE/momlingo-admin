import { LoadingButton } from '@mui/lab';
import { Button, Card, Stack, TextField, MenuItem } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Controller, useForm } from 'react-hook-form';
import { EnumType, IHistoryGiftUserParams } from './common/interfaces';
import { OrderStatusLabel, defaultValueFilter } from './common/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setDataFilter } from './common/historyGift.slice';
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from '../../../../common/components/hook-form';
import Iconify from '../../../../common/components/Iconify';

type Props = {
  searchUserId?: number;
};

export default function HistoryGiftFilterFilter({ searchUserId }: Props) {
  const methods = useForm<IHistoryGiftUserParams>({
    defaultValues: defaultValueFilter,
  });
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = methods;

  const onSubmit = (data: IHistoryGiftUserParams) => {
    const dataFilter: IHistoryGiftUserParams = {
      status: data.status,
      startDate: data.startDate,
      endDate: data.endDate,
      phone: data.phone,
      orderId: data.orderId,
      type: data.type,
      userId: searchUserId,
    };
    dispatch(setDataFilter(dataFilter));
  };
  const handleClickDelete = () => {
    reset({
      orderId: 0,
      startDate: null,
      endDate: null,
      phone: '',
      status: 'All',
      userId: undefined,
      type: '',
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
              <RHFSelect
                name="type"
                size="small"
                label={'Loại sản phẩm'}
                SelectProps={{ native: false }}
              >
                <MenuItem value="" disabled/>
                {Object.values(EnumType)?.map((typeOrder) => (
                  <MenuItem value={typeOrder} key={typeOrder}>{typeOrder}</MenuItem>
                ))}
              </RHFSelect>
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
