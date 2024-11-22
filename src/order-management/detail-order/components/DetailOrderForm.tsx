import { Button, Card, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider } from '../../../common/components/hook-form';
import Iconify from '../../../common/components/Iconify';
import { formatDate } from '../../../common/constants/common.utils';
import useDeepEffect from '../../../common/hooks/useDeepEffect';
import useMessage from '../../../common/hooks/useMessage';
import { dispatch } from '../../../common/redux/store';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { replacePathParams } from '../../../common/utils/replaceParams';
import { renderNull } from '../../common/utils/renderValue';
import { useGetOrderById } from '../hooks/useGetOrderById';
import { IDetailOrder, IOrderDelivery } from '../interface';
import {
  isOpenModalRefundSelector,
  setCheckType,
  setDataDelivery,
  setIsOpenModalRefund,
  setShowPopup,
} from '../slice';
import { rederTotalDiscount, renderShippingTotal } from '../utils/renderValue';
import { total } from '../utils/total';
import OrderInfoForm from './DetailFormElement/OrderInfo/OrderInfoForm';
import ProductInfoTable from './DetailFormElement/ProductInfo/ProductInfoTable';
import ShippingInfoForm from './DetailFormElement/ShippingInfo/ShippingInfoForm';
import ModalInfoDelivery from './manualPushOrder/ModalInfoDelivery';
import { EnumType } from '../../common/interface';
import { id } from 'date-fns/locale';
import { RefundCoinModal } from './modal/RefundCoinModal';
import { useSelector } from 'react-redux';

export default function DetailOrderForm() {
  const params = useParams();
  const idDetail = params?.id as unknown as number;
  const { t } = useTranslation();

  const navigate = useNavigate();

  const methods = useForm();
  const { handleSubmit, setValue, reset } = methods;

  const { useDeepCompareEffect } = useDeepEffect();
  const { showErrorSnackbar, showSuccessSnackbar } = useMessage();

  const { data } = useGetOrderById({
    id: idDetail,
    callback: {
      onError: () => showErrorSnackbar(`$t{order.detail.failBar}`),
      onSuccess: () => {},
    },
  });

  const detailOrder = data as IDetailOrder;

  dispatch(setCheckType(detailOrder?.type));

  const fullAddress =
    detailOrder?.orderShipping?.address1 +
    ', ' +
    detailOrder?.orderShipping?.ward +
    ', ' +
    detailOrder?.orderShipping?.district +
    ', ' +
    detailOrder?.orderShipping?.province;

  useDeepCompareEffect(() => {
    if (detailOrder) {
      reset({
        expressDeliveryCode: detailOrder?.expressDeliveryCode
          ? detailOrder?.expressDeliveryCode
          : 'Không có',
        id: detailOrder?.id,
        status: detailOrder?.status,
        total: detailOrder?.total,
        discountTotal: rederTotalDiscount(detailOrder?.discountTotal),
        shippingTotal: renderShippingTotal(detailOrder?.shippingTotal),
        phoneNumber: detailOrder?.user?.customer?.phoneNumber,
        createdAt: formatDate(detailOrder?.createdAt),
        paidAt: renderNull(detailOrder?.paidAt),
        transactionId: renderNull(detailOrder?.transactionId),
        note: renderNull(detailOrder?.note),
        idShipping: detailOrder?.orderShipping?.id,
        userId: detailOrder?.orderShipping?.userId,
        name: detailOrder?.orderShipping?.name,
        phone: detailOrder?.orderShipping?.phone,
        address: fullAddress,
        customerName: detailOrder?.user?.customer?.name,
      });
    }
  }, [detailOrder]);

  const handleClickEdit = (idDetail: number) => {
    navigate(replacePathParams(PATH_DASHBOARD.order_management.edit, { id: idDetail }));
  };
  const handleClickExit = () => {
    detailOrder.type === EnumType.PHYSICAL
      ? navigate(PATH_DASHBOARD.order_management.list_physical)
      : navigate(PATH_DASHBOARD.order_management.list_voucher);
  };

  const getListWeight = detailOrder?.orderLineItemReqDto
    ?.map((item) => {
      return item.product.productVariants.map((variant) => {
        return variant?.productTransportInfo?.weight;
      });
    })
    .flat();

  const totalWeight = total(getListWeight);

  const detailDelivery: IOrderDelivery = {
    to_name: detailOrder?.orderShipping?.name,
    to_phone: detailOrder?.orderShipping?.phone,
    to_address: detailOrder?.orderShipping?.address1,
    to_ward_name: detailOrder?.orderShipping?.ward,
    to_district_name: detailOrder?.orderShipping?.district,
    to_province_name: detailOrder?.orderShipping?.province,
    weight: totalWeight,
    length: 0,
    width: 0,
    height: 0,
    service_id: 0,
    payment_type_id: 1,
    required_note: '',
    items: detailOrder?.orderLineItemReqDto?.map((item, index) => {
      return {
        name: item?.product?.productDetails[0]?.name,
        quantity: item?.quantity,
        code: item?.product?.productDetails[0]?.slug,
        price: item?.total,
        length: total(
          item?.product?.productVariants.map(
            (variant) => variant?.productTransportInfo?.length || 0
          )
        ),
        width: total(
          item.product.productVariants.map(
            (variant) => variant?.productTransportInfo?.width || 0
          )
        ),
        height: total(
          item.product.productVariants.map(
            (variant) => variant?.productTransportInfo?.height || 0
          )
        ),
      };
    }),
    quantity: detailOrder?.orderLineItemReqDto?.reduce(
      (total, num) => total + num.quantity,
      0
    ),
    name: `${detailOrder?.id}`,
  };
  dispatch(setDataDelivery(detailDelivery));

  const isOnHoldPhysical =
    detailOrder?.status === 'ON_HOLD' && detailOrder?.type === EnumType.PHYSICAL;

  const isOpenModalRefund = useSelector(isOpenModalRefundSelector);
  const handleOpenModalRefund = () => {
    dispatch(setIsOpenModalRefund(true));
  };

  return (
    <>
      <RefundCoinModal
        isOpen={isOpenModalRefund}
        onClose={() => dispatch(setIsOpenModalRefund(false))}
      />
      <FormProvider methods={methods}>
        <ModalInfoDelivery orderId={idDetail} />

        <Stack
          direction="row"
          display="flex"
          alignItems="center"
          spacing={1}
          sx={{ paddingLeft: 2 }}
        >
          <Iconify icon="emojione:diamond-with-a-dot" />
          <Typography sx={{ fontWeight: 'bold', fontStyle: 'italic' }}>
            {t('order.detail.orderInfo')}
          </Typography>
        </Stack>
        <OrderInfoForm type={data?.type} />

        {data?.type === EnumType.PHYSICAL ? (
          <>
            <Stack
              direction="row"
              display="flex"
              alignItems="center"
              spacing={1}
              sx={{ paddingLeft: 2 }}
            >
              <Iconify icon="emojione:diamond-with-a-dot" />
              <Typography sx={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                {t('order.detail.deliveryInfo')}
              </Typography>
            </Stack>
            <ShippingInfoForm />
          </>
        ) : null}
        <Stack
          direction="row"
          display="flex"
          alignItems="center"
          spacing={1}
          sx={{ paddingLeft: 2 }}
        >
          <Iconify icon="emojione:diamond-with-a-dot" />
          <Typography sx={{ fontWeight: 'bold', fontStyle: 'italic' }}>
            {t('order.detail.productInfo')}
          </Typography>
        </Stack>
        <ProductInfoTable dataOrder={data?.orderLineItemReqDto} type={data?.type} />
        <Stack
          sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 3 }}
          direction="row"
          spacing={2}
        >
          {detailOrder?.status === 'COMPLETED' || detailOrder?.status === 'CANCELLED' ? (
            <>
              <Button
                variant="contained"
                startIcon={<Iconify icon="ri:hand-coin-line" />}
                sx={{ background: '#87CBB9' }}
                onClick={handleOpenModalRefund}
              >
                {t('order.detail.refund')}
              </Button>
            </>
          ) : null}

          {isOnHoldPhysical ? (
            <Button
              startIcon={<Iconify icon="iconoir:delivery-truck" />}
              onClick={() => dispatch(setShowPopup(true))}
              variant="contained"
              sx={{ bgcolor: '#F27800' }}
            >
              {t('order.detail.push')}
            </Button>
          ) : (
            false
          )}
          <Button
            variant="contained"
            startIcon={<Iconify icon="basil:edit-outline" />}
            onClick={() => handleClickEdit(detailOrder?.id || 0)}
          >
            {t('order.detail.fix')}
          </Button>
          <Button
            variant="contained"
            startIcon={<Iconify icon="fluent:arrow-exit-20-filled" />}
            onClick={handleClickExit}
            color="inherit"
          >
            {t('order.detail.cancel')}
          </Button>
        </Stack>
      </FormProvider>
    </>
  );
}
