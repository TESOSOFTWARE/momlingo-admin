import { LoadingButton } from '@mui/lab';
import { Box, Button, MenuItem, Paper, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderBreadcrumbs from '../../../common/components/HeaderBreadcrumbs';
import Image from '../../../common/components/Image';
import {
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
  RHFUploadSingleFile,
} from '../../../common/components/hook-form';
import FormProvider from '../../../common/components/hook-form/FormProvider';
import useMessage from '../../../common/hooks/useMessage';
import { usePresignImg } from '../../../common/hooks/usePresignImg';
import { dispatch, useSelector } from '../../../common/redux/store';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { fData } from '../../../common/utils/formatNumber';
import { useEditHomeSections } from '../../hooks/useEditHomeSections';
import { useGetMobileRoute } from '../../hooks/useGetMobileRoute';
import { IDataRequest, ITypeSection, IUpdateNormalService } from '../../interface';
import { updateSections } from '../../slice';
import NormalServiceModal from './NormalServiceModal';
import { typeLink } from '../../../noti-manage/constants';
import ParamsField from '../ParamsField';

export default function NormalServiceEdit() {
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { t } = useTranslation();
  const params = useParams();
  const normalServiceId = params?.id;
  const methods = useForm<IUpdateNormalService>({
    defaultValues: {
      deepLink: '',
      image: '',
      name: '',
      nameService: '',
      route: '',
      title: '',
      typeLink: typeLink[0].value,
      params: {},
    },
  });
  const { handleUpload } = usePresignImg();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { handleSubmit, setValue, watch, reset } = methods;
  const navigate = useNavigate();

  const { data: mobileRoutes } = useGetMobileRoute();

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { mutate } = useEditHomeSections();

  const { dataRequest } = useSelector((state) => state.homeConfigurationReducer);
  const normalServiceData = dataRequest.find(
    (item: IDataRequest) =>
      item.id === normalServiceId && item.type === ITypeSection.NORMAL_SERVICE
  );

  useEffect(() => {
    if (!normalServiceData) {
      navigate(PATH_DASHBOARD.homeConfig.root);
    }
  }, [normalServiceData]);
  useEffect(() => {
    if (normalServiceData?.data?.length <= currentIndex) {
      setCurrentIndex(normalServiceData?.data?.length - 1);
    }
  }, [currentIndex, normalServiceData?.data?.length]);
  useEffect(() => {
    if (currentIndex < 0) {
      setValue('image', '');
      setValue('name', '');
      setValue('nameService', '');
      setValue('deepLink', '');
      setValue('route', '');
      setValue('typeLink', typeLink[0].value);
      setValue('params', undefined);
    } else {
      setValue('image', normalServiceData?.data[currentIndex]?.image);
      setValue(
        'name',
        mobileRoutes?.find(
          (item) => item?.route === normalServiceData?.data[currentIndex]?.link
        )?.name
      );
      setValue('nameService', normalServiceData?.data[currentIndex]?.name);
      const params = normalServiceData?.data[currentIndex]?.params;

      setValue('params', params);

      setValue('typeLink', normalServiceData?.data[currentIndex]?.typeRoute);
      if (normalServiceData?.data[currentIndex]?.typeRoute === typeLink[1].value) {
        setValue('deepLink', normalServiceData?.data[currentIndex]?.link);
        setValue('route', '');
      } else {
        setValue('route', normalServiceData?.data[currentIndex]?.link);
        setValue('deepLink', '');
      }
    }
  }, [currentIndex, normalServiceData]);

  useEffect(() => {
    if (normalServiceData?.title) setValue('title', normalServiceData?.title);
  }, [normalServiceData?.title]);

  useEffect(() => {
    setValue('name', mobileRoutes?.find((item) => item?.route === watch('route'))?.name);
    if (!mobileRoutes?.find((item) => item?.route === watch('route'))?.isNeedParams) {
      setValue('params', undefined);
    }
  }, [watch('route')]);

  useEffect(() => {
    const dataReq = dataRequest?.map((item) => {
      if (item.type === ITypeSection.NORMAL_SERVICE && item.id === normalServiceId) {
        return {
          ...item,
          title: watch('title'),
        };
      }
      return item;
    });
    dispatch(updateSections(dataReq));
  }, [watch('title')]);

  const onSubmit = async (data: IUpdateNormalService) => {
    let file: any;
    if (typeof data.image !== 'string') {
      file = await handleUpload(data.image);
    }

    const dataReq = dataRequest?.map((item) => {
      if (item.type === ITypeSection.NORMAL_SERVICE && item.id === normalServiceId) {
        return {
          ...item,
          data: item.data?.map((i: any, index: number) => {
            if (index === currentIndex) {
              if (!file) {
                return {
                  ...i,
                  name: data.nameService,
                  typeRoute: data.typeLink,
                  link: data.typeLink === typeLink[0].value ? data.route : data.deepLink,
                  params: data?.params,
                };
              } else {
                return {
                  image: file?.url,
                  imageId: file?.id,
                  link: data.typeLink === typeLink[0].value ? data.route : data.deepLink,
                  name: data.nameService,
                  typeRoute: data.typeLink,
                  params: data?.params,
                };
              }
            }
            return i;
          }),
        };
      }
      return item;
    });
    dispatch(updateSections(dataReq));
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue(
          'image',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const handleRemoveNormalService = () => {
    const dataReq = dataRequest?.map((item) => {
      if (item.type === ITypeSection.NORMAL_SERVICE && item.id === normalServiceId) {
        return {
          ...item,
          data: item.data?.filter((i: any, index: number) => {
            return index !== currentIndex;
          }),
        };
      }
      return item;
    });
    dispatch(updateSections(dataReq));
  };

  const saveEditNormalService = () => {
    setIsLoadingSave(true);

    const data = dataRequest.map((item) => {
      if (
        item.type === ITypeSection.NORMAL_SERVICE ||
        item.type === ITypeSection.BANNER
      ) {
        return {
          ...item,
          data: item.data?.map((i: any) => {
            if (i?.params?.length) {
              const params: any = {};
              i?.params?.forEach((p: any) => {
                params[p?.key] = p?.value;
              });
              return {
                ...i,
                params: params,
              };
            } else {
              return {
                ...i,
              };
            }
          }),
        };
      } else {
        return item;
      }
    });
    const newData = {
      sections: data,
    };
    mutate(newData, {
      onSuccess: () => {
        showSuccessSnackbar('Update Home Screen Successfully');
        setIsLoadingSave(false);
      },
      onError: () => {
        showErrorSnackbar('Update Home Screen Failed');
        setIsLoadingSave(false);
      },
    });
  };

  return (
    <Box width={'100%'}>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Box>
          <HeaderBreadcrumbs
            heading={t('homeConfig')}
            links={[
              { name: t('dashboard'), href: PATH_DASHBOARD.root },
              { name: t('homeConfig'), href: PATH_DASHBOARD.homeConfig.root },
              { name: t('edit') },
            ]}
          />
        </Box>
        <Box>
          <LoadingButton
            loading={isLoadingSave}
            variant="contained"
            onClick={saveEditNormalService}
            sx={{ marginRight: '10px', width: '130px' }}
          >
            {'Lưu'}
          </LoadingButton>
          <Button
            sx={{ marginRight: '10px' }}
            variant="outlined"
            onClick={() => {
              setIsOpenModal(true);
            }}
          >
            Thêm
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          // marginTop: '10px',
          padding: '20px',
        }}
      >
        <Typography
          sx={{
            paddingLeft: 3,
            fontWeight: 550,
            fontSize: '18px',
            color: '#666E80',
          }}
        >
          {normalServiceData?.title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            overflowX: 'scroll',
            overflowY: 'hidden',
          }}
        >
          {normalServiceData?.data?.map((normalService: any, index: number) => (
            <Box
              key={normalService?.id}
              sx={{
                borderRadius: '118px',
                padding: '15px',
                width: '110px',
                height: '200px',
                backgroundColor: `${index === currentIndex ? '#ddd' : 'white'}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginLeft: ' 15px',
                marginTop: '26px',
                border: 2,
                borderColor: '#F7F8FA',
                cursor: 'pointer',
              }}
              onClick={() => {
                setCurrentIndex(index);
              }}
              className={index === currentIndex ? 'service-active' : ''}
            >
              <Image
                src={normalService.image}
                sx={{
                  width: '82px',
                  height: '82px',
                  borderRadius: '50%',
                }}
                alt="normal-service"
              />
              <Typography
                sx={{
                  textAlign: 'center',
                  marginTop: '14px',
                  color: '#666E80',
                }}
              >
                {normalService.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Box mt={'10px'}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFTextField
            name="title"
            type="name"
            label="Title"
            InputLabelProps={{ shrink: true }}
            sx={{
              marginBottom: '20px',
              width: '400px',
            }}
          />
          <Paper
            elevation={3}
            sx={{
              padding: 3,
            }}
          >
            <Typography
              sx={{
                color: '#666E80',
                fontSize: '18px',
                fontWeight: 600,
                marginBottom: '12px',
              }}
            >
              Cấu hình hình ảnh đã chọn
            </Typography>

            <Box display={'flex'} alignItems={'center'} width={'100%'}>
              <Box width={'60%'}>
                <RHFUploadSingleFile
                  name="image"
                  maxSize={3145728}
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
              </Box>

              <Box
                sx={{
                  width: '40%',
                  ml: 2,
                }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    padding: 3,
                  }}
                >
                  <RHFTextField
                    name="nameService"
                    type="name"
                    label="Tên dịch vụ"
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      marginBottom: '20px',
                    }}
                  />
                  <Stack spacing={3} direction={'column'} alignItems={'center'}>
                    <RHFRadioGroup name="typeLink" options={typeLink} />
                    {watch('typeLink') === typeLink[1].value ? (
                      <RHFTextField name="deepLink" label="Nhập đường dẫn" />
                    ) : (
                      <>
                        <RHFSelect
                          name="route"
                          label="Điều hướng"
                          InputLabelProps={{ shrink: true }}
                        >
                          <option></option>
                          {mobileRoutes?.map((item: any, index: number) => (
                            <option key={index} value={item?.route}>
                              {item?.route}
                            </option>
                          ))}
                        </RHFSelect>
                        <RHFTextField
                          name="name"
                          type="name"
                          label="Tên trang"
                          disabled={true}
                          InputLabelProps={{ shrink: true }}
                          sx={{
                            marginTop: '20px',
                          }}
                        />
                        {mobileRoutes?.find((item) => item?.route === watch('route'))
                          ?.isNeedParams && <ParamsField />}
                      </>
                    )}
                  </Stack>
                </Paper>
                <Box display={'flex'} justifyContent={'center'} marginTop={'10px'}>
                  <Box>
                    <LoadingButton
                      // loading={isLoading}
                      type="submit"
                      variant="contained"
                      //   startIcon={<Iconify icon="material-symbols:add-circle-outline-rounded" />}
                    >
                      {'Cập nhật'}
                    </LoadingButton>
                    <LoadingButton
                      // loading={isLoading}
                      sx={{
                        marginLeft: '5px',
                      }}
                      type="submit"
                      variant="contained"
                      onClick={handleRemoveNormalService}
                      //   startIcon={<Iconify icon="material-symbols:add-circle-outline-rounded" />}
                    >
                      {'Xoá'}
                    </LoadingButton>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>
        </FormProvider>
      </Box>
      {isOpenModal && (
        <NormalServiceModal
          id={normalServiceId as string}
          isOpen={isOpenModal}
          onClose={() => setIsOpenModal(false)}
        />
      )}
    </Box>
  );
}
