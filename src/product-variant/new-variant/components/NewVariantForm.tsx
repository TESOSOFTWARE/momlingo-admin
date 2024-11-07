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
import lodash, { debounce } from 'lodash';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Iconify from '../../../common/components/Iconify';
import { FormProvider, RHFEditor } from '../../../common/components/hook-form';
import useMessage from '../../../common/hooks/useMessage';
import { usePresignImg } from '../../../common/hooks/usePresignImg';
import { dispatch } from '../../../common/redux/store';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { usePostVariant } from '../hooks/usePostVariant';
import { IProductVariant, ISelect, ISubmitVariant } from '../interface';
import { NewVariantSchema } from '../schema/schema';
import { listForm, listTermIds, setListForm, setListTermIds } from '../slice';
import ExternalSelectForm from './elements/ExternalSelectForm';
import FormLeft from './elements/FormLeft';
import FormRight from './elements/FormRight';
import SelectAttributeForm from './elements/SelectAttributeForm';
import useDeepEffect from '../../../common/hooks/useDeepEffect';

export function NewVariantForm() {
  const methods = useForm<ISubmitVariant>({
    resolver: yupResolver(NewVariantSchema),
  });

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const {
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = methods;

  const { handleUpload } = usePresignImg();

  const { mutate, isLoading: loading } = usePostVariant({
    onSuccess: () => {
      showSuccessSnackbar(t('variant.new.successBar'));
      navigate(PATH_DASHBOARD.product_variant.list);
      dispatch(setListForm(['']));
      dispatch(setListTermIds([]));
    },
    onError: () => {
      showErrorSnackbar(t('variant.new.failBar'));
    },
  });

  const getId = (id: ISelect) => {
    if (id !== undefined) return id.id;
    else return 0;
  };

  const listFormAtt = useSelector(listForm);

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

  const { useDeepCompareEffect } = useDeepEffect();

  useDeepCompareEffect(() => {
    setValue(
      'descriptionVariant',
      `<b style="display: inline; color: red";>❖ <u>Mô tả</u>:</b> <br> ${
        watch('externalProductId')?.content === undefined
          ? 'Chưa có'
          : watch('externalProductId')?.content
      } <br>
      <b style="display: inline; color: red">❖ <u>Điều khoản sử dụng</u>:</b> <br>
      ${
        watch('externalProductId')?.condition === undefined
          ? 'Chưa có'
          : watch('externalProductId')?.condition
      } <br>
      <b style="color: red;">❖ <u>Địa chỉ</u>:</b> <br>
      ${
        watch('externalProductId')?.office === undefined
          ? 'Chưa có'
          : watch('externalProductId')
              ?.office.map(
                (item) => `<br> <p style="background-color: red;"> ● ${item.address}</p>`
              )
              .join('')
      }
     `
    );
  }, [watch('externalProductId')]);

  const listIdsTerm = useSelector(listTermIds);

  const onSubmit = async (dataSubmit: ISubmitVariant) => {
    const image = await getImageInfo(dataSubmit?.photoURL as File);
    const dataVariant: IProductVariant = {
      productVariantDetails: [
        {
          lang: dataSubmit.langVariant,
          description: dataSubmit.descriptionVariant,
        },
      ],
      price: dataSubmit.price,
      salePrice: dataSubmit.salePrice === undefined ? 0 : dataSubmit.salePrice,
      sku: dataSubmit.sku,
      quantity: dataSubmit.quantity,
      imageIds: [image?.id],
      productAttributeTermIds: listIdsTerm,
      point: dataSubmit.point,
      salePoint: dataSubmit.salePoint === undefined ? 0 : dataSubmit.salePoint,
      externalProductId: dataSubmit.externalProductId?.value,
      name: dataSubmit.name,
      width: dataSubmit.width,
      height: dataSubmit.height,
      length: dataSubmit.length,
      weight: dataSubmit.weight,
    };
    mutate(dataVariant);
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
        {listFormAtt.map((item, index) => {
          const attributeValue = watch(`productAttributeId${item}`);
          const attributeId = getId(attributeValue);
          return (
            <SelectAttributeForm
              errors={errors}
              attributeId={attributeId}
              key={item}
              id={item}
              index={index}
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
          startIcon={<Iconify icon="mi:circle-add" />}
        >
          {t('create')}
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
