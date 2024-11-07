import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Button,
  Card,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FormProvider,
  RHFRadioGroup,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadSingleFile,
} from 'src/common/components/hook-form';
import useMessage from 'src/common/hooks/useMessage';
import i18n from 'src/common/locales/i18n';
import { PATH_DASHBOARD } from 'src/common/routes/paths';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { useCallback, useEffect } from 'react';

import Iconify from '../../../common/components/Iconify';
import RHFSearchSelect from '../../../common/components/hook-form/RHFSelectSearch';
import { DEFAULT_MAIN_COLOR } from '../../../common/constants/common.constants';
import useDeepEffect from '../../../common/hooks/useDeepEffect';
import { usePresignImg } from '../../../common/hooks/usePresignImg';
import { fData } from '../../../common/utils/formatNumber';
import { ProductType } from '../../../product-merchant/product-common/interface';
import DetailFormProvinceQuantities from '../../common/components/form-game-constraints/FormGameProvinceQuantities';
import RHFSelectProductVirtual from '../../common/components/RHFSelectProductVirtual';
import DetailFormAllocation from '../../common/components/form-game-constraints/FormAllocation';
import DetailFormProvince from '../../common/components/form-game-constraints/FormProvince';
import {
  DEFAULT_CONSTRAINTS,
  DEFAULT_TYPE_PRIZE,
  DEFAULT_VALUE_GAME_GIFT,
  TypeGameConstraints,
} from '../../constants';
import { idProductSelector, setIdProduct } from '../../gameGift.slice';
import { useEditGameGift } from '../../hooks/useEditGameGift';
import { useGetGameGiftById } from '../../hooks/useGetGameGiftById';
import { useGetProductById } from '../../hooks/useGetProductById';
import { useGetProductVirtual } from '../../hooks/useGetProductVirtual';
import {
  IFormCreateGameGift,
  IProductVirtualVariant
} from '../../interfaces';
import { schemaCreateGameGift } from '../../shema';

export default function FormEditGameGift() {
  const navigate = useNavigate();
  const methods = useForm<IFormCreateGameGift>({
    resolver: yupResolver(schemaCreateGameGift),
    defaultValues: DEFAULT_VALUE_GAME_GIFT,
  });
  const { t } = useTranslation();
  const { handleUpload } = usePresignImg();
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    getValues,
    watch,
    formState: { isSubmitting, errors },
  } = methods;

  const dispatch = useDispatch();
  const { gameId, giftId } = useParams();

  const { useDeepCompareEffect } = useDeepEffect();
  const { data: dataGameGiftById, isLoading } = useGetGameGiftById(
    parseInt(giftId as string)
  );

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { mutate } = useEditGameGift({
    onSuccess: () => {
      showSuccessSnackbar('Chỉnh sửa thành công !');
      navigate(PATH_DASHBOARD.gameGift.list(gameId as string));
    },
  });

  const {
    data: dataProductVirtual,
    fetchNextPage: fetchNextPageProductVirtual,
    isFetchingNextPage: isFetchingNextPageProductVirtual,
  } = useGetProductVirtual({
    page: 1,
    limit: 20,
    productType: ProductType.virtual,
  });

  const productVirtualId = useSelector(idProductSelector);

  const { data: dataProductById, isLoading: isLoadingProductById } =
    useGetProductById({id: productVirtualId });

  const handleScrollProductVirtual = (event: any) => {
    const listBoxNode = event?.currentTarget;
    const position = listBoxNode?.scrollTop + listBoxNode?.clientHeight;
    if (listBoxNode.scrollHeight - position <= 1) {
      fetchNextPageProductVirtual();
    }
  };

  const listProductVirtual =
    dataProductVirtual?.pages?.map((item) => item?.items).flat() || [];

  const dataItemSelectProductVirtual =
    listProductVirtual?.map((item) => {
      return {
        id: item?.id,
        productDetails: item?.productDetails[0],
        name: item?.productDetails[0]?.name,
        thumbnail: item?.thumbnail,
        productVariants: item?.productVariants,
      };
    }) || [];

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue(
          'imageId',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  useDeepCompareEffect(() => {
    if (dataGameGiftById) {
      dispatch(setIdProduct(dataGameGiftById?.product?.id as number));
      const dataReset = {
        typePrize: dataGameGiftById?.productVariant?.id
          ? DEFAULT_TYPE_PRIZE[0].value
          : DEFAULT_TYPE_PRIZE[1].value,
        name: dataGameGiftById?.name,
        ordinal: dataGameGiftById?.ordinal ? dataGameGiftById?.ordinal : 1,
        posInImage: dataGameGiftById?.posInImage,
        isWonMultiple:dataGameGiftById?.isWonMultiple,
      winRate:dataGameGiftById?.winRate,
        quantity: dataGameGiftById?.quantity,
        startDate: dataGameGiftById?.startDate,
        endDate: dataGameGiftById?.endDate,
        status: dataGameGiftById?.status === 'ACTIVE' ? true : false,
        constraintProvince: dataGameGiftById?.gameGiftProvinceConstraints?.map(
          (item) => {
            return {
              id: item?.province?.id,
              name: item?.province?.name,
            };
          }
        ),
        constraintPhoneNumber:
          dataGameGiftById?.gameGiftAllocationConstraints?.map((item) => {
            return item?.phoneNumber
          }),
       
        gameGiftProvinceQuantities: dataGameGiftById?.gameGiftProvinceQuantities?.map(
          (item: any) => {
            return {
              provinceId: item?.province,
              quantity: item?.quantity,
            };
          }
        ),
        imageId: dataGameGiftById?.productVariant?.id
        ? undefined
        : dataGameGiftById?.image?.url,
      isWinnable: dataGameGiftById?.isWinnable,
        type: dataGameGiftById?.type,
      };
      reset(dataReset);
    }
  }, [dataGameGiftById]);

  useDeepCompareEffect(() => {
    if (dataProductById) {
      const itemProductSelect = {
        id: dataProductById?.id,
        productDetails: dataProductById?.productDetails[0],
        name: dataProductById?.productDetails[0]?.name,
        thumbnail: dataGameGiftById?.image,
        productVariants: dataProductById?.productVariants,
      };
      setValue('productId', itemProductSelect);
      setValue(
        'productVariantId',
        itemProductSelect?.productVariants?.find(
          (item: IProductVirtualVariant) =>
            item.id === dataGameGiftById?.productVariant?.id
        )
      );
    }
  }, [dataProductById]);

  const onSubmit = async (dataSubmit: IFormCreateGameGift) => {
    let imgId = dataGameGiftById?.image?.id;
    if (typeof dataSubmit?.imageId === 'object') {
      const file = await handleUpload(dataSubmit.imageId as File);
      imgId = file?.id;
    }

    const dataEdit = {
      id: parseInt(giftId as string),
      type: dataSubmit?.type,
      gameGiftProvinceConstraints:
        dataSubmit?.type === TypeGameConstraints.PROVINCE
          ? dataSubmit?.constraintProvince?.map((item) => {
              return {
                provinceId: item?.id,
              };
            })
          : [],
      gameGiftAllocationConstraints:
        dataSubmit?.type === TypeGameConstraints.ALLOCATION
          ? dataSubmit?.constraintPhoneNumber?.map((item) => {
              return {
                phoneNumber: item,
              };
            })
          : [],
      gameGiftProvinceQuantities:
        dataSubmit?.type === TypeGameConstraints.DEFAULT
          ? dataSubmit?.gameGiftProvinceQuantities?.map((item: any) => {
              return {
                provinceId: item?.provinceId.id,
                quantity: item?.quantity,
              };
            })
          : [],
      startDate: dataSubmit?.startDate,
      endDate: dataSubmit?.endDate,
      status: dataSubmit?.status ? 'ACTIVE' : 'INACTIVE',
      ordinal: dataSubmit?.ordinal ? dataSubmit?.ordinal : 1 ,
      posInImage:dataSubmit?.posInImage,
      isWonMultiple:dataSubmit?.isWonMultiple,
      winRate:dataSubmit?.winRate ? dataSubmit?.winRate : 1 ,
      productVariantId:
        dataSubmit?.typePrize === DEFAULT_TYPE_PRIZE[0].value
          ? dataSubmit?.productVariantId?.id
          : undefined,
      productId:
        dataSubmit?.typePrize === DEFAULT_TYPE_PRIZE[0].value
          ? dataSubmit?.productId?.id
          : undefined,
      quantity: dataSubmit?.quantity,
      gameId: parseInt(gameId as string),
      name:
        dataSubmit?.typePrize === DEFAULT_TYPE_PRIZE[0].value
          ? dataSubmit?.productVariantId?.name
          : dataSubmit?.name,
      imageId:
        dataSubmit?.typePrize === DEFAULT_TYPE_PRIZE[0].value
          ? dataSubmit?.productId?.thumbnail?.id
          : imgId,
      isWinnable: dataSubmit?.isWinnable,
    };
    mutate(dataEdit);
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction={'column'} spacing={3}>
        <Card sx={{ boxShadow: 10, padding: 3, width: '100%' }}>
          <Stack direction={'column'} spacing={3}>
            <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
              <RHFRadioGroup
                sx={{ justifyContent: 'flex-start' }}
                name="typePrize"
                options={DEFAULT_TYPE_PRIZE}
              />
            </Stack>

            <Stack
              spacing={3}
              direction={'row'}
              alignItems={'center'}
              minHeight={'300px'}
            >
              <Stack spacing={2} alignItems={'center'} width={'100%'}>
                <RHFSelectProductVirtual
                  name="productId"
                  options={dataItemSelectProductVirtual}
                  labelProp="name"
                  label="Sản phẩm"
                  linkedFieldName="productVariantId"
                  listBoxScroll={handleScrollProductVirtual}
                  loadingScroll={isFetchingNextPageProductVirtual}
                  disabledSelect={watch('typePrize') === DEFAULT_TYPE_PRIZE[1].value}
                  disabled={watch('typePrize') === DEFAULT_TYPE_PRIZE[1].value}
                  sx={{
                    '& .MuiInputBase-root.Mui-disabled': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        backgroundColor: 'rgba(103, 99, 101, 0.1)',
                      },
                    },
                  }}
                />
                <RHFSearchSelect
                  name="productVariantId"
                  options={watch('productId')?.productVariants || []}
                  labelProp="name"
                  valueProp="id"
                  label="Biến thể sản phẩm"
                  disableSelect={
                    watch('typePrize') === DEFAULT_TYPE_PRIZE[1].value ||
                    !watch('productId')
                  }
                  disabled={
                    watch('typePrize') === DEFAULT_TYPE_PRIZE[1].value ||
                    !watch('productId')
                  }
                  sx={{
                    '& .MuiInputBase-root.Mui-disabled': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        backgroundColor: 'rgba(103, 99, 101, 0.1)',
                      },
                    },
                  }}
                />
                <RHFTextField
                  name="name"
                  label={'Tên giải thưởng*'}
                  sx={{
                    '& .MuiInputBase-root.Mui-disabled': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        backgroundColor: 'rgba(103, 99, 101, 0.1)',
                      },
                    },
                  }}
                  disabled={watch('typePrize') === DEFAULT_TYPE_PRIZE[0].value}
                />
              </Stack>
              <Divider orientation="vertical" flexItem />

              {watch('typePrize') === DEFAULT_TYPE_PRIZE[1].value ? (
                <RHFUploadSingleFile
                  name="imageId"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  accept={{ 'image/*': [] }}
                  disabled={watch('typePrize') === DEFAULT_TYPE_PRIZE[0].value}
                  helperText={
                    <Typography
                      variant="caption"
                      sx={{
                        flex: 1,
                        mt: 2,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.secondary',
                      }}
                    >
                      {t('allowed')} *.jpeg, *.jpg, *.png, *.gif
                      <br /> {t('max_size_of')} {fData(3145728)}
                    </Typography>
                  }
                />
              ) : (
                <Avatar
                  src={watch('productId')?.thumbnail?.url}
                  alt=""
                  variant="rounded"
                  sx={{ height: 300, width: '50%', boxShadow: 10 }}
                >
                  <Iconify
                    icon={'icon-park-outline:ad-product'}
                    sx={{ width: '100px', height: '100px' }}
                  />
                </Avatar>
              )}
            </Stack>

            <Stack direction={'row'} spacing={2}>
              <RHFTextField
                name="posInImage"
                label={'Thứ tự vòng quay*'}
                type="number"
                sx={{ maxWidth: '30%' }}
              />
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <Stack position="relative">
                    <DateTimePicker
                      {...field}
                      label="Ngày bắt đầu*"
                      inputFormat={'dd/MM/yyyy hh:mm:ss'}
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
                render={({ field }) => (
                  <Stack position="relative">
                    <DateTimePicker
                      {...field}
                      label="Ngày kết thúc*"
                      inputFormat={'dd/MM/yyyy hh:mm:ss'}
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
            <Stack direction={'row'} spacing={2}>
              <RHFTextField
                name="quantity"
                label={
                  watch('type') === TypeGameConstraints.DEFAULT
                    ? 'Số lượng giải tự do *'
                    : 'Số lượng *'
                }
                type="number"
                sx={{ maxWidth: '20%' }}
              />

              <RHFSwitch name="status" label={`Trạng thái`} labelPlacement="start" />

              <RHFSwitch name="isWinnable" label="Trúng giải" labelPlacement="start" />
            </Stack>
          </Stack>
        </Card>
        <Stack direction={'row'} spacing={2}>
          <Card
            sx={{
              width: '100%',
              padding: 2,
              boxShadow: 10,
              borderRadius: '8px',
              background: `linear-gradient(to left bottom, white, white, ${DEFAULT_MAIN_COLOR})`,
            }}
          >
           <Stack spacing={2}>
           <Stack spacing={2} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Box sx={{ width: '500px' }}>
                  <RHFSelect
                    name="type"
                    label="Đối tượng áp dụng"
                    SelectProps={{ native: false }}
                  >
                    {DEFAULT_CONSTRAINTS.map((item, index) => (
                      <MenuItem value={item.value} key={index}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                </Box>
                {giftId ? (<Typography variant="h6">Tổng số giải: {dataGameGiftById?.totalQuantity || 0} </Typography>) : null}
              </Stack>
              {/* {watch('type') !== TypeGameConstraints.DEFAULT && (<RHFTextField name="ordinal" label={'Thứ tự ưu tiên*'} type="number" />)}
            {watch('type') === TypeGameConstraints.DEFAULT && (<RHFTextField name="winRate" label={'Tỉ lệ trúng giải*'} type="number" />)}
            {watch('type') === TypeGameConstraints.DEFAULT && (<RHFSwitch name="isWonMultiple" label={`Trúng nhiều lần`} labelPlacement="start" />)} */}
            <Divider />

              {watch('type') === TypeGameConstraints.DEFAULT && (
                <DetailFormProvinceQuantities />
              )}
             
              {watch('type') === TypeGameConstraints.ALLOCATION && (
                <DetailFormAllocation />
              )}
              {watch('type') === TypeGameConstraints.PROVINCE && <DetailFormProvince />}
            </Stack>
          </Card>
        </Stack>
        <Stack
          justifyContent="flex-end"
          direction="row"
          spacing={3}
          mt={3}
          sx={{ maxHeight: '40px' }}
        >
          <Button
            color="inherit"
            variant="contained"
            onClick={() => navigate(PATH_DASHBOARD.gameGift.list(gameId as string))}
          >
            Trờ về
          </Button>
          <LoadingButton variant="contained" loading={isSubmitting} type="submit">
            {`${i18n.t('edit')}`}
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
