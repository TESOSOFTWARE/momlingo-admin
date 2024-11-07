import { LoadingButton } from '@mui/lab';
import { Button, Card, Stack, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Iconify from '../../../common/components/Iconify';
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from '../../../common/components/hook-form';
import useDeepEffect from '../../../common/hooks/useDeepEffect';
import useMessage from '../../../common/hooks/useMessage';
import { dispatch } from '../../../common/redux/store';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { EnumType } from '../../common/interface';
import { setCheckType } from '../../detail-order/slice';
import { DEFAULT_EDIT_ORDER, OrderStatusLabel } from '../constant';
import { useEditOrder } from '../hooks/useEditOrder';
import { useGetDistrict } from '../hooks/useGetDistrict';
import { useGetOrderById } from '../hooks/useGetOrderById';
import { useGetWard } from '../hooks/useGetWard';
import { IEditDataOrder, IEditOrder } from '../interface';
import { useSelector } from 'react-redux';
import {
  isOpenModalEditAddressSelector,
  pickedAddressSelector,
  setIsOpenModalEditAddress,
} from '../slice';
import { EditAddressModal } from './elements/ModalEditAddress';
import { dataPassWord } from '../../../request-management/requestManage.slice';

export default function EditOrderForm() {
  const methods = useForm<IEditOrder>({
    defaultValues: DEFAULT_EDIT_ORDER,
  });
  const navigate = useNavigate();

  const params = useParams();
  const idDetail = params?.id as unknown as number;

  const { useDeepCompareEffect } = useDeepEffect();
  const {
    handleSubmit,
    setValue,
    control,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = methods;

  const isOpenModal = useSelector(isOpenModalEditAddressSelector);
  const addressRedux = useSelector(pickedAddressSelector);

  const { showErrorSnackbar, showSuccessSnackbar } = useMessage();

  const { data: detailOrder } = useGetOrderById({
    id: idDetail,
    callback: {
      onError: () => showErrorSnackbar('Tải thông tin đơn hàng thất bại'),
      onSuccess: () => {},
    },
  });

  dispatch(setCheckType(detailOrder?.type || EnumType.PHYSICAL));

  useDeepCompareEffect(() => {
    if (detailOrder) {
      reset({
        id: detailOrder?.orderId,
        createAt: detailOrder?.createAt,
        phone: detailOrder?.phone,
        status: detailOrder?.status,
        name: detailOrder?.name,
        fullAddress:
          detailOrder?.address1 +
          ', ' +
          detailOrder?.ward +
          ', ' +
          detailOrder?.district +
          ', ' +
          detailOrder?.province,
      });
    }
  }, [detailOrder]);

  useDeepCompareEffect(() => {
    if (addressRedux.district) {
      setValue(
        'fullAddress',
        addressRedux?.address1 +
          ', ' +
          addressRedux?.ward?.name +
          ', ' +
          addressRedux?.district?.name +
          ', ' +
          addressRedux?.province?.name
      );
    }
  }, [addressRedux]);

  const { mutate } = useEditOrder({
    onSuccess: () => {
      showSuccessSnackbar('Sửa đơn hàng thành công');
      detailOrder?.type === EnumType.PHYSICAL
        ? navigate(PATH_DASHBOARD.order_management.list_physical)
        : navigate(PATH_DASHBOARD.order_management.list_voucher);
    },
    onError: () => showErrorSnackbar('Sửa đơn hàng thất bại'),
  });

  const onSubmit = (data: IEditOrder) => {
    const dataEdit: IEditDataOrder = {
      orderId: data.id,
      status: data.status,
      name: data.name,
      phone: data.phone,
      address1: addressRedux.address1 ? addressRedux.address1 : detailOrder?.address1,
      ward: addressRedux?.ward?.name ? addressRedux?.ward?.name : detailOrder?.ward,
      district: addressRedux?.district?.name
        ? addressRedux?.district?.name
        : detailOrder?.district,
      province: addressRedux?.province?.name
        ? addressRedux?.province?.name
        : detailOrder?.province,
    };
    mutate(dataEdit);
  };
  const handleClickCancel = () => {
    detailOrder?.type === EnumType.PHYSICAL
      ? navigate(PATH_DASHBOARD.order_management.list_physical)
      : navigate(PATH_DASHBOARD.order_management.list_voucher);
  };

  const handleChangeAddress = () => {
    dispatch(setIsOpenModalEditAddress(true));
  };
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ padding: 3, overflow: 'visible' }}>
          <Stack spacing={3}>
            <Stack direction="row" spacing={3}>
              <RHFTextField
                name="id"
                label="Id"
                disabled
                InputLabelProps={{ shrink: true }}
              />
              <Controller
                name="createAt"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Stack position="relative" width="100%">
                    <DateTimePicker
                      {...field}
                      label={'Ngày tạo đơn'}
                      inputFormat="dd/MM/yyyy HH:mm"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          helperText={errors.createAt && errors.createAt?.message}
                          error={!!errors.createAt}
                          disabled
                        />
                      )}
                    />
                  </Stack>
                )}
              />
            </Stack>
            <RHFTextField
              name="name"
              label="Tên người nhận"
              InputLabelProps={{ shrink: true }}
            />
            <RHFTextField
              name="phone"
              label="Số điện thoại"
              InputLabelProps={{ shrink: true }}
            />

            <RHFSelect name="status" label="Trạng thái đơn hàng">
              {OrderStatusLabel.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </RHFSelect>
            <Stack
              spacing={2}
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <RHFTextField
                name="fullAddress"
                label="Địa chỉ"
                disabled
                sx={{ width: '85%' }}
                InputLabelProps={{ shrink: true }}
              />
              <Button variant="contained" onClick={handleChangeAddress}>
                Chọn địa chỉ
              </Button>
            </Stack>
          </Stack>
        </Card>

        <Stack
          direction="row"
          spacing={3}
          sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 3 }}
        >
          <LoadingButton
            type="submit"
            variant="contained"
            startIcon={<Iconify icon="mdi:content-save-all" />}
          >
            Lưu thay đổi
          </LoadingButton>
          <Button
            type="button"
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="tabler:trash-x-filled" />}
            onClick={handleClickCancel}
          >
            Hủy
          </Button>
        </Stack>
      </FormProvider>
      <EditAddressModal
        title="Địa chỉ nhận quà"
        isOpen={isOpenModal}
        onClose={() => dispatch(setIsOpenModalEditAddress(false))}
      />
    </>
  );
}
