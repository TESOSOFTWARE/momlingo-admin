import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Slide,
  Stack,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormProvider, RHFSelect } from '../../../../common/components/hook-form';
import useMessage from '../../../../common/hooks/useMessage';
import { dispatch } from '../../../../common/redux/store';
import { PATH_DASHBOARD } from '../../../../common/routes/paths';
import { Required_Note } from '../../constant';
import { useGetAvailableService } from '../../hooks/useGetAvailableService';
import { useGetDistrict } from '../../hooks/useGetDistrict';
import { useGetProvinces } from '../../hooks/useGetProvinces';
import { useGetShop } from '../../hooks/useGetShop';
import { usePostOrderDelivery } from '../../hooks/usePostOrderDelivery';
import { IModalSubmit, IOrderDelivery } from '../../interface';
import { dataDelivery, isShowPopup, setShowPopup } from '../../slice';
import { total } from '../../utils/total';
import { RHFSelectPaginationShop } from './RHFSelectPaginationShop';
import { getShop } from '../../service';
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type ModalInfoProps = {
  orderId: number;
};

export default function ModalInfoDelivery({ orderId }: ModalInfoProps) {
  const showPopup = useSelector(isShowPopup);
  const dataGHN = useSelector(dataDelivery);
  const navigation = useNavigate();
  const { t } = useTranslation();
  const methods = useForm<IModalSubmit>();
  const {
    watch,
    getValues,
    formState: { errors },
  } = methods;
  const { data: districtShop } = useGetShop();

  const { data: listProvinces } = useGetProvinces();

  const idProvince = watch('provinces');

  const { data: listDistrict, refetch } = useGetDistrict({ id: idProvince });

  useEffect(() => {
    if (idProvince) {
      refetch();
    }
  }, [idProvince]);

  const idDistrict = watch('district');
  const idDistrictShop = watch('idDistrictShop');
  const _idShop = idDistrictShop?._id;

  const { data: listService, refetch: refetchService } = useGetAvailableService({
    fromDistrict: idDistrictShop?.value,
    toDistrict: idDistrict,
  });
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { mutate, isLoading } = usePostOrderDelivery({
    callback: {
      onError: () => showErrorSnackbar(`${t('order.detail.successBarGHN')}`),
      onSuccess: () => {
        navigation(PATH_DASHBOARD.order_management.list_physical);
        showSuccessSnackbar(`${t('order.detail.failBarGHN')}`);
      },
    },
  });

  useEffect(() => {
    if (idDistrict) {
      refetchService();
    }
  }, [idDistrict]);

  const handleClose = () => {
    dispatch(setShowPopup(false));
  };

  const onSubmit = () => {
    const newData: IOrderDelivery = {
      shop_id: _idShop,
      from_name: dataGHN.from_name,
      from_phone: dataGHN.from_phone,
      from_address: dataGHN.from_address,
      from_ward_name: dataGHN.from_ward_name,
      from_district_name: dataGHN.from_district_name,
      from_province_name: dataGHN.from_province_name,
      to_name: dataGHN.to_name,
      to_phone: dataGHN.to_phone,
      to_address: dataGHN.to_address,
      to_ward_name: dataGHN.to_ward_name,
      to_district_name: dataGHN.to_district_name,
      to_province_name: dataGHN.to_province_name,
      weight: dataGHN.weight,
      length: dataGHN.items?.reduce((total, value) => (total += value.length), 0),
      width: dataGHN.items?.reduce((total, value) => (total += value.width), 0),
      height: dataGHN.items?.reduce((total, value) => (total += value.height), 0),
      service_id: getValues('service_id'),
      payment_type_id: dataGHN.payment_type_id,
      required_note: getValues('required_note'),
      items: dataGHN.items.map((item) => {
        return {
          name: item.name,
          quantity: item.quantity,
          code: item.code,
          price: item.price,
          length: item.length,
          width: item.width,
          height: item.height,
        };
      }),
      name: dataGHN.name,
      quantity: dataGHN.quantity,
    };
    mutate({ id: orderId, data: newData });
  };
  return (
    <>
      <FormProvider methods={methods}>
        <Dialog
          open={showPopup}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{t('order.detail.titleGHN')}</DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              sx={{ marginBottom: 3 }}
            >
              <u>
                <b>{t('order.detail.commonInfo')}</b>
              </u>
              <Grid container>
                <Grid item xs={6} sx={{ paddingLeft: 3 }}>
                  {t('order.detail.totalWeight')}: {dataGHN.weight || 0}
                </Grid>
                <Grid item xs={6} sx={{ paddingLeft: 3 }}>
                  {t('order.detail.totalWidth')}:{' '}
                  {dataGHN.items?.reduce((total, value) => (total += value.length), 0) ||
                    0}
                </Grid>
                <Grid item xs={6} sx={{ paddingLeft: 3 }}>
                  {t('order.detail.totalWidth')}{' '}
                  {dataGHN.items?.reduce((total, value) => (total += value.width), 0) ||
                    0}
                </Grid>
                <Grid item xs={6} sx={{ paddingLeft: 3 }}>
                  {t('order.detail.totalHeight')}{' '}
                  {dataGHN.items?.reduce((total, value) => (total += value.height), 0) ||
                    0}
                </Grid>
              </Grid>
              <br />
              <i>{t('order.detail.noticeSize')}</i>
            </DialogContentText>
            <DialogContentText
              id="alert-dialog-slide-description"
              sx={{ marginBottom: 3 }}
            >
              {t('order.detail.moreInfo')}
            </DialogContentText>

            <DialogContentText
              sx={{ marginBottom: 3, fontWeight: 600, fontStyle: 'italic' }}
            >
              {t('order.detail.shopLabel')}
            </DialogContentText>

            <Stack sx={{ marginBottom: 3 }}>
              <RHFSelectPaginationShop
                name={'idDistrictShop'}
                getAsyncData={getShop}
                placeholder={'Tên shop'}
                error={errors}
              />
            </Stack>

            <DialogContentText
              sx={{ marginBottom: 3, fontWeight: 600, fontStyle: 'italic' }}
            >
              {t('order.detail.addressLabel')}
            </DialogContentText>
            <Stack direction="column" spacing={3}>
              <RHFSelect name="required_note" label={t('order.detail.showProduct')}>
                <option></option>
                {Required_Note.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </RHFSelect>

              <RHFSelect name="provinces" label={t('order.detail.province')}>
                <option></option>
                {listProvinces?.data?.map((item) => (
                  <option key={item?.ProvinceID} value={item?.ProvinceID}>
                    {item?.ProvinceName}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect name="district" label={t('order.detail.district')}>
                <option></option>
                {listDistrict?.data?.map((item) => (
                  <option key={item?.DistrictID} value={item?.DistrictID}>
                    {item?.DistrictName}
                  </option>
                ))}
              </RHFSelect>

              <RHFSelect name="service_id" label={t('order.detail.service')}>
                <option></option>
                {listService?.data?.map((item) => (
                  <option key={item?.service_id} value={item?.service_id}>
                    {item?.short_name}
                  </option>
                ))}
              </RHFSelect>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ marginRight: 3 }}>
            <LoadingButton
              loading={isLoading}
              variant="contained"
              color="error"
              type="submit"
              onClick={onSubmit}
            >
              {t('order.detail.ok')}
            </LoadingButton>
            <Button variant="contained" color="inherit" onClick={handleClose}>
              {t('order.detail.cancel')}
            </Button>
          </DialogActions>
        </Dialog>
      </FormProvider>
    </>
  );
}
