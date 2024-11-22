import { yupResolver } from '@hookform/resolvers/yup';
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
import { useDispatch } from 'react-redux';

import { useCallback } from 'react';

import Iconify from '../../../common/components/Iconify';
import { DEFAULT_MAIN_COLOR } from '../../../common/constants/common.constants';
import useDeepEffect from '../../../common/hooks/useDeepEffect';
import { usePresignImg } from '../../../common/hooks/usePresignImg';
import { fData } from '../../../common/utils/formatNumber';
import DetailFormProvinceQuantities from '../../common/components/form-game-constraints/FormGameProvinceQuantities';
import DetailFormAllocation from '../../common/components/form-game-constraints/FormAllocation';
import DetailFormProvince from '../../common/components/form-game-constraints/FormProvince';
import {
  DEFAULT_CONSTRAINTS,
  DEFAULT_TYPE_PRIZE,
  DEFAULT_VALUE_GAME_GIFT,
  TypeGameConstraints,
} from '../../constants';
import { useEditGameGift } from '../../hooks/useEditGameGift';
import { useGetGameGiftById } from '../../hooks/useGetGameGiftById';
import { useGetProductVariant } from '../../hooks/useGetProductVariant';
import { IFormCreateGameGift } from '../../interfaces';
import { schemaCreateGameGift } from '../../shema';

export default function FormViewGameGift() {
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
    onError: () => {
      showErrorSnackbar('Chỉnh sửa thất bại !');
    },
  });

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
      const dataReset = {
        typePrize: dataGameGiftById?.productVariant?.id
          ? DEFAULT_TYPE_PRIZE[0].value
          : DEFAULT_TYPE_PRIZE[1].value,
        name: dataGameGiftById?.name,
        ordinal: dataGameGiftById?.ordinal,
        posInImage: dataGameGiftById?.posInImage,
        isWonMultiple: dataGameGiftById?.isWonMultiple,
        winRate: dataGameGiftById?.winRate,
        quantity: dataGameGiftById?.quantity,
        startDate: dataGameGiftById?.startDate,
        endDate: dataGameGiftById?.endDate,
        status: dataGameGiftById?.status === 'ACTIVE' ? true : false,
        constraintProvince: dataGameGiftById?.gameGiftProvinceConstraints?.map((item) => {
          return {
            id: item?.province?.id,
            name: item?.province?.name,
          };
        }),
        constraintPhoneNumber: dataGameGiftById?.gameGiftAllocationConstraints?.map(
          (item) => {
            return item?.phoneNumber;
          }
        ),

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
  const onSubmit = async (dataSubmit: any) => {};

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction={'column'} spacing={3}>
        <Card sx={{ boxShadow: 10, padding: 3, width: '100%' }}>
          <Stack direction={'column'} spacing={3}>
            <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
              <RHFRadioGroup
                sx={{ justifyContent: 'flex-start', display: 'none' }}
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
                <RHFTextField name="name" label={'Tên giải thưởng*'} disabled={true} />
              </Stack>
              <Divider orientation="vertical" flexItem />

              {watch('typePrize') === DEFAULT_TYPE_PRIZE[1].value ? (
                <RHFUploadSingleFile
                  name="imageId"
                  maxSize={3145728}
                  disabled={true}
                  onDrop={handleDrop}
                  accept={{ 'image/*': [] }}
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
                  src={dataGameGiftById?.image?.url}
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
                disabled
              />
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <Stack position="relative">
                    <DateTimePicker
                      {...field}
                      disabled
                      label="Ngày bắt đầu*"
                      inputFormat={'dd/MM/yyyy hh:mm:ss'}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          disabled
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
                      disabled
                      label="Ngày kết thúc*"
                      inputFormat={'dd/MM/yyyy hh:mm:ss'}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          disabled
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
                disabled
                label={
                  watch('type') === TypeGameConstraints.DEFAULT
                    ? 'Số lượng giải tự do *'
                    : 'Số lượng *'
                }
                type="number"
                sx={{ maxWidth: '20%' }}
              />

              <RHFSwitch
                name="status"
                disabled
                disableSwitch
                label={`Trạng thái`}
                labelPlacement="start"
              />

              <RHFSwitch
                name="isWinnable"
                label="Trúng giải"
                labelPlacement="start"
                disabled
                disableSwitch
              />
            </Stack>
          </Stack>
        </Card>
        <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
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
              <Stack
                spacing={2}
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Box sx={{ width: '500px' }}>
                  <RHFSelect
                    name="type"
                    label="Đối tượng áp dụng"
                    SelectProps={{ native: false }}
                    disabled
                  >
                    {DEFAULT_CONSTRAINTS.map((item, index) => (
                      <MenuItem value={item.value} key={index}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                </Box>
                {giftId ? (
                  <Typography variant="h6">
                    Tổng số giải: {dataGameGiftById?.totalQuantity || 0}{' '}
                  </Typography>
                ) : null}
              </Stack>
              <Divider />
              {watch('type') === TypeGameConstraints.DEFAULT && (
                <DetailFormProvinceQuantities disable />
              )}

              {watch('type') === TypeGameConstraints.ALLOCATION && (
                <DetailFormAllocation disable />
              )}
              {watch('type') === TypeGameConstraints.PROVINCE && (
                <DetailFormProvince disable />
              )}
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
          <Button
            variant="contained"
            onClick={() =>
              navigate(PATH_DASHBOARD.gameGift.edit(gameId as string, giftId as string))
            }
          >
            {`${i18n.t('edit')}`}
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
