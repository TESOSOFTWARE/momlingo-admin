import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Card,
  Fab,
  FormLabel,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import lodash from 'lodash';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Iconify from '../../../common/components/Iconify';
import { FormProvider, RHFEditor } from '../../../common/components/hook-form';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import useDeepEffect from '../../../common/hooks/useDeepEffect';
import useMessage from '../../../common/hooks/useMessage';
import { usePresignImg } from '../../../common/hooks/usePresignImg';
import { dispatch } from '../../../common/redux/store';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import uuidv4 from '../../../common/utils/uuidv4';
import { useGetVariantById } from '../hooks/useGetVariantById';
import { usePutVariant } from '../hooks/usePutVariant';
import {
  IDataVariantDetail,
  IEditProductVariant,
  ISelect,
  IVariantDetail,
} from '../interface';
import { EditVariantSchema } from '../schema/shema';
import { listForm, listTermIds, setListForm } from '../slice';
import ExternalSelectForm from './elements/ExternalSelectForm';
import FormLeft from './elements/FormLeft';
import FormRight from './elements/FormRight';
import SelectAttributeForm from './elements/SelectAttributeForm';
import SelectAttributeFormOld from './elements/SelectAttributeFormOld';

export function EditVariantForm() {
  const methods = useForm<IVariantDetail>({
    resolver: yupResolver(EditVariantSchema),
  });
  const params = useParams();
  const idVariant = params?.id as unknown as number;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const {
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = methods;

  const { handleUpload } = usePresignImg();

  const listFormAtt = useSelector(listForm);

  const client = useQueryClient();

  const queryData = client.getQueryData<IDataVariantDetail>([
    QUERY_KEYS.DETAIL_PRODUCT_VARIANT,
    idVariant,
  ]);

  const listOldIdTerm = queryData?.productAttributeTerms?.map((item) => item?.id);

  const getId = (id: ISelect) => {
    if (id !== undefined) return id.id;
    else return 0;
  };
  const { data: variantDetail } = useGetVariantById(idVariant);

  const { useDeepCompareEffect } = useDeepEffect();
  useDeepCompareEffect(() => {
    if (variantDetail) {
      reset({
        name: variantDetail.name,
        sku: variantDetail.sku,
        quantity: variantDetail.quantity,
        width: variantDetail.productTransportInfo.width,
        length: variantDetail.productTransportInfo.length,
        height: variantDetail.productTransportInfo.height,
        weight: variantDetail.productTransportInfo.weight,
        price: variantDetail.price,
        salePrice: variantDetail.salePrice,
        point: variantDetail.productVariantPoint.point,
        salePoint: variantDetail.productVariantPoint.salePoint,
        photoURL: variantDetail.images[0].url,
        externalProductId: {
          value: variantDetail.externalProduct?.id,
          label: variantDetail.externalProduct?.productInfo.title,
          image: variantDetail.externalProduct?.productInfo.thumbnail,
        },
        langVariant: variantDetail?.productVariantDetails[0]?.lang,
        descriptionVariant: variantDetail?.productVariantDetails[0]?.description,
      });
    }
  }, [variantDetail]);

  const listAttribute = variantDetail?.productAttributeTerms || [];
  const attributeLength = listAttribute.length;

  // useDeepCompareEffect(() => {
  //   setValue(
  //     'descriptionVariant',
  //     `<b style="display: inline; color: red";>❖ <u>Mô tả</u>:</b> <br> ${
  //       watch('externalProductId')?.content === undefined
  //         ? 'Chưa có'
  //         : watch('externalProductId')?.content
  //     } <br>
  //     <b style="display: inline; color: red">❖ <u>Điều khoản sử dụng</u>:</b> <br>
  //     ${
  //       watch('externalProductId')?.condition === undefined
  //         ? 'Chưa có'
  //         : watch('externalProductId')?.condition
  //     } <br>
  //     <b style="color: red;">❖ <u>Địa chỉ</u>:</b> <br>
  //     ${
  //       watch('externalProductId')?.office === undefined
  //         ? 'Chưa có'
  //         : watch('externalProductId')
  //             ?.office.map(
  //               (item) => `<br> <p style="background-color: red;"> ● ${item.address}</p>`
  //             )
  //             .join('')
  //     }
  //    `
  //   );
  // }, [watch('externalProductId')]);

  const { mutate, isLoading: loading } = usePutVariant({
    onSuccess: () => {
      showSuccessSnackbar(t('variant.edit.showSuccess'));
      navigate(PATH_DASHBOARD.product_variant.list);
      dispatch(setListForm([]));
    },
    onError: () => {
      showErrorSnackbar(t('variant.edit.showError'));
    },
  });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue(
          'photoURL',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const getImageInfo = async (file: File): Promise<{ id: number; url: string }> => {
    const imgInfo = await handleUpload(file);
    return imgInfo;
  };

  const handleAddForm = () => {
    dispatch(setListForm([...listFormAtt, uuidv4()]));
  };

  const listNewIdTerm = useSelector(listTermIds);

  const oldThumbnailId = variantDetail?.images[0].id || 0;
  const oldThumbnailUrl = variantDetail?.images[0].url || '';

  const onSubmit = async (data: IVariantDetail) => {
    if (data?.photoURL !== oldThumbnailUrl) {
      const image = await getImageInfo(data?.photoURL as File);
      const dataVariant: IEditProductVariant = {
        id: idVariant,
        sku: data.sku,
        quantity: data.quantity,
        imageIds: [image.id],
        productAttributeTermIds: listOldIdTerm
          ?.concat(listNewIdTerm)
          .filter((item) => item !== null && item !== undefined),
        price: data.price,
        salePrice: !data.salePrice ? 0 : Number(data.salePrice),
        point: data.point,
        salePoint: !data.salePoint ? 0 : Number(data.salePoint),
        externalProductId: data.externalProductId?.value,
        name: data.name,
        width: data.width,
        height: data.height,
        length: data.length,
        weight: data.weight,
        productVariantDetails: [
          {
            id: variantDetail?.productVariantDetails[0].id || 0,
            lang: data.langVariant,
            description: data.descriptionVariant,
          },
        ],
      };
      mutate({ data: dataVariant });
    } else {
      const dataVariant: IEditProductVariant = {
        id: idVariant,
        sku: data.sku,
        quantity: data.quantity,
        imageIds: [oldThumbnailId],
        productAttributeTermIds: listOldIdTerm?.concat(listNewIdTerm),
        price: data.price,
        salePrice: !data.salePrice ? 0 : Number(data.salePrice),
        point: data.point,
        salePoint: !data.salePoint ? 0 : Number(data.salePoint),
        externalProductId: data.externalProductId?.value,
        name: data.name,
        width: data.width,
        height: data.height,
        length: data.length,
        weight: data.weight,
        productVariantDetails: [
          {
            id: variantDetail?.productVariantDetails[0].id || 0,
            lang: data.langVariant,
            description: data.descriptionVariant,
          },
        ],
      };
      console.log('dataVariant', dataVariant);
      mutate({ data: dataVariant });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" spacing={2}>
        <Card sx={{ padding: 3, minWidth: '40%' }}>
          <FormLeft />
        </Card>

        <Card sx={{ padding: 3 }}>
          <Stack spacing={3}>
            <FormRight handleDrop={handleDrop} errors={errors.photoURL?.message} />
          </Stack>
        </Card>
      </Stack>

      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Stack
          direction="row"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <FormLabel sx={{ marginLeft: 2, marginBottom: 1 }}>Mô tả biến thể</FormLabel>
        </Stack>
        <RHFEditor name="descriptionVariant" />
      </Paper>

      <Paper elevation={3} sx={{ padding: 3, marginTop: 3, position: 'relative' }}>
        <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: '20px', fontWeight: 600 }}>
            <i>*{t('variant.new.titleAtt')}</i>
          </Typography>
        </Stack>

        <SelectAttributeFormOld idVariant={idVariant} />

        {listFormAtt.map((item, index) => {
          const attributeValue = watch(`productAttributeId${item}`);
          const attributeId = getId(attributeValue);
          return (
            <SelectAttributeForm
              errors={errors}
              attributeId={attributeId}
              key={item}
              id={item}
              index={index + attributeLength}
            />
          );
        })}
        <Tooltip title={t('variant.new.labelAddAtt')}>
          <Fab
            color="primary"
            aria-label="add"
            sx={{
              width: '40px',
              height: '40px',
              position: 'absolute',
              marginLeft: 'auto',
              marginRight: 'auto',
              left: 0,
              right: 0,
              bottom: -20,
            }}
            onClick={handleAddForm}
          >
            <Iconify icon="ion:add" />
          </Fab>
        </Tooltip>
      </Paper>

      <Card sx={{ padding: 3, marginTop: 3 }}>
        <Stack direction={'column'} spacing={1}>
          <ExternalSelectForm errors={errors} watch={watch} />
        </Stack>
      </Card>

      <Stack
        direction={'row'}
        spacing={3}
        sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 3, marginRight: 5 }}
      >
        <LoadingButton
          loading={loading}
          type="submit"
          variant="contained"
          startIcon={<Iconify icon="mdi:content-save-all-outline" />}
        >
          {t('saveChange')}
        </LoadingButton>
        <Button
          color={'inherit'}
          variant="contained"
          startIcon={<Iconify icon="material-symbols:cancel-outline-rounded" />}
          onClick={() => {
            navigate(PATH_DASHBOARD.product_variant.list);
          }}
        >
          {t('cancel')}
        </Button>
      </Stack>
    </FormProvider>
  );
}
